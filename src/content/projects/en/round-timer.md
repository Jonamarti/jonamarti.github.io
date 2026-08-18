---
title: Timer with intervals
summary: >-
  A configurable interval timer for training. Runs in the browser, remembers your settings
  and needs no connection once the page has loaded.
description: Round timer - a configurable interval timer for training, with round and rest lengths, audio cues and settings that persist in the browser.
image: ../../../assets/roundtimer.png
imageAlt: The round timer counting down a round
tags: [TypeScript, Web Audio, Local storage, PWA]
areas: [martial-arts, web]
order: 8
widget: round-timer
longform: true
---


A countdown with configurable rounds and an audio cue. At one class I was reaching for the timer and it had ran out of charge. That pushed me into thinking about how it worked on a high level on web technologies.

Three details it gets right that the cheap ones tend not to:

**The clock is not counted down, it is calculated.** Every tick works out how much time is left by
comparing against a fixed end timestamp rather than subtracting from a counter. Browsers throttle
timers in a background tab, so the naive version quietly runs slow the moment you switch away from
it. This one can miss ticks without the schedule drifting.

**The beeps are generated, not loaded.** Three short tones in the last three seconds, a higher one
when a round starts and a lower one when rest starts, all synthesised with the Web Audio API. No
audio files means nothing to download and nothing to go missing.

**Your settings stay put.** Rounds, lengths and the sound toggle are written to local storage
whenever you change them, so the timer opens the way you left it.

Set rest to zero and rounds run back to back with no break.
