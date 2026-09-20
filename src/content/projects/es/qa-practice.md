---
title: Hub de práctica de QA
summary: >-
  Un hub de bancos de preguntas de QA construido sobre quizEngine, que empieza con diez exámenes
  de práctica de 40 preguntas para ISTQB CTFL v4.0.
description: Hub de práctica de QA construido sobre quizEngine, que empieza con un banco de ISTQB CTFL v4.0 de diez exámenes, con generador por capítulo y nivel K, revisión, temporizador, historial, autoguardado y validación en CI.
image: ../../../assets/exam_prep.webp
imageAlt: La web de práctica de QA mostrando una lista de exámenes para elegir
repo: https://github.com/Jonamarti/qa-practice
demo: https://jonamarti.github.io/qa-practice/
demoLabel: Abrir el hub de QA
tags: [ISTQB, Testing, QA, HTML, JavaScript, CI]
areas: [qa]
order: 9
---

<p class="lead">
Un único sitio para los bancos de preguntas con los que estudio calidad de software. El primero
prepara la certificación <strong>ISTQB Certified Tester Foundation Level (CTFL) v4.0</strong>; los
que vaya escribiendo después se publican en el mismo hub, cada uno con sus exámenes y su generador.
</p>

Cada banco es una web interactiva donde respondes, finalizas y revisas cada pregunta con la
explicación de por qué cada opción es correcta o incorrecta. Todos funcionan sobre `quizEngine`,
así que el repositorio sólo guarda configuración, preguntas y medios.

## El banco de CTFL v4.0

- **Diez exámenes de práctica** de 40 preguntas cada uno, siguiendo la distribución oficial por
  capítulos y niveles de conocimiento (K1/K2/K3).
- Preguntas de **una opción** y de "Seleccionar DOS opciones" que validan exactamente dos
  respuestas.
- **Nada se revela al responder**: la corrección solo aparece al pulsar **Finalizar**.
- Al finalizar: resumen de **correctas / incorrectas / sin responder / totales**, porcentaje y
  desglose por capítulo.
- **Revisión pregunta a pregunta**: se marca en verde la respuesta correcta, en rojo las selecciones
  incorrectas, y se explica por qué la correcta es correcta y por qué cada incorrecta no lo es.
- **Temporizador opcional** (sin temporizador / 60 min / 75 min).
- **Autoguardado** (localStorage): cierras la pestaña y retomas donde estabas.
- **Generador a medida** por capítulo y nivel K, con repaso de falladas y preguntas no vistas.
- **Historial de intentos** con estadísticas por capítulo y nivel.
- Pura **HTML + CSS + JS**: funciona de forma estática, sin servidor ni instalaciones.

Algunos exámenes se generaron con un agente de IA, tomando como entrada exámenes oficiales resueltos
y el temario publicado en la web de ISTQB, así que el repositorio incluye también los tests de
validación que comprueban la integridad de los datos de cada examen en cada push.

## Detrás de los datos

El hub usa `quizEngine` como dependencia: añadir un banco es añadir su configuración y sus ítems,
no otra copia de la aplicación. CI comprueba el contrato del motor, los pesos por capítulo, los
textos generados y el sitio construido, y después ejecuta un recorrido completo con Playwright.

El repositorio está bajo licencia MIT y no redistribuye material oficial de ISTQB. Los exámenes de
práctica son obra original con fines educativos, redactados a partir del programa de estudio público
CTFL v4.0.
