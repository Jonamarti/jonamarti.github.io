---
title: Simulador 68k
summary: >-
  Un emulador del Motorola 68000 que funciona en el navegador. Escribes ensamblador 68k en la propia
  página, lo ensamblas ahí mismo y lo recorres paso a paso viendo cambiar registros, memoria y pila.
description: 'Simulador 68k: un emulador, ensamblador y depurador de Motorola 68000 que funciona entero en el navegador, con seis tutoriales de ensamblador.'
image: ../../../assets/68ksim.png
imageAlt: El simulador a mitad del tutorial de factorial recursivo, con el código fuente, el panel de registros, un volcado de memoria y la pila.
repo: https://github.com/Jonamarti/68ksim
demo: https://jonamarti.github.io/68ksim/
demoLabel: Simulador 68k
tags: [TypeScript, Motorola 68k, Emulación, Ensamblador, Vitest, Playwright]
areas: [electronics]
order: 0
longform: true
---

<p class="lead">
Un emulador funcional del <strong>Motorola 68000</strong>, con su ensamblador y su depurador, todo
corriendo en el navegador sin instalar nada y sin servidor. Escribes ensamblador en la página, pulsas
Assemble &amp; Load y recorres tu programa instrucción a instrucción mientras puedes ver cómo los registros, el
volcado de memoria y la pila se actualizan en vivo.
</p>

<ul class="keyfacts">
  <li><strong>64</strong> instrucciones, 108 mnemónicos contando las familias Bcc, DBcc y Scc</li>
  <li><strong>14</strong> modos de direccionamiento, con su codificación</li>
  <li><strong>203</strong> tests unitarios y 3 de navegador</li>
  <li><strong>6</strong> tutoriales de dificultad creciente</li>
  <li><strong>0</strong> dependencias en tiempo de ejecución</li>
</ul>

## El origen del proyecto

En una asignatura de la universidad aprendimos el lenguaje ensamblador del 68k y lo probamos en un simulador 
y en una CPU real del laboratorio. A diferencia de lenguajes de alto nivel, lo interesante del ensamblador en mi opinión es lo cerca que está del código máquina, lo siguiente a los unos y ceros que podemos entender los humanos. Es un cambio enorme poder ver cómo cambian en memoria los datos y las instrucciones de los programas.

Entonces empecé a escribir un simulador, empezando por simplemente un HTML con forma de tabla, con los registros a un lado y la memoria al otro, de forma que cuando se lanzara una instrucción se pudiera "ver" cómo modificaba la memoria. Había probado previamente el simulador Easy68k y me propuse hacerlo en JS/TS para poder abrirlo en un navegador en cualquier parte.  

## Qué hace

- **Escribir y ejecutar tu propio código.** El editor ensambla en el sitio. Los errores vuelven con
  su número de línea, y no se carga nada hasta que el programa ensambla limpio.
- **Step o Run.** Step ejecuta una instrucción, Run sigue hasta un `STOP` o una parada. El panel
  "Last step" desensambla lo que se acaba de ejecutar, los registros que han cambiado se resaltan, y
  los bytes de memoria recién escritos también.
- **Ver la pila.** Un panel de pila en vivo, que es lo que hace fáciles de seguir las subrutinas y la
  recursión.
- **Seis tutoriales**, desde valores inmediatos y registros hasta bucles con `DBcc`, arrays,
  subrutinas, marcos de pila y un factorial recursivo, comentados línea a línea.
- **S-records de entrada y de salida.** Cargar un fichero S19 o S37 existente, o ensamblar tu fuente
  hasta uno.

## Usos de la IA en este proyecto: test automáticos -> encontrar bugs -> corregir código -> documentar y explicarme por qué.

<div class="scroll" tabindex="0">
<table>
  <tr><th class="lbl">MULU / MULS</th><td>El codificador leía el destino del primer operando y el origen del segundo, al revés que cualquier otra instrucción de dos operandos. <code>MULU D1,D0</code> multiplicaba silenciosamente sobre el registro equivocado.</td></tr>
  <tr><th class="lbl">A7 en modo supervisor</th><td>El manejo de registros de dirección leía y escribía <code>A[7]</code> directamente, pero en modo supervisor el puntero de pila activo es el SSP. Todo lo que usaba <code>SP</code> como registro de direccionamiento normal tocaba una ranura fantasma que nadie volvía a leer.</td></tr>
  <tr><th class="lbl">Cadenas en DC.B</th><td>El cálculo de tamaño contaba mal los bytes de un literal de cadena, así que todas las etiquetas posteriores caían en la dirección equivocada. El programa ensamblaba sin un solo error y luego se metía en terreno sin sentido.</td></tr>
  <tr><th class="lbl">Separación de operandos</th><td>Partir por comas ignoraba las comillas, así que <code>DC.B 'Hola, 68000!'</code> se rompía por la mitad.</td></tr>
  <tr><th class="lbl">Etiquetas con nombre de mnemónico</th><td>Una etiqueta escrita <code>SUB:</code> se interpretaba como una instrucción <code>SUB</code>.</td></tr>
</table>
</div>

Los tests corrían originalmente con QUnit en una pestaña del navegador, lo que significaba que
`npm test` abría una ventana y terminaba con éxito pasara lo que pasara dentro. Ahora corren con
Vitest en Node, en aproximadamente un segundo, con un código de salida que significa algo, y tres
tests de Playwright manejan la página de verdad para que la interfaz también quede cubierta. La CI
ejecuta ambos en cada push, y el sitio se despliega desde ese mismo workflow.

## Lo que no está

El 68230 PI/T está documentado en el repositorio pero nunca llegó a implementarse, así que el ejemplo
de los LEDs por interrupciones ensambla y se ejecuta mientras sus direcciones de periférico se
comportan como RAM normal. Faltan `DIVU` y `DIVS`, y con ellos las instrucciones BCD, `CHK`, `TRAPV`
y `CMPM`. Los ciclos se cuentan pero de forma aproximada: esto es un emulador funcional, no uno
preciso en tiempos.

## Conclusión

El proyecto no está terminado y seguramente seguiré actualizando funcionalidades, corrigiendo bugs y quizá mejorando 
el diseño :). Me ha parecido una dulce ironía el usar un lenguaje de alto nivel para simular en un navegador lenguaje ensamblador de una CPU de hace más de 40 años.
