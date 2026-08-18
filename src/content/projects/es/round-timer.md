---
title: Cuenta atrás con intervalos
summary: >-
  Temporizador de intervalos configurable para entrenar. Recuerda tus
  ajustes y no necesita conexión una vez cargada la página.
description: Temporizador de intervalos configurable, con duración de asalto y descanso, avisos sonoros y ajustes que se guardan en el navegador.
image: ../../../assets/roundtimer.png
imageAlt: El temporizador de asaltos con una cuenta atrás en marcha
tags: [TypeScript, Web Audio, Local storage, PWA]
areas: [martial-arts, web, tinkering]
order: 8
widget: round-timer
longform: true
---

Una cuenta atrás con varias rondas y un aviso sonoro. En una clase fui a usar el reloj que tenemos para los asaltos y estaba sin batería, lo que me llevó a interesarme por el funcionamiento de uno, y si podría programarlo en la web.

Tres detalles que resuelve bien y que los temporizadores baratos suelen fallar:

**El reloj no se va restando, se calcula.** En cada tick averigua cuánto queda comparando contra
una marca de tiempo fija de fin, en vez de ir descontando de un contador. Los navegadores frenan
los temporizadores cuando la pestaña está en segundo plano, así que la versión ingenua se va
quedando atrás en cuanto cambias de pestaña. Este puede perder ticks sin que se descuadre la
cuenta.

**Los pitidos se generan, no se descargan.** Tres tonos cortos en los últimos tres segundos, uno
más agudo al empezar el asalto y otro más grave al empezar el descanso, todos sintetizados con la
Web Audio API. Sin ficheros de audio no hay nada que descargar ni nada que se pueda perder.

**Los ajustes se quedan donde los dejaste.** Asaltos, duraciones y el interruptor de sonido se
guardan en el almacenamiento local en cuanto los cambias, así que el temporizador se abre como lo
dejaste.