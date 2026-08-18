---
title: Number Converter
summary: >-
  The first applet I made. Change from one number format to another. This was a fun way to
  learn about JavaScript event listeners and DOM manipulation. 2025 update: set up a CI
  pipeline, added tests and coverage with Cypress.
description: Number Converter - base 2, 10 and 16 conversion in vanilla JavaScript, with a Cypress CI pipeline running on Docker and Nginx.
image: ../../../assets/numconv.png
imageAlt: Number Converter screenshot
repo: https://github.com/Jonamarti/NumConverter
demo: https://jonamarti.github.io/NumberConverter/script/index.html
demoLabel: Number Converter
tags: [JavaScript, Cypress, Docker, Nginx, CI]
order: 4
---

This simple calculator changes numbers from one base to another. It can convert from base 2
to 10 and 16, and vice versa. The app is written in vanilla JS, and the design is made with
CSS. The main goal of this project was to learn HTML, CSS and JS. It was a good opportunity
to practice the use of event listeners, and to get familiar with the DOM and cookies. It also
changes the language of the text in the page when the user clicks on the language dropdown
buttons.

In 2025 I implemented a CI pipeline, which triggers Cypress tests on every push to the main
or other branches. It also triggers the tests on pull requests. The pipeline starts an Nginx
server in a Docker container, and the results are shown in the GitHub Actions tab. The app is
hosted on GitHub Pages.
