---
title: 68k Simulator
summary: >-
  A Motorola 68000 emulator that runs in the browser. You write 68k assembly in the page itself,
  assemble it right there and step through it while watching the registers, memory and stack change.
description: '68k Simulator: a Motorola 68000 emulator, assembler and debugger that runs entirely in the browser, with six assembly tutorials.'
image: ../../../assets/68ksim.png
imageAlt: The simulator midway through the recursive factorial tutorial, showing the source code, the register panel, a memory dump and the stack.
repo: https://github.com/Jonamarti/68ksim
demo: https://jonamarti.github.io/68ksim/
demoLabel: 68k Simulator
tags: [TypeScript, Motorola 68000, Emulation, Assembler, Vitest, Playwright]
areas: [electronics]
order: 0
longform: true
---

<p class="lead">
A functional <strong>Motorola 68000</strong> emulator, with its assembler and debugger, all running
in the browser with nothing to install and no server. You type assembly into the page, press
Assemble &amp; Load and step through your program one instruction at a time while you watch how the
registers, the memory dump and the stack update live.
</p>

<ul class="keyfacts">
  <li><strong>64</strong> instructions, 108 mnemonics counting the Bcc, DBcc and Scc families</li>
  <li><strong>14</strong> addressing modes, with their encoding</li>
  <li><strong>203</strong> unit tests and 3 browser ones</li>
  <li><strong>6</strong> tutorials of increasing difficulty</li>
  <li><strong>0</strong> runtime dependencies</li>
</ul>

## The origin of the project

In a university course we learned the 68k assembly language and tried it out in a simulator and on a
real CPU in the lab. Unlike high-level languages, what is interesting about assembly in my opinion is
how close it is to machine code, the next thing to ones and zeros that we humans can understand. It is
a huge change to be able to see how the data and instructions of programs change in memory.

So I started writing a simulator, beginning with just an HTML table layout, with the registers on one
side and the memory on the other, so that when an instruction ran you could "see" how it modified the
memory. I had previously tried the Easy68k simulator and set out to make it in JS/TS so I could open
it in a browser anywhere.

## What it does

- **Write and run your own code.** The editor assembles in place. Errors come back with their line
  number, and nothing is loaded until the program assembles cleanly.
- **Step or Run.** Step executes one instruction, Run keeps going until a `STOP` or a halt. The
  "Last step" panel disassembles what was just executed, the registers that changed are highlighted,
  and so are the memory bytes just written.
- **Watch the stack.** A live stack panel, which is what makes subroutines and recursion easy to
  follow.
- **Six tutorials**, from immediate values and registers up to `DBcc` loops, arrays, subroutines,
  stack frames and a recursive factorial, each commented line by line.
- **S-records in and out.** Load an existing S19 or S37 file, or assemble your source down to one.

## Uses of AI in this project: automated tests -> finding bugs -> fixing code -> documenting and explaining me why.

<div class="scroll" tabindex="0">
<table>
  <tr><th class="lbl">MULU / MULS</th><td>The encoder read the destination from the first operand and the source from the second, backwards from every other two-operand instruction. <code>MULU D1,D0</code> silently multiplied into the wrong register.</td></tr>
  <tr><th class="lbl">A7 in supervisor mode</th><td>Address register handling read and wrote <code>A[7]</code> directly, but in supervisor mode the active stack pointer is the SSP. Anything using <code>SP</code> as an ordinary addressing register touched a phantom slot that nothing ever read back.</td></tr>
  <tr><th class="lbl">Strings in DC.B</th><td>The size calculation miscounted the bytes in a string literal, so every label after it landed at the wrong address. The program assembled without a single error and then ran into nonsense territory.</td></tr>
  <tr><th class="lbl">Operand splitting</th><td>Splitting on commas ignored quotes, so <code>DC.B 'Hola, 68000!'</code> came apart in the middle.</td></tr>
  <tr><th class="lbl">Labels named after mnemonics</th><td>A label written <code>SUB:</code> was parsed as a <code>SUB</code> instruction.</td></tr>
</table>
</div>

The tests originally ran with QUnit in a browser tab, which meant `npm test` opened a window and
exited successfully no matter what happened inside. They now run with Vitest in Node, in about one
second, with an exit code that means something, and three Playwright tests drive the actual page so
the UI is covered too. CI runs both on every push, and the site deploys from that same workflow.

## What is not there

The 68230 PI/T is documented in the repository but never got implemented, so the interrupt-driven LED
example assembles and runs while its peripheral addresses behave as ordinary RAM. `DIVU` and `DIVS`
are missing, and with them the BCD instructions, `CHK`, `TRAPV` and `CMPM`. Cycles are counted but
approximately: this is a functional emulator, not a timing-accurate one.

## Conclusion

The project is not finished and I will surely keep updating features, fixing bugs and maybe improving
the style design :). I found it a sweet irony to use a high-level language to simulate, in a browser, the
assembly language of a CPU from over 40 years ago.