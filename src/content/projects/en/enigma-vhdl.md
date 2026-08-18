---
title: Enigma VHDL
summary: >-
  A gate-level Enigma cipher machine in VHDL. Automated testing uncovered two bugs that had
  been hidden for nine years, both now fixed and pinned down by 241 exhaustive checks.
description: 'Enigma VHDL - a gate-level Enigma cipher machine in VHDL: how it works, the Karnaugh maps behind every gate, and the two bugs that stayed hidden for nine years.'
image: ../../../assets/maquinaenigma.png
imageAlt: Enigma machine diagram
repo: https://github.com/Jonamarti/enigma_digital
tags: [VHDL, GHDL, Enigma, Digital logic, Karnaugh maps, Automated testing]
areas: [electronics, qa]
order: 7
narrowImage: true
longform: true
---

<p class="lead">
An Enigma cipher machine built with nothing but AND, OR, NOT gates and four T flip-flops. No
arithmetic operators, no behavioural VHDL, every equation derived by hand from truth tables and
Karnaugh maps. It ciphers digits (0 to 9) instead of letters, and just like the real machine it
is <strong>self-inverse</strong>: put the ciphered value back in with the same settings and your
original message comes out.
</p>

<ul class="keyfacts">
	<li><strong>0-9</strong> alphabet (4-bit BCD)</li>
	<li><strong>6</strong> pipeline stages</li>
	<li><strong>5</strong> automated test suites</li>
	<li><strong>241</strong> exhaustive checks, all passing</li>
	<li><strong>9 years</strong> a bug stayed hidden</li>
</ul>

## How it works, in one picture

Every keypress pushes a value through six stages. The counter is what replaces the rotating drum
of a real Enigma, it steps by one after each keypress, so the wiring effectively shifts as you
type. Type the digit 7 ten times in a row and you get 8, 6, 1, 3, 8, 6, 3, 8, 6, 1. Never the
same value twice in a row, and never a 7.

<pre class="flow" tabindex="0"><code>          ┌─ counter c (0-9), steps on every keypress ─┐
          │                                            │
          ▼                                            ▼
input ─► adder ─► rotor ─► reflector ─► inverse rotor ─► subtractor ─► output
        (m+c)%10    R          Ref            Ri            (i−c)%10</code></pre>

## A worked example

Let's cipher the digit 3 with the counter sitting at 9, and then feed the result straight back in
with the counter at 9 again:

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr><th class="lbl">Stage</th><th>Encrypting</th><th>Decrypting</th></tr>
	</thead>
	<tbody>
		<tr><td class="lbl">input</td><td>3</td><td>2</td></tr>
		<tr><td class="lbl">adder <code>(m+9)%10</code></td><td>2</td><td>1</td></tr>
		<tr><td class="lbl">rotor <code>R</code></td><td>6</td><td>3</td></tr>
		<tr><td class="lbl">reflector <code>Ref</code></td><td>3</td><td>6</td></tr>
		<tr><td class="lbl">inverse rotor <code>Ri</code></td><td>1</td><td>2</td></tr>
		<tr><td class="lbl">subtractor <code>(i−9)%10</code></td><td><strong>2</strong></td><td><strong>3</strong></td></tr>
	</tbody>
</table>
</div>

Same circuit, same settings, and the message comes back. There is no decrypt mode anywhere in the
design, that symmetry just falls out of the maths, and it is the one property the whole test
suite is built around.

## The short version of the story

I wrote this in 2017 for a Digital Electronics course at university. It was submitted,
demonstrated, graded, and I reopened the files every couple of years without ever suspecting there
was anything wrong with it. Nine years later I wrote a proper automated testbench for it, mostly
out of habit from my current job, and the cipher turned out to be broken. 80 of the 100 possible
input combinations failed. The only ones that worked were the twenty or so I had happened to look
at back in 2017.

Two separate bugs: eight wrong entries in a Karnaugh map I had derived by hand, and a missing
subtractor that stopped the machine from being self-inverse. Both are explained further down,
together with the gate-level design they were hiding in.

## Details

Everything below is optional reading, open whatever you are curious about.

<details>
<summary>How a keypress travels through the machine
<span class="hint">The six stages and what each one does to the value</span>
</summary>

<h3>1. The counter, a rotor with no moving parts</h3>

<p>A real Enigma rotor physically turns one step per keypress, which shifts the wiring by one
position. Here that is a modulo-10 counter built out of four T flip-flops. Its value gets added
to the input, which produces the same shifting effect with nothing actually moving.</p>

<h3>2. The adder: <code>(m + c) mod 10</code></h3>

<p>Shifts the message by the counter position. If the sum goes over 9 it wraps around, so 8 + 5
comes out as 3.</p>

<h3>3. The rotor, a fixed scramble</h3>

<p>A combinational circuit that permutes the ten possible values. This is the internal wiring of
the rotor drum:</p>

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr><th class="lbl">in</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
	</thead>
	<tbody>
		<tr><td class="lbl"><code>R(x)</code></td><td>2</td><td>3</td><td>6</td><td>8</td><td>0</td><td>9</td><td>7</td><td>4</td><td>5</td><td>1</td></tr>
	</tbody>
</table>
</div>

<h3>4. The reflector, sending the current back</h3>

<p>In the real machine the reflector bounces the electrical signal back through the rotors along a
different path. Here it is just the complement, <code>Ref(x) = 9 − x</code>:</p>

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr><th class="lbl">in</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
	</thead>
	<tbody>
		<tr><td class="lbl"><code>Ref(x)</code></td><td>9</td><td>8</td><td>7</td><td>6</td><td>5</td><td>4</td><td>3</td><td>2</td><td>1</td><td>0</td></tr>
	</tbody>
</table>
</div>

<p>Notice that no value maps to itself. That is the defining property of an Enigma reflector, and
it is also the historical weakness that let Bletchley Park break the machine: a letter can never
encipher to itself, which hands the codebreaker a free constraint on every single guess.</p>

<h3>5. The inverse rotor, the return path</h3>

<p>The current comes back out through the same wiring, so this block undoes the rotor exactly,
<code>Ri = R⁻¹</code>.</p>

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr><th class="lbl">in</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
	</thead>
	<tbody>
		<tr><td class="lbl"><code>Ri(x)</code></td><td>4</td><td>9</td><td>0</td><td>1</td><td>7</td><td>8</td><td>2</td><td>6</td><td>3</td><td>5</td></tr>
	</tbody>
</table>
</div>

<h3>6. The subtractor: <code>(i − c) mod 10</code></h3>

<p>Takes out the shift the adder put in. This is the block that was missing from the original 2017
design, and not having it is what broke the cipher for every counter position except zero.</p>

</details>

<details>
<summary>Why encrypting twice gives you the message back
<span class="hint">The one bit of maths the whole design rests on</span>
</summary>

<p>Call the middle three stages <code>g = Ri ∘ Ref ∘ R</code>. The whole machine is then:</p>

<pre tabindex="0"><code>output(m, c) = ( g((m + c) mod 10) − c ) mod 10</code></pre>

<p><code>g</code> is an involution, meaning that applying it twice gets you back where you started,
<code>g(g(x)) = x</code>. That happens because the reflector is symmetric and the return path
undoes the outward path exactly. So if you feed the output back in:</p>

<pre tabindex="0"><code>output(output(m, c), c)
  = ( g( ((g((m+c)%10) − c)%10 + c) %10 ) − c ) %10
  = ( g( g((m+c)%10) ) − c ) %10        the −c and +c cancel
  = ( (m+c)%10 − c ) %10                because g is an involution
  = m                                   ✓</code></pre>

<p>Both cancellations are doing work there. Take the subtractor away and the middle line stops
collapsing, because <code>g</code> is not linear with respect to modulo-10 addition, so the counter
shift leaks through the permutation and never comes back out. That is bug 2.</p>

</details>

<details>
<summary>The BCD counter: four T flip-flops
<span class="hint">State table, excitation equations and Karnaugh maps</span>
</summary>

<p>A T flip-flop toggles when <code>T = 1</code> and holds when <code>T = 0</code>, so
<code>Q<sub>next</sub> = Q ⊕ T</code>. To design the counter you write down the state it has to
move to next, and then read off the toggles you need to get there,
<code>T = Q ⊕ Q<sub>next</sub></code>.</p>

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr>
			<th class="lbl">state</th><th>Q3</th><th>Q2</th><th>Q1</th><th>Q0</th>
			<th class="lbl">next</th><th>T3</th><th>T2</th><th>T1</th><th>T0</th>
		</tr>
	</thead>
	<tbody>
		<tr><td class="lbl">0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="lbl">1</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">1</td><td>0</td><td>0</td><td>0</td><td>1</td><td class="lbl">2</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
		<tr><td class="lbl">2</td><td>0</td><td>0</td><td>1</td><td>0</td><td class="lbl">3</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">3</td><td>0</td><td>0</td><td>1</td><td>1</td><td class="lbl">4</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
		<tr><td class="lbl">4</td><td>0</td><td>1</td><td>0</td><td>0</td><td class="lbl">5</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">5</td><td>0</td><td>1</td><td>0</td><td>1</td><td class="lbl">6</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
		<tr><td class="lbl">6</td><td>0</td><td>1</td><td>1</td><td>0</td><td class="lbl">7</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">7</td><td>0</td><td>1</td><td>1</td><td>1</td><td class="lbl">8</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
		<tr><td class="lbl">8</td><td>1</td><td>0</td><td>0</td><td>0</td><td class="lbl">9</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">9</td><td>1</td><td>0</td><td>0</td><td>1</td><td class="lbl">0</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
	</tbody>
</table>
</div>

<p>States 10 to 15 never happen, so they are don't cares (<code>X</code>). They can be whatever is
convenient, which lets the Karnaugh maps simplify a lot further than they otherwise could.</p>

<div class="kmaps">
	<figure class="kmap">
		<figcaption>T3</figcaption>
		<table>
			<tr><th class="axis">Q3Q2\Q1Q0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td>0</td><td>0</td><td>0</td><td>0</td></tr>
			<tr><th>01</th><td>0</td><td>0</td><td class="one">1</td><td>0</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td>0</td><td class="one">1</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
	<figure class="kmap">
		<figcaption>T2</figcaption>
		<table>
			<tr><th class="axis">Q3Q2\Q1Q0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td>0</td><td>0</td><td class="one">1</td><td>0</td></tr>
			<tr><th>01</th><td>0</td><td>0</td><td class="one">1</td><td>0</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td>0</td><td>0</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
	<figure class="kmap">
		<figcaption>T1</figcaption>
		<table>
			<tr><th class="axis">Q3Q2\Q1Q0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td>0</td><td class="one">1</td><td class="one">1</td><td>0</td></tr>
			<tr><th>01</th><td>0</td><td class="one">1</td><td class="one">1</td><td>0</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td>0</td><td>0</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
</div>

<p><code>T0</code> is 1 in every cell, the least significant bit toggles on every single clock.
Grouping the ones in the other three maps gives:</p>

<pre tabindex="0"><code>T3 = Q3·Q0 + Q2·Q1·Q0
T2 = Q1·Q0
T1 = Q3'·Q0
T0 = 1</code></pre>

<p><code>T1 = Q3'·Q0</code> is where the decimal wrap lives. Bit 1 would normally toggle every
second count, but the <code>Q3'</code> term kills it at state 9, so the counter jumps back to 0
instead of carrying on to 10.</p>

</details>

<details>
<summary>Gate-level design: Karnaugh maps for the rotor
<span class="hint">From a permutation table to four SOP equations, by hand</span>
</summary>

<p>The rotor is a lookup table, but expressed as gates instead of memory. Each of the four output
bits is its own boolean function of the four input bits, so the permutation table turns into four
separate Karnaugh maps. Writing <code>R(x)</code> out in binary:</p>

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr>
			<th class="lbl">in</th><th>s3</th><th>s2</th><th>s1</th><th>s0</th>
			<th class="lbl">out</th><th>r3</th><th>r2</th><th>r1</th><th>r0</th>
		</tr>
	</thead>
	<tbody>
		<tr><td class="lbl">0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="lbl">2</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>
		<tr><td class="lbl">1</td><td>0</td><td>0</td><td>0</td><td>1</td><td class="lbl">3</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
		<tr><td class="lbl">2</td><td>0</td><td>0</td><td>1</td><td>0</td><td class="lbl">6</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
		<tr><td class="lbl">3</td><td>0</td><td>0</td><td>1</td><td>1</td><td class="lbl">8</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
		<tr><td class="lbl">4</td><td>0</td><td>1</td><td>0</td><td>0</td><td class="lbl">0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
		<tr><td class="lbl">5</td><td>0</td><td>1</td><td>0</td><td>1</td><td class="lbl">9</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">6</td><td>0</td><td>1</td><td>1</td><td>0</td><td class="lbl">7</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
		<tr><td class="lbl">7</td><td>0</td><td>1</td><td>1</td><td>1</td><td class="lbl">4</td><td>0</td><td>1</td><td>0</td><td>0</td></tr>
		<tr><td class="lbl">8</td><td>1</td><td>0</td><td>0</td><td>0</td><td class="lbl">5</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">9</td><td>1</td><td>0</td><td>0</td><td>1</td><td class="lbl">1</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
	</tbody>
</table>
</div>

<p>Four maps, one per output bit. Rows are <code>s3s2</code> and columns are <code>s1s0</code>,
both in Gray code order so that neighbouring cells only differ by one bit. That is the trick that
makes the whole thing work: if two adjacent cells are both 1 you can group them, and the variable
that changes between them drops out of the term.</p>

<div class="kmaps">
	<figure class="kmap">
		<figcaption>r3</figcaption>
		<table>
			<tr><th class="axis">s3s2\s1s0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td>0</td><td>0</td><td class="one">1</td><td>0</td></tr>
			<tr><th>01</th><td>0</td><td class="one">1</td><td>0</td><td>0</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td>0</td><td>0</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
	<figure class="kmap">
		<figcaption>r2</figcaption>
		<table>
			<tr><th class="axis">s3s2\s1s0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td>0</td><td>0</td><td>0</td><td class="one">1</td></tr>
			<tr><th>01</th><td>0</td><td>0</td><td class="one">1</td><td class="one">1</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td class="one">1</td><td>0</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
	<figure class="kmap">
		<figcaption>r1</figcaption>
		<table>
			<tr><th class="axis">s3s2\s1s0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td class="one">1</td><td class="one">1</td><td>0</td><td class="one">1</td></tr>
			<tr><th>01</th><td>0</td><td>0</td><td>0</td><td class="one">1</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td>0</td><td>0</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
	<figure class="kmap">
		<figcaption>r0</figcaption>
		<table>
			<tr><th class="axis">s3s2\s1s0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td>0</td><td class="one">1</td><td>0</td><td>0</td></tr>
			<tr><th>01</th><td>0</td><td class="one">1</td><td>0</td><td class="one">1</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td class="one">1</td><td class="one">1</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
</div>

<p>Grouping each map gives the sum of products form that goes straight into VHDL:</p>

<pre tabindex="0"><code>r3 = s2·s1'·s0 + s2'·s1·s0
r2 = s1·s0' + s2·s1 + s3·s1'·s0'
r1 = s3'·s2'·s1' + s1·s0'
r0 = s1'·s0 + s2·s1·s0' + s3·s2'</code></pre>

<p>And in the source, one concurrent assignment per bit, four lines of VHDL that synthesise down
to a couple of dozen gates:</p>

<pre tabindex="0"><code>rot3 &lt;= (sum2 and not sum1 and sum0) or (not sum2 and sum1 and sum0);
rot2 &lt;= (sum1 and not sum0) or (sum2 and sum1) or (sum3 and not sum1 and not sum0);
rot1 &lt;= (not sum3 and not sum2 and not sum1) or (sum1 and not sum0);
rot0 &lt;= (not sum1 and sum0) or (sum2 and sum1 and not sum0) or (sum3 and not sum2);</code></pre>

<p>The reflector and the inverse rotor come out of exactly the same process. The reflector
collapses nicely because <code>9 − x</code> is very regular:</p>

<pre tabindex="0"><code>ref3 = r3'·r2'·r1'
ref2 = r3'·r2'·r1 + r3'·r2·r1'
ref1 = r3'·r1
ref0 = r3'·r0' + r2'·r1'·r0</code></pre>

<p>Do all of this by hand for twelve output bits and you have around a hundred terms to group and
transcribe without slipping once. That is where bug 1 came from.</p>

</details>

<details>
<summary>The bug that stayed hidden for nine years
<span class="hint">Two of them actually, one arithmetic and one architectural</span>
</summary>

<p>Test 1 passed straight away, the reflector has no fixed points across all 100 cases. Test 2
failed badly, 80 out of 100 combinations broke the self-inverse property. The twenty that passed
were all at counter position 0, which is exactly where my 2017 manual test cases happened to be.</p>

<h3>Bug 1: eight wrong entries in the adder</h3>

<p>The modulo-10 adder had 8 wrong entries out of 100 in its hand-derived SOP equations, three in
bit 3, five in bit 2, none in bits 1 and 0. Karnaugh maps are a visual technique, and with around
a hundred terms to group across four maps, misreading a few cells is almost inevitable. What made
it invisible is that the errors only show up when the counter is not zero, and at counter 0 the
adder is just the identity function, which is the only case anybody had checked.</p>

<h3>Bug 2: a missing subtractor</h3>

<p>This one was not a slip, it was a misunderstanding. The counter was added to the input before
the rotor but never subtracted from the output. A real Enigma shifts the whole permutation by the
rotor position, and adding a constant on the way in is not the same operation, so the difference
does not cancel. Even with a perfectly correct adder the machine could not have been self-inverse
for any counter other than zero. The fix is a modulo-10 subtractor after the inverse rotor.</p>

<p>Both are fixed now. The adder and the subtractor use compact <code>ieee.numeric_std</code>
processes instead of hand-derived equations, while the rotor, reflector and inverse rotor stay as
gate-level logic, since those are the part the exercise was actually about.</p>

</details>

<details>
<summary>The automated test suite
<span class="hint">Five properties, and what each one can actually catch</span>
</summary>

<p>The suite checks properties rather than hardcoded vectors, so it says something about the
design instead of just pinning down whatever it happens to do today:</p>

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr><th class="lbl">Test</th><th class="lbl">Property</th><th>Cases</th></tr>
	</thead>
	<tbody>
		<tr><td class="lbl">1</td><td class="lbl">The reflector never maps a value to itself</td><td>100</td></tr>
		<tr><td class="lbl">2</td><td class="lbl"><code>decode(encode(m)) == m</code> for every counter position</td><td>100</td></tr>
		<tr><td class="lbl">3</td><td class="lbl">The BCD counter walks 0-9 and wraps back to 0</td><td>11</td></tr>
		<tr><td class="lbl">4</td><td class="lbl">Rotor and reflector are permutations, and <code>Ref(x) = 9 − x</code></td><td>20</td></tr>
		<tr><td class="lbl">5</td><td class="lbl">The inverse rotor really inverts the rotor, <code>R(Ri(y)) == y</code></td><td>10</td></tr>
	</tbody>
</table>
</div>

<p>Tests 3 to 5 came later, and test 3 justified itself immediately. I checked the suite by
deliberately breaking the design in three different ways, and a corrupted counter flip-flop walked
straight past tests 1 and 2. Both of them set up the same broken counter on the encrypt pass and on
the decrypt pass, so the symmetry still holds perfectly, it just holds around the wrong value. Only
an independent check of the counter's own state sequence catches that. A round trip test that is
self-consistent has a blind spot exactly where both directions share a component, which is
something I had not really thought about before.</p>

<h3>Methodology</h3>

<p>The suite runs in GHDL. The stimulus process drives the clock itself, one pulse at a time,
instead of using a free running generator, because otherwise a clock edge can land in the middle of
a measurement window and the counter advances behind your back, which made the results
non-deterministic. Bus reads reject <code>'U'</code> and <code>'X'</code> outright instead of
quietly treating them as zero, so a test cannot pass on uninitialised garbage. Pass or fail is
decided by <code>assert</code> statements, and the run exits non-zero if any of them trips.</p>

<pre tabindex="0"><code>Test 1: PASSED (100 cases, no fixed points)
Test 2: PASSED (100 cases, all symmetric)
Test 3: PASSED (11 states, 0-9 then wrap to 0)
Test 4: PASSED (20 checks, rotor and reflector are bijections)
Test 5: PASSED (10 values, R(Ri(y)) == y)

  ALL TESTS PASSED</code></pre>

</details>

<details>
<summary>Running it yourself
<span class="hint">GHDL, or Docker if you would rather not install anything</span>
</summary>

<p>The whole thing is two VHDL files and a PowerShell script. GHDL is the only hard dependency, a
waveform viewer is optional.</p>

<pre tabindex="0"><code>.\simulate.ps1          # compile and simulate -> enigma.vcd
.\simulate.ps1 -test    # run the five test suites
.\simulate.ps1 -view    # open the waveform in Surfer or GTKWave
.\simulate.ps1 -clean   # remove generated files</code></pre>

<p>There is a Docker path as well (<code>simulate-docker.ps1</code>) that needs nothing but Docker
Desktop. For the waveform, the repo ships a Tcl script that drops annotated markers on every test
case, so you can step through the six stages and read the value at each one instead of decoding
bits by eye.</p>

</details>

## What I took away from it

Writing the tests at the same time as the code back in 2017 would have caught both bugs in an
afternoon. Manual waveform inspection missed eight arithmetic errors and a fundamental
architectural flaw, and being familiar with the design actively worked against me, I knew what the
waveform was supposed to look like, so that is what I saw. Nine years of occasionally reopening the
files never made a dent in that.

The project also sits on a trade-off I still find interesting. Gate-level SOP equations are
faithful to how digital logic is actually taught and built, and deriving them by hand is the whole
point of the exercise, but they get error-prone once you are at a hundred terms or so.
`ieee.numeric_std` is compact and correct by construction, and it hides exactly the detail the
exercise was about. The design now uses each one where it makes sense.
