---
title: Enigma VHDL
summary: >-
  Gate-level VHDL implementation of an Enigma cipher machine. Automated tests uncovered a bug
  in the inverse rotor equations 9 years after the original submission.
description: Enigma VHDL — gate level implementation of an Enigma cipher machine. Exhaustive automated testing revealed a hidden bug in the inverse rotor logic.
image: /images/maquinaenigma.png
imageAlt: Enigma machine diagram
repo: https://github.com/Jonamarti/enigma_digital
tags: [VHDL, GHDL, Enigma, Digital logic, Automated testing]
order: 7
narrowImage: true
longform: true
---

A gate-level VHDL implementation of an Enigma cipher machine, built with discrete logic
equations. No arithmetic operators, just AND, OR, NOT gates and T flip-flops. The design
implements a 4-bit BCD datapath with a rotor, reflector, inverse rotor, and a modulo-10
counter that advances with each key press.

### Project background

This VHDL design was originally (2017) submitted as a project for a Digital Electronics course
at university. It implements a simplified Enigma with a 4-bit BCD datapath, using only
gate-level logic, no behavioural VHDL, no arithmetic operators, just discrete equations mapped
to AND, OR, NOT gates and T flip-flops. The idea was to demonstrate a deep understanding of
digital logic design (Karnaugh maps and truth tables) and VHDL coding, while also implementing
a historically significant cipher machine.

Nine years later, I revisited the project and decided to write an automated testbench for it.
That is when the bug finally surfaced, a flaw that had gone completely unnoticed during the
original submission and demonstration and manual waveform inspection. It took 200 automated
assertions running every possible input combination to prove the cipher was broken.

### The automated tests

Two properties were verified exhaustively across all 100 combinations of counter position
(0-9) and message value (0-9):

- **Test 1**: The reflector never maps a value to itself (no fixed points in the permutation).
- **Test 2**: The machine is self-inverse: `decode(encode(m)) == m` for every counter position.

The testbench automates counter positioning via reset + N clock cycles, applies stimulus in
real time, and uses `assert` statements so pass/fail is decided by the simulator, not a human
looking at a waveform.

### The bug

Test 1 passed: the reflector has no fixed points over 100 cases. But Test 2 failed: **80 out
of 100** cases violated the self-inverse property. The 20 that passed were all at counter
position 0.

The root cause is in the inverse rotor equations (`f3..f0`). In a real Enigma, the return
current flows through the *same* rotor in reverse, effectively applying the inverse
permutation. But the VHDL design implements the inverse rotor as a *separate* hardcoded set of
equations that do **not** match the inverse of the forward rotor. The rotor maps `s → ro` with
one permutation; the inverse rotor maps `r → f` with a completely different one. They are not
inverses, so the machine cannot decode its own ciphertext.

### Why has this random finding stuck with me?

The original testbench I wrote back in university had maybe 6 manual test cases and no
assertions. I loaded the waveforms and looked at them right as I was giving an explanation
about the project. Everything looked fine. The bug didn't appear in the submission nor in the
subsequent years when I opened the files from time to time. It was only when I wrote a new
testbench with 200 assertions that the bug was finally revealed.

Today (9 years after the original submission) I was implementing the automated test cases for
this project as a reflex from my current job (I've been writing automated tests for years
now), and didn't even think I was going to catch one right in front of me. The one thing I
take from this in the area of software development is to write the test at the same time (or
even before, better!) than the actual code. Your familiarity with the design won't help you
catch everything.

### Output

```
Test 1: PASSED (100 cases, no fixed points)
Test 2: FAILED (80/100 mismatch(es))

  c=1 m=0 enc=2 dec=9   c=1 m=2 enc=9 dec=6
  c=1 m=3 enc=5 dec=0   c=1 m=5 enc=0 dec=2
  c=1 m=6 enc=8 dec=3   c=1 m=8 enc=3 dec=5
  c=1 m=9 enc=6 dec=8   c=2 m=0 enc=1 dec=9
  ... (80 failures total)
```
