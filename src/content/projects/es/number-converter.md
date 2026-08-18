---
title: Conversor de números
summary: >-
  El primer applet que hice. Convierte entre formatos numéricos. Fue una buena forma de
  aprender sobre event listeners y manipulación del DOM. En 2025 le monté un pipeline de CI
  con tests y cobertura en Cypress.
description: Conversor de números - conversión entre base 2, 10 y 16 en JavaScript sin frameworks, con un pipeline de CI con Cypress sobre Docker y Nginx.
image: ../../../assets/numconv.png
imageAlt: Captura del conversor de números
repo: https://github.com/Jonamarti/NumConverter
demo: https://jonamarti.github.io/NumberConverter/script/index.html
demoLabel: Conversor de números
tags: [JavaScript, Cypress, Docker, Nginx, CI]
areas: [qa, web]
order: 4
---

Esta calculadora convierte números de una base a otra: de base 2 a 10 y 16, y al revés. Está
escrita en JavaScript sin frameworks y el diseño es CSS puro. El objetivo principal era
aprender HTML, CSS y JS. Fue una buena ocasión para practicar con los event listeners y
familiarizarme con el DOM y las cookies. También cambia el idioma del texto de la página
cuando el usuario pulsa los botones del desplegable de idioma.

En 2025 implementé un pipeline de CI que lanza los tests de Cypress en cada push a main o a
cualquier otra rama, y también en los pull requests. El pipeline levanta un servidor Nginx en
un contenedor Docker y los resultados aparecen en la pestaña de GitHub Actions. La aplicación
está alojada en GitHub Pages.
