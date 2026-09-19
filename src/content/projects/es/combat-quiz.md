---
title: combatQuiz
summary: >-
  Banco de más de mil preguntas sobre artes marciales, anatomía, nutrición y teoría del
  entrenamiento, construido como tema independiente de quizEngine.
description: Cuestionarios de artes marciales y entrenamiento con facetas, imágenes, generación de bancos, revisión de preguntas falladas y validación automática.
image: ../../../assets/combat-quiz.png
imageAlt: Cinturón de artes marciales junto a tarjetas ilustradas de técnica, anatomía y entrenamiento
repo: https://github.com/Jonamarti/combatQuiz
demo: https://jonamarti.github.io/combatQuiz/
demoLabel: Abrir combatQuiz
tags: [Artes marciales, Entrenamiento, Anatomía, JavaScript]
areas: [martial-arts]
order: 11
---

`combatQuiz` reúne preguntas de artes marciales y ciencias del entrenamiento sin copiar la lógica
de la aplicación. El repositorio contiene solamente configuración, bancos y medios; `quizEngine`
se instala como una dependencia fijada y construye el sitio publicable.

Sus facetas permiten estudiar por disciplina, bloque temático y dificultad. Además de los exámenes
preparados, se pueden generar sesiones a medida, repasar únicamente las preguntas falladas o aún no
vistas y consultar el historial de intentos.

El banco combina contenido redactado y generado desde fuentes estructuradas. La CI regenera esos
archivos, detecta preguntas triviales, valida el contrato completo y recorre el resultado en un
navegador real antes de publicarlo.
