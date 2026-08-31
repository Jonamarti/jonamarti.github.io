---
title: ISTQB CTFL v4.0 Practice
summary: >-
  A bank of six 40-question practice exams for the ISTQB CTFL v4.0 certification, with an
  interactive web app with per-answer explanations, a review mode and CI data validation.
description: ISTQB CTFL v4.0 practice exams - six interactive practice exams with per-question explanations, a review mode, timer, auto-save and CI data validation. Some exams were generated with an AI agent from the official ISTQB syllabus.
image: ../../../assets/exam_prep.webp
imageAlt: The ISTQB CTFL practice web app showing a list of exams to choose from
repo: https://github.com/Jonamarti/ISTQB_CTFL_examenes_practica
demo: https://jonamarti.github.io/ISTQB_CTFL_examenes_practica/
demoLabel: ISTQB CTFL Practice
tags: [ISTQB, Testing, QA, HTML, JavaScript, CI]
areas: [qa]
order: 9
---

<p class="lead">
Six 40-question practice exams to prepare for the <strong>ISTQB Certified Tester Foundation Level
(CTFL) v4.0</strong> certification, with an interactive web app where you answer, finish and review
each question together with an explanation of why every option is right or wrong.
</p>

The questions follow the official distribution by chapter and knowledge level (K1/K2/K3). Some of
the exams were generated with an AI agent, taking as input solved official exams and the syllabus
published on the ISTQB website, so the repository also includes the validation tests that check the
integrity of every exam's data on each push.

## What the web app does

- **Six practice exams** of 40 questions each, with the official chapter and K-level distribution.
- Single-answer questions and "Select TWO options" questions that validate exactly two answers.
- **Nothing is revealed as you answer**: the correction only appears when you press **Finish**.
- When you finish: a summary of correct / incorrect / unanswered / totals, percentage and a
  per-chapter breakdown.
- **Question-by-question review**: the correct answer is marked in green, wrong selections in red,
  and it explains why the right one is right and why each wrong one is not.
- **Optional timer** (no timer / 60 min / 75 min).
- **Auto-save** (localStorage): close the tab and you pick up where you left off.
- Pure **HTML + CSS + JS**: it runs statically, no server and no install.

## Behind the data

The CI workflow validates the integrity of the data on every push: each exam must have 40
questions, the expected per-chapter weights, exactly one correct option in single-answer questions
and exactly two in "Select TWO" ones, sequential letters, and non-empty texts and explanations. All
of it is enforced by a Node test you can run locally with `npm test`.

The repository is MIT licensed and does not redistribute official ISTQB material. The practice
exams are original work for educational purposes, written from the public CTFL v4.0 study programme.
