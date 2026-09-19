---
title: ISTQB CTFL v4.0 Practice
summary: >-
  A hub of ten 40-question practice exams for ISTQB CTFL v4.0, with a chapter and K-level
  generator, failed-question review and automated bank validation.
description: ISTQB CTFL v4.0 practice hub with ten exams, a chapter and K-level generator, review mode, timer, history, auto-save and CI validation.
image: ../../../assets/exam_prep.webp
imageAlt: The ISTQB CTFL practice web app showing a list of exams to choose from
repo: https://github.com/Jonamarti/qa-practice
demo: https://jonamarti.github.io/qa-practice/
demoLabel: ISTQB CTFL Practice
tags: [ISTQB, Testing, QA, HTML, JavaScript, CI]
areas: [qa]
order: 9
---

<p class="lead">
Ten 40-question practice exams to prepare for the <strong>ISTQB Certified Tester Foundation Level
(CTFL) v4.0</strong> certification, with an interactive web app where you answer, finish and review
each question together with an explanation of why every option is right or wrong.
</p>

The questions follow the official distribution by chapter and knowledge level (K1/K2/K3). Some of
the exams were generated with an AI agent, taking as input solved official exams and the syllabus
published on the ISTQB website, so the repository also includes the validation tests that check the
integrity of every exam's data on each push.

## What the web app does

- **Ten practice exams** of 40 questions each, with chapter and K-level distributions.
- Single-answer questions and "Select TWO options" questions that validate exactly two answers.
- **Nothing is revealed as you answer**: the correction only appears when you press **Finish**.
- When you finish: a summary of correct / incorrect / unanswered / totals, percentage and a
  per-chapter breakdown.
- **Question-by-question review**: the correct answer is marked in green, wrong selections in red,
  and it explains why the right one is right and why each wrong one is not.
- **Optional timer** (no timer / 60 min / 75 min).
- **Auto-save** (localStorage): close the tab and you pick up where you left off.
- A **tailored exam generator** by chapter and K level, including failed and unseen review modes.
- **Attempt history** with statistics by chapter and knowledge level.
- Pure **HTML + CSS + JS**: it runs statically, no server and no install.

## Behind the data

The hub uses `quizEngine` as a dependency: the repository only keeps configuration and its 400
items. CI checks the engine contract, chapter weights, generated text files and built site, then
runs a complete Playwright browser journey.

The repository is MIT licensed and does not redistribute official ISTQB material. The practice
exams are original work for educational purposes, written from the public CTFL v4.0 study programme.
