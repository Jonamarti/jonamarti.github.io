---
title: Plant blog
summary: >-
  This is a full stack app. It uses MongoDB cloud for the database, NodeJS and
  Express for the backend, and React for the front end. -WIP-: refactoring to
  include Next.js and Auth0.
description: Plant blog - full stack app with MongoDB, Node/Express and React that warns about weather conditions your plants will not survive.
image: ../../../assets/plantblog.webp
animated: true
imageAlt: Plant blog demo animation
repo: https://github.com/Jonamarti/PlantBlog
tags: [React, Node.js, Express, MongoDB]
areas: [web, tinkering]
order: 1
---

This is a full stack app. It uses MongoDB cloud for the database, NodeJS and Express for the
backend, and React for the front end.

Each plant specimen has a range of atmospheric conditions it survives in, such as temperature
and humidity. Sometimes a hailstorm or a heat spell can hit us and damage or kill our beloved
plants. Half of this app is dedicated to alerting the user if such extreme conditions would
come in the next days. For that, it uses the blogging part of the application, where the user
can upload the progress of each plant along the information of the species, and that info is
used to check against the weather API for extreme conditions.
