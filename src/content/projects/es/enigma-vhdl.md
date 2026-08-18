---
title: Enigma en VHDL
summary: >-
  Implementación a nivel de puerta de una máquina Enigma en VHDL. Los tests automáticos
  destaparon un fallo en las ecuaciones del rotor inverso nueve años después de la entrega
  original.
description: Enigma en VHDL — implementación a nivel de puerta de una máquina Enigma. Los tests automáticos exhaustivos revelaron un fallo oculto en la lógica del rotor inverso.
image: /images/maquinaenigma.png
imageAlt: Diagrama de la máquina Enigma
repo: https://github.com/Jonamarti/enigma_digital
tags: [VHDL, GHDL, Enigma, Lógica digital, Testing automático]
order: 7
narrowImage: true
longform: true
---

Implementación en VHDL de una máquina de cifrado Enigma a nivel de puerta, construida con
ecuaciones lógicas discretas. Sin operadores aritméticos: solo puertas AND, OR, NOT y
biestables T. El diseño implementa un datapath BCD de 4 bits con rotor, reflector, rotor
inverso y un contador módulo 10 que avanza con cada pulsación.

### Origen del proyecto

Este diseño se entregó originalmente en 2017 como proyecto de una asignatura de Electrónica
Digital en la universidad. Implementa una Enigma simplificada con un datapath BCD de 4 bits,
usando únicamente lógica a nivel de puerta: nada de VHDL de comportamiento ni operadores
aritméticos, solo ecuaciones discretas traducidas a puertas AND, OR, NOT y biestables T. La
idea era demostrar un conocimiento sólido del diseño lógico digital (mapas de Karnaugh y
tablas de verdad) y de la escritura de VHDL, implementando además una máquina de cifrado
históricamente relevante.

Nueve años después retomé el proyecto y decidí escribirle un testbench automático. Ahí salió
por fin el fallo, uno que había pasado completamente desapercibido en la entrega, en la
defensa y en la inspección manual de las formas de onda. Hicieron falta 200 asserts
automáticos recorriendo todas las combinaciones posibles de entrada para demostrar que el
cifrado estaba roto.

### Los tests automáticos

Se verificaron dos propiedades de forma exhaustiva sobre las 100 combinaciones de posición del
contador (0-9) y valor del mensaje (0-9):

- **Test 1**: el reflector nunca mapea un valor sobre sí mismo (la permutación no tiene puntos
  fijos).
- **Test 2**: la máquina es autoinversa: `decode(encode(m)) == m` para cualquier posición del
  contador.

El testbench coloca el contador automáticamente mediante reset más N ciclos de reloj, aplica
los estímulos en tiempo real y usa sentencias `assert`, de modo que quien decide si pasa o
falla es el simulador, no una persona mirando una forma de onda.

### El fallo

El test 1 pasó: el reflector no tiene puntos fijos en los 100 casos. Pero el test 2 falló:
**80 de 100** casos incumplían la propiedad de autoinversión. Los 20 que pasaban estaban todos
en la posición 0 del contador.

La causa está en las ecuaciones del rotor inverso (`f3..f0`). En una Enigma real, la corriente
de vuelta atraviesa el *mismo* rotor en sentido inverso, aplicando de hecho la permutación
inversa. Pero el diseño en VHDL implementa el rotor inverso como un conjunto *aparte* de
ecuaciones fijas que **no** se corresponden con la inversa del rotor directo. El rotor mapea
`s → ro` con una permutación; el rotor inverso mapea `r → f` con otra completamente distinta.
No son inversas, así que la máquina no puede descifrar su propio texto cifrado.

### ¿Por qué se me ha quedado grabado este hallazgo?

El testbench original que escribí en la universidad tenía quizá 6 casos manuales y ningún
assert. Cargaba las formas de onda y las miraba mientras explicaba el proyecto. Todo parecía
correcto. El fallo no apareció ni en la entrega ni en los años siguientes, cada vez que abría
los ficheros de vez en cuando. Solo salió cuando escribí un testbench nuevo con 200 asserts.

Hoy, nueve años después de la entrega original, estaba implementando los casos de prueba
automáticos por puro reflejo profesional (llevo años escribiendo tests automáticos) y ni se me
pasó por la cabeza que iba a encontrar uno delante de mis narices. Lo que me llevo de esto,
aplicado al desarrollo de software, es que hay que escribir el test a la vez que el código, o
mejor aún antes. Tu familiaridad con el diseño no te va a hacer verlo todo.

### Salida

```
Test 1: PASSED (100 cases, no fixed points)
Test 2: FAILED (80/100 mismatch(es))

  c=1 m=0 enc=2 dec=9   c=1 m=2 enc=9 dec=6
  c=1 m=3 enc=5 dec=0   c=1 m=5 enc=0 dec=2
  c=1 m=6 enc=8 dec=3   c=1 m=8 enc=3 dec=5
  c=1 m=9 enc=6 dec=8   c=2 m=0 enc=1 dec=9
  ... (80 failures total)
```
