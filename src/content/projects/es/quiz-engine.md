---
title: quizEngine
summary: >-
  Motor web reutilizable para construir bancos de preguntas, exámenes cerrados y repasos
  personalizados sin duplicar la aplicación en cada proyecto.
description: Motor JavaScript sin dependencias para crear cuestionarios estáticos con validación de datos, facetas, persistencia, temporizadores, historial y pruebas de humo.
image: ../../../assets/quiz-engine.png
imageAlt: Ilustración modular de tarjetas de preguntas conectadas a validación y estadísticas
repo: https://github.com/Jonamarti/quizEngine
tags: [JavaScript, Testing, Arquitectura, Playwright, CI]
areas: [web]
order: 10
---

`quizEngine` separa la aplicación de examen de sus datos. Cada proyecto aporta un archivo de
configuración, bancos de preguntas y medios; el constructor combina ese tema con el motor y produce
una web estática que funciona incluso al abrirla directamente desde el disco.

## Qué resuelve

- Exámenes cerrados y generadores por facetas, con preguntas y opciones barajables.
- Preguntas simples o múltiples, imágenes con texto alternativo y explicaciones por opción.
- Temporizador, autoguardado versionado, historial de intentos y repaso de falladas o no vistas.
- Validación estructural del banco y pruebas de humo completas con Playwright.
- Un único motor actualizable para varios repositorios de contenido.

El contrato está documentado y los temas siguen siendo JavaScript estático, sin framework ni
servicio de backend. `combatQuiz` y el hub de QA son sus dos consumidores principales.
