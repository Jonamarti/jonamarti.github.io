---
title: Práctica ISTQB CTFL v4.0
summary: >-
  Un banco de seis exámenes de práctica de 40 preguntas para la certificación ISTQB CTFL v4.0, con
  una web interactiva con explicación respuesta a respuesta, modo revisión y validación de datos en CI.
description: Exámenes de práctica ISTQB CTFL v4.0 - seis exámenes interactivos con explicación por pregunta, modo revisión, temporizador, autoguardado y validación de datos en CI. Algunos exámenes se generaron con un agente de IA a partir del temario oficial de ISTQB.
image: ../../../assets/exam_prep.webp
imageAlt: La web de práctica ISTQB CTFL mostrando una lista de exámenes para elegir
repo: https://github.com/Jonamarti/ISTQB_CTFL_examenes_practica
demo: https://jonamarti.github.io/ISTQB_CTFL_examenes_practica/
demoLabel: Práctica ISTQB CTFL
tags: [ISTQB, Testing, QA, HTML, JavaScript, CI]
areas: [qa]
order: 9
---

<p class="lead">
Seis exámenes de práctica de 40 preguntas para preparar la certificación <strong>ISTQB Certified
Tester Foundation Level (CTFL) v4.0</strong>, con una web interactiva donde respondes, finalizas y
revisas cada pregunta con la explicación de por qué cada opción es correcta o incorrecta.
</p>

Las preguntas siguen la distribución oficial por capítulos y niveles de conocimiento (K1/K2/K3).
Algunos exámenes se generaron con un agente de IA, tomando como entrada exámenes oficiales resueltos
y el temario publicado en la web de ISTQB, así que el repositorio incluye también los tests de
validación que comprueban la integridad de los datos de cada examen en cada push.

## Qué hace la web

- **Seis exámenes de práctica** de 40 preguntas cada uno, con la distribución oficial por capítulos
  y niveles K.
- Preguntas de **una opción** y de "Seleccionar DOS opciones" que validan exactamente dos
  respuestas.
- **Nada se revela al responder**: la corrección solo aparece al pulsar **Finalizar**.
- Al finalizar: resumen de **correctas / incorrectas / sin responder / totales**, porcentaje y
  desglose por capítulo.
- **Revisión pregunta a pregunta**: se marca en verde la respuesta correcta, en rojo las selecciones
  incorrectas, y se explica por qué la correcta es correcta y por qué cada incorrecta no lo es.
- **Temporizador opcional** (sin temporizador / 60 min / 75 min).
- **Autoguardado** (localStorage): cierras la pestaña y retomas donde estabas.
- Pura **HTML + CSS + JS**: funciona de forma estática, sin servidor ni instalaciones.

## Detrás de los datos

El workflow de CI valida la integridad de los datos en cada push: cada examen debe tener 40
preguntas, los pesos esperados por capítulo, una única opción correcta en las preguntas de una
opción y exactamente dos en las de "Seleccionar DOS", letras secuenciales, y textos y explicaciones
no vacíos. Todo lo impone un test de Node que puedes ejecutar localmente con `npm test`.

El repositorio está bajo licencia MIT y no redistribuye material oficial de ISTQB. Los exámenes de
práctica son obra original con fines educativos, redactados a partir del programa de estudio público
CTFL v4.0.
