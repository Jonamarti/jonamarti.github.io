---
title: Práctica ISTQB CTFL v4.0
summary: >-
  Un hub de diez exámenes de práctica de 40 preguntas para ISTQB CTFL v4.0, con generador por
  capítulo y nivel, repaso de falladas y validación automática del banco.
description: Hub de práctica ISTQB CTFL v4.0 con diez exámenes, generador por capítulo y nivel K, revisión, temporizador, historial, autoguardado y validación en CI.
image: ../../../assets/exam_prep.webp
imageAlt: La web de práctica ISTQB CTFL mostrando una lista de exámenes para elegir
repo: https://github.com/Jonamarti/CTFL_v4.0_practica_examenes
demo: https://jonamarti.github.io/CTFL_v4.0_practica_examenes/
demoLabel: Práctica ISTQB CTFL
tags: [ISTQB, Testing, QA, HTML, JavaScript, CI]
areas: [qa]
order: 9
---

<p class="lead">
Diez exámenes de práctica de 40 preguntas para preparar la certificación <strong>ISTQB Certified
Tester Foundation Level (CTFL) v4.0</strong>, con una web interactiva donde respondes, finalizas y
revisas cada pregunta con la explicación de por qué cada opción es correcta o incorrecta.
</p>

Las preguntas siguen la distribución oficial por capítulos y niveles de conocimiento (K1/K2/K3).
Algunos exámenes se generaron con un agente de IA, tomando como entrada exámenes oficiales resueltos
y el temario publicado en la web de ISTQB, así que el repositorio incluye también los tests de
validación que comprueban la integridad de los datos de cada examen en cada push.

## Qué hace la web

- **Diez exámenes de práctica** de 40 preguntas cada uno, con la distribución por capítulos
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
- **Generador a medida** por capítulo y nivel K, con repaso de falladas y preguntas no vistas.
- **Historial de intentos** con estadísticas por capítulo y nivel.
- Pura **HTML + CSS + JS**: funciona de forma estática, sin servidor ni instalaciones.

## Detrás de los datos

El hub usa `quizEngine` como dependencia: el repositorio conserva únicamente la configuración y
los 400 ítems. CI comprueba el contrato del motor, los pesos por capítulo, los textos generados y
el sitio construido, y después ejecuta un recorrido completo con Playwright.

El repositorio está bajo licencia MIT y no redistribuye material oficial de ISTQB. Los exámenes de
práctica son obra original con fines educativos, redactados a partir del programa de estudio público
CTFL v4.0.
