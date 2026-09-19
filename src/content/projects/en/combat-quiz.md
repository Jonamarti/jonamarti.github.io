---
title: combatQuiz
summary: >-
  A bank of over a thousand questions on martial arts, anatomy, nutrition and training theory,
  built as an independent quizEngine theme.
description: Martial arts and training quizzes with facets, images, generated banks, failed-question review and automated validation.
image: ../../../assets/combat-quiz.png
imageAlt: A martial arts belt beside illustrated cards for technique, anatomy and training
repo: https://github.com/Jonamarti/combatQuiz
demo: https://jonamarti.github.io/combatQuiz/
demoLabel: Open combatQuiz
tags: [Martial arts, Training, Anatomy, JavaScript]
areas: [martial-arts]
order: 11
---

`combatQuiz` brings together martial arts and training-science questions without copying the
application logic. The repository only contains configuration, banks and media; `quizEngine` is
installed as a pinned dependency and builds the deployable site.

Its facets support study by discipline, subject block and difficulty. Alongside the prepared exams,
you can generate tailored sessions, review only failed or unseen questions, and inspect attempt
history.

The bank combines authored content with questions generated from structured sources. CI rebuilds
those files, detects trivial questions, validates the complete contract, and exercises the result
in a real browser before publication.
