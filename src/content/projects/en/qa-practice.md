---
title: QA practice hub
summary: >-
  A hub for QA question banks built on quizEngine, opening with ten 40-question practice exams
  for ISTQB CTFL v4.0.
description: QA practice hub built on quizEngine, opening with an ISTQB CTFL v4.0 bank of ten exams, a chapter and K-level generator, review mode, timer, history, auto-save and CI validation.
image: ../../../assets/exam_prep.webp
imageAlt: The QA practice web app showing a list of exams to choose from
repo: https://github.com/Jonamarti/qa-practice
demo: https://jonamarti.github.io/qa-practice/
demoLabel: Open the QA hub
tags: [ISTQB, Testing, QA, HTML, JavaScript, CI]
areas: [qa]
order: 9
---

<p class="lead">
A single place for the question banks I use to study software quality. The first one prepares the
<strong>ISTQB Certified Tester Foundation Level (CTFL) v4.0</strong> certification; the banks I
write next are published in the same hub, each with its own exams and generator.
</p>

Every bank is an interactive web app where you answer, finish and review each question together
with an explanation of why every option is right or wrong. All of them run on `quizEngine`, so the
repository only holds configuration, questions and media.

## The CTFL v4.0 bank

- **Ten practice exams** of 40 questions each, following the official distribution by chapter and
  knowledge level (K1/K2/K3).
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

Some of the exams were generated with an AI agent, taking as input solved official exams and the
syllabus published on the ISTQB website, so the repository also includes the validation tests that
check the integrity of every exam's data on each push.

## Behind the data

The hub uses `quizEngine` as a dependency: adding a bank means adding its configuration and items,
not another copy of the application. CI checks the engine contract, chapter weights, generated text
files and built site, then runs a complete Playwright browser journey.

The repository is MIT licensed and does not redistribute official ISTQB material. The practice
exams are original work for educational purposes, written from the public CTFL v4.0 study programme.
