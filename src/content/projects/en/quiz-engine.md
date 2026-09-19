---
title: quizEngine
summary: >-
  A reusable web engine for question banks, fixed exams and tailored review sessions without
  duplicating the application in every project.
description: Dependency-free JavaScript engine for static quizzes with data validation, facets, persistence, timers, history and browser smoke tests.
image: ../../../assets/quiz-engine.png
imageAlt: Modular illustration of question cards connected to validation and statistics
repo: https://github.com/Jonamarti/quizEngine
tags: [JavaScript, Testing, Architecture, Playwright, CI]
areas: [web]
order: 10
---

`quizEngine` separates the exam application from its data. Each project provides configuration,
question banks and media; the builder combines that theme with the engine and produces a static
site that even works when opened directly from disk.

## What it handles

- Fixed exams and facet-based generators, with optional question and answer shuffling.
- Single- and multiple-answer questions, accessible images and explanations for every option.
- Timers, versioned auto-save, attempt history, and review of failed or unseen questions.
- Structural bank validation and full Playwright browser smoke tests.
- One upgradeable engine shared by several content repositories.

The contract is documented and themes remain plain static JavaScript, with no framework or backend
service. `combatQuiz` and the QA hub are its two main consumers.
