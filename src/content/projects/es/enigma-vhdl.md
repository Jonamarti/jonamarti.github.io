---
title: Enigma en VHDL
summary: >-
  Una máquina Enigma a nivel de puertas en VHDL. Los tests automatizados destaparon dos bugs que
  llevaban nueve años escondidos, los dos ya arreglados y fijados por 241 comprobaciones.
description: 'Enigma en VHDL - una máquina de cifrado Enigma a nivel de puertas: cómo funciona, los mapas de Karnaugh que hay detrás de cada puerta, y los dos bugs que estuvieron nueve años escondidos.'
image: ../../../assets/maquinaenigma.png
imageAlt: Diagrama de una máquina Enigma
repo: https://github.com/Jonamarti/enigma_digital
tags: [VHDL, GHDL, Enigma, Lógica digital, Mapas de Karnaugh, Tests automatizados]
areas: [electronics, qa]
order: 7
narrowImage: true
longform: true
---

<p class="lead">
Una máquina Enigma construida con nada más que puertas AND, OR, NOT y cuatro biestables T. Sin
operadores aritméticos, sin VHDL de comportamiento, cada ecuación deducida a mano a partir de
tablas de verdad y mapas de Karnaugh. Cifra dígitos (del 0 al 9) en lugar de letras, y como la
máquina real es <strong>autoinversa</strong>: vuelves a meter el valor cifrado con los mismos
ajustes y te sale el mensaje original.
</p>

<ul class="keyfacts">
	<li><strong>0-9</strong> alfabeto (BCD de 4 bits)</li>
	<li><strong>6</strong> etapas</li>
	<li><strong>5</strong> suites de tests</li>
	<li><strong>241</strong> comprobaciones, todas pasando</li>
	<li><strong>9 años</strong> escondido un bug</li>
</ul>

## Cómo funciona, en un dibujo

Cada pulsación empuja un valor a través de seis etapas. El contador es lo que sustituye al tambor
giratorio de una Enigma real, avanza uno después de cada pulsación, así que el cableado se va
desplazando según escribes. Teclea el dígito 7 diez veces seguidas y obtienes 8, 6, 1, 3, 8, 6, 3,
8, 6, 1. Nunca el mismo valor dos veces seguidas, y nunca un 7.

<pre class="flow" tabindex="0"><code>          ┌─ contador c (0-9), avanza en cada pulsación ─┐
          │                                              │
          ▼                                              ▼
entrada ─► sumador ─► rotor ─► reflector ─► rotor inv. ─► restador ─► salida
          (m+c)%10      R          Ref           Ri        (i−c)%10</code></pre>

## Un ejemplo paso a paso

Vamos a cifrar el dígito 3 con el contador en 9, y después metemos el resultado otra vez con el
contador en 9 de nuevo:

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr><th class="lbl">Etapa</th><th>Cifrando</th><th>Descifrando</th></tr>
	</thead>
	<tbody>
		<tr><td class="lbl">entrada</td><td>3</td><td>2</td></tr>
		<tr><td class="lbl">sumador <code>(m+9)%10</code></td><td>2</td><td>1</td></tr>
		<tr><td class="lbl">rotor <code>R</code></td><td>6</td><td>3</td></tr>
		<tr><td class="lbl">reflector <code>Ref</code></td><td>3</td><td>6</td></tr>
		<tr><td class="lbl">rotor inverso <code>Ri</code></td><td>1</td><td>2</td></tr>
		<tr><td class="lbl">restador <code>(i−9)%10</code></td><td><strong>2</strong></td><td><strong>3</strong></td></tr>
	</tbody>
</table>
</div>

El mismo circuito, los mismos ajustes, y el mensaje vuelve. No hay modo de descifrado en ninguna
parte del diseño, esa simetría sale sola de las matemáticas, y es la propiedad sobre la que está
montada toda la suite de tests.

## La versión corta de la historia

Esto lo escribí en 2017 para una asignatura de Electrónica Digital en la universidad. Se entregó,
se presentó, se corrigió, y he ido reabriendo los archivos cada par de años sin sospechar nunca que
hubiera nada mal. Nueve años después le escribí un testbench automatizado en condiciones, más que
nada por inercia de mi trabajo actual, y resultó que el cifrado estaba roto. Fallaban 80 de las 100
combinaciones de entrada posibles. Las únicas que funcionaban eran las veinte y pico que me había
dado por mirar en 2017.

Dos bugs distintos: ocho entradas mal en un mapa de Karnaugh que había deducido a mano, y un
restador que faltaba y que impedía que la máquina fuese autoinversa. Los dos están explicados más
abajo, junto con el diseño a nivel de puertas en el que estaban escondidos.

## Detalles

Todo lo que viene ahora es opcional, abre lo que te dé curiosidad.

<details>
<summary>Cómo viaja una pulsación por la máquina
<span class="hint">Las seis etapas y qué le hace cada una al valor</span>
</summary>

<h3>1. El contador, un rotor sin partes móviles</h3>

<p>Un rotor de una Enigma real gira físicamente una posición por pulsación, lo que desplaza el
cableado un puesto. Aquí eso es un contador módulo 10 hecho con cuatro biestables T. Su valor se le
suma a la entrada, lo que produce el mismo efecto de desplazamiento sin que se mueva nada.</p>

<h3>2. El sumador: <code>(m + c) mod 10</code></h3>

<p>Desplaza el mensaje según la posición del contador. Si la suma pasa de 9 da la vuelta, así que
8 + 5 sale 3.</p>

<h3>3. El rotor, una mezcla fija</h3>

<p>Un circuito combinacional que permuta los diez valores posibles. Esto es el cableado interno del
tambor del rotor:</p>

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr><th class="lbl">in</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
	</thead>
	<tbody>
		<tr><td class="lbl"><code>R(x)</code></td><td>2</td><td>3</td><td>6</td><td>8</td><td>0</td><td>9</td><td>7</td><td>4</td><td>5</td><td>1</td></tr>
	</tbody>
</table>
</div>

<h3>4. El reflector, que devuelve la corriente</h3>

<p>En la máquina real el reflector rebota la señal eléctrica de vuelta por los rotores siguiendo un
camino distinto. Aquí es simplemente el complemento, <code>Ref(x) = 9 − x</code>:</p>

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr><th class="lbl">in</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
	</thead>
	<tbody>
		<tr><td class="lbl"><code>Ref(x)</code></td><td>9</td><td>8</td><td>7</td><td>6</td><td>5</td><td>4</td><td>3</td><td>2</td><td>1</td><td>0</td></tr>
	</tbody>
</table>
</div>

<p>Fíjate en que ningún valor se mapea consigo mismo. Esa es la propiedad que define a un reflector
de Enigma, y es también la debilidad histórica que permitió a Bletchley Park romper la máquina: una
letra nunca puede cifrarse como ella misma, lo que le regala al criptoanalista una restricción en
cada intento.</p>

<h3>5. El rotor inverso, el camino de vuelta</h3>

<p>La corriente sale de vuelta por el mismo cableado, así que este bloque deshace el rotor
exactamente, <code>Ri = R⁻¹</code>.</p>

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr><th class="lbl">in</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
	</thead>
	<tbody>
		<tr><td class="lbl"><code>Ri(x)</code></td><td>4</td><td>9</td><td>0</td><td>1</td><td>7</td><td>8</td><td>2</td><td>6</td><td>3</td><td>5</td></tr>
	</tbody>
</table>
</div>

<h3>6. El restador: <code>(i − c) mod 10</code></h3>

<p>Quita el desplazamiento que metió el sumador. Este es el bloque que faltaba en el diseño
original de 2017, y no tenerlo es lo que rompía el cifrado para cualquier posición del contador que
no fuese cero.</p>

</details>

<details>
<summary>Por qué cifrar dos veces te devuelve el mensaje
<span class="hint">La única parte matemática sobre la que se sostiene todo</span>
</summary>

<p>Llamemos <code>g = Ri ∘ Ref ∘ R</code> a las tres etapas del medio. La máquina entera queda
así:</p>

<pre tabindex="0"><code>salida(m, c) = ( g((m + c) mod 10) − c ) mod 10</code></pre>

<p><code>g</code> es una involución, es decir que aplicarla dos veces te deja donde empezaste,
<code>g(g(x)) = x</code>. Eso pasa porque el reflector es simétrico y el camino de vuelta deshace
exactamente el de ida. Así que si vuelves a meter la salida:</p>

<pre tabindex="0"><code>salida(salida(m, c), c)
  = ( g( ((g((m+c)%10) − c)%10 + c) %10 ) − c ) %10
  = ( g( g((m+c)%10) ) − c ) %10        el −c y el +c se cancelan
  = ( (m+c)%10 − c ) %10                porque g es una involución
  = m                                   ✓</code></pre>

<p>Las dos cancelaciones están haciendo trabajo ahí. Quita el restador y la línea del medio deja de
colapsar, porque <code>g</code> no es lineal respecto a la suma módulo 10, así que el
desplazamiento del contador se cuela por la permutación y ya no vuelve a salir. Eso es el bug 2.</p>

</details>

<details>
<summary>El contador BCD: cuatro biestables T
<span class="hint">Tabla de estados, ecuaciones de excitación y mapas de Karnaugh</span>
</summary>

<p>Un biestable T conmuta cuando <code>T = 1</code> y se queda quieto cuando <code>T = 0</code>, o
sea <code>Q<sub>sig</sub> = Q ⊕ T</code>. Para diseñar el contador escribes el estado al que tiene
que ir a continuación, y luego lees las conmutaciones que necesitas para llegar ahí,
<code>T = Q ⊕ Q<sub>sig</sub></code>.</p>

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr>
			<th class="lbl">estado</th><th>Q3</th><th>Q2</th><th>Q1</th><th>Q0</th>
			<th class="lbl">sig.</th><th>T3</th><th>T2</th><th>T1</th><th>T0</th>
		</tr>
	</thead>
	<tbody>
		<tr><td class="lbl">0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="lbl">1</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">1</td><td>0</td><td>0</td><td>0</td><td>1</td><td class="lbl">2</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
		<tr><td class="lbl">2</td><td>0</td><td>0</td><td>1</td><td>0</td><td class="lbl">3</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">3</td><td>0</td><td>0</td><td>1</td><td>1</td><td class="lbl">4</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
		<tr><td class="lbl">4</td><td>0</td><td>1</td><td>0</td><td>0</td><td class="lbl">5</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">5</td><td>0</td><td>1</td><td>0</td><td>1</td><td class="lbl">6</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
		<tr><td class="lbl">6</td><td>0</td><td>1</td><td>1</td><td>0</td><td class="lbl">7</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">7</td><td>0</td><td>1</td><td>1</td><td>1</td><td class="lbl">8</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
		<tr><td class="lbl">8</td><td>1</td><td>0</td><td>0</td><td>0</td><td class="lbl">9</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">9</td><td>1</td><td>0</td><td>0</td><td>1</td><td class="lbl">0</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
	</tbody>
</table>
</div>

<p>Los estados del 10 al 15 no ocurren nunca, así que son inespecificados (<code>X</code>). Pueden
valer lo que más convenga, y eso deja que los mapas de Karnaugh se simplifiquen mucho más de lo que
se simplificarían si no.</p>

<div class="kmaps">
	<figure class="kmap">
		<figcaption>T3</figcaption>
		<table>
			<tr><th class="axis">Q3Q2\Q1Q0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td>0</td><td>0</td><td>0</td><td>0</td></tr>
			<tr><th>01</th><td>0</td><td>0</td><td class="one">1</td><td>0</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td>0</td><td class="one">1</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
	<figure class="kmap">
		<figcaption>T2</figcaption>
		<table>
			<tr><th class="axis">Q3Q2\Q1Q0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td>0</td><td>0</td><td class="one">1</td><td>0</td></tr>
			<tr><th>01</th><td>0</td><td>0</td><td class="one">1</td><td>0</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td>0</td><td>0</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
	<figure class="kmap">
		<figcaption>T1</figcaption>
		<table>
			<tr><th class="axis">Q3Q2\Q1Q0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td>0</td><td class="one">1</td><td class="one">1</td><td>0</td></tr>
			<tr><th>01</th><td>0</td><td class="one">1</td><td class="one">1</td><td>0</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td>0</td><td>0</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
</div>

<p><code>T0</code> vale 1 en todas las celdas, el bit menos significativo conmuta en cada ciclo de
reloj. Agrupando los unos de los otros tres mapas sale:</p>

<pre tabindex="0"><code>T3 = Q3·Q0 + Q2·Q1·Q0
T2 = Q1·Q0
T1 = Q3'·Q0
T0 = 1</code></pre>

<p>En <code>T1 = Q3'·Q0</code> es donde vive la vuelta decimal. El bit 1 conmutaría normalmente
cada dos cuentas, pero el término <code>Q3'</code> lo mata en el estado 9, así que el contador
salta de vuelta a 0 en lugar de seguir hasta 10.</p>

</details>

<details>
<summary>Diseño a nivel de puertas: los mapas de Karnaugh del rotor
<span class="hint">De una tabla de permutación a cuatro ecuaciones SOP, a mano</span>
</summary>

<p>El rotor es una tabla de consulta, pero expresada como puertas en vez de como memoria. Cada uno
de los cuatro bits de salida es su propia función booleana de los cuatro bits de entrada, así que
la tabla de permutación se convierte en cuatro mapas de Karnaugh separados. Escribiendo
<code>R(x)</code> en binario:</p>

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr>
			<th class="lbl">in</th><th>s3</th><th>s2</th><th>s1</th><th>s0</th>
			<th class="lbl">out</th><th>r3</th><th>r2</th><th>r1</th><th>r0</th>
		</tr>
	</thead>
	<tbody>
		<tr><td class="lbl">0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="lbl">2</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>
		<tr><td class="lbl">1</td><td>0</td><td>0</td><td>0</td><td>1</td><td class="lbl">3</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
		<tr><td class="lbl">2</td><td>0</td><td>0</td><td>1</td><td>0</td><td class="lbl">6</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
		<tr><td class="lbl">3</td><td>0</td><td>0</td><td>1</td><td>1</td><td class="lbl">8</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
		<tr><td class="lbl">4</td><td>0</td><td>1</td><td>0</td><td>0</td><td class="lbl">0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
		<tr><td class="lbl">5</td><td>0</td><td>1</td><td>0</td><td>1</td><td class="lbl">9</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">6</td><td>0</td><td>1</td><td>1</td><td>0</td><td class="lbl">7</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
		<tr><td class="lbl">7</td><td>0</td><td>1</td><td>1</td><td>1</td><td class="lbl">4</td><td>0</td><td>1</td><td>0</td><td>0</td></tr>
		<tr><td class="lbl">8</td><td>1</td><td>0</td><td>0</td><td>0</td><td class="lbl">5</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
		<tr><td class="lbl">9</td><td>1</td><td>0</td><td>0</td><td>1</td><td class="lbl">1</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
	</tbody>
</table>
</div>

<p>Cuatro mapas, uno por bit de salida. Las filas son <code>s3s2</code> y las columnas
<code>s1s0</code>, las dos en código Gray para que las celdas vecinas solo se diferencien en un
bit. Ese es el truco que hace que todo esto funcione: si dos celdas adyacentes valen 1 las puedes
agrupar, y la variable que cambia entre ellas desaparece del término.</p>

<div class="kmaps">
	<figure class="kmap">
		<figcaption>r3</figcaption>
		<table>
			<tr><th class="axis">s3s2\s1s0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td>0</td><td>0</td><td class="one">1</td><td>0</td></tr>
			<tr><th>01</th><td>0</td><td class="one">1</td><td>0</td><td>0</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td>0</td><td>0</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
	<figure class="kmap">
		<figcaption>r2</figcaption>
		<table>
			<tr><th class="axis">s3s2\s1s0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td>0</td><td>0</td><td>0</td><td class="one">1</td></tr>
			<tr><th>01</th><td>0</td><td>0</td><td class="one">1</td><td class="one">1</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td class="one">1</td><td>0</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
	<figure class="kmap">
		<figcaption>r1</figcaption>
		<table>
			<tr><th class="axis">s3s2\s1s0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td class="one">1</td><td class="one">1</td><td>0</td><td class="one">1</td></tr>
			<tr><th>01</th><td>0</td><td>0</td><td>0</td><td class="one">1</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td>0</td><td>0</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
	<figure class="kmap">
		<figcaption>r0</figcaption>
		<table>
			<tr><th class="axis">s3s2\s1s0</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
			<tr><th>00</th><td>0</td><td class="one">1</td><td>0</td><td>0</td></tr>
			<tr><th>01</th><td>0</td><td class="one">1</td><td>0</td><td class="one">1</td></tr>
			<tr><th>11</th><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td><td class="dc">X</td></tr>
			<tr><th>10</th><td class="one">1</td><td class="one">1</td><td class="dc">X</td><td class="dc">X</td></tr>
		</table>
	</figure>
</div>

<p>Agrupando cada mapa sale la forma de suma de productos que va directa al VHDL:</p>

<pre tabindex="0"><code>r3 = s2·s1'·s0 + s2'·s1·s0
r2 = s1·s0' + s2·s1 + s3·s1'·s0'
r1 = s3'·s2'·s1' + s1·s0'
r0 = s1'·s0 + s2·s1·s0' + s3·s2'</code></pre>

<p>Y en el código fuente, una asignación concurrente por bit, cuatro líneas de VHDL que se
sintetizan en un par de docenas de puertas:</p>

<pre tabindex="0"><code>rot3 &lt;= (sum2 and not sum1 and sum0) or (not sum2 and sum1 and sum0);
rot2 &lt;= (sum1 and not sum0) or (sum2 and sum1) or (sum3 and not sum1 and not sum0);
rot1 &lt;= (not sum3 and not sum2 and not sum1) or (sum1 and not sum0);
rot0 &lt;= (not sum1 and sum0) or (sum2 and sum1 and not sum0) or (sum3 and not sum2);</code></pre>

<p>El reflector y el rotor inverso salen exactamente del mismo proceso. El reflector se simplifica
bien porque <code>9 − x</code> es muy regular:</p>

<pre tabindex="0"><code>ref3 = r3'·r2'·r1'
ref2 = r3'·r2'·r1 + r3'·r2·r1'
ref1 = r3'·r1
ref0 = r3'·r0' + r2'·r1'·r0</code></pre>

<p>Haz todo esto a mano para doce bits de salida y tienes alrededor de cien términos que agrupar y
transcribir sin equivocarte ni una vez. De ahí salió el bug 1.</p>

</details>

<details>
<summary>El bug que estuvo escondido nueve años
<span class="hint">Dos en realidad, uno aritmético y otro de arquitectura</span>
</summary>

<p>El test 1 pasó a la primera, el reflector no tiene puntos fijos en los 100 casos. El test 2
falló estrepitosamente, 80 de 100 combinaciones rompían la propiedad autoinversa. Las veinte que
pasaban estaban todas en la posición 0 del contador, que es justo donde estaban mis casos de prueba
manuales de 2017.</p>

<h3>Bug 1: ocho entradas mal en el sumador</h3>

<p>El sumador módulo 10 tenía 8 entradas mal de 100 en sus ecuaciones SOP hechas a mano, tres en el
bit 3, cinco en el bit 2, ninguna en los bits 1 y 0. Los mapas de Karnaugh son una técnica visual,
y con unos cien términos que agrupar repartidos en cuatro mapas, leer mal alguna celda es casi
inevitable. Lo que lo hizo invisible es que los errores solo aparecen cuando el contador no es
cero, y con el contador a 0 el sumador es simplemente la identidad, que es el único caso que había
mirado nadie.</p>

<h3>Bug 2: faltaba un restador</h3>

<p>Este no fue un despiste, fue un malentendido. El contador se sumaba a la entrada antes del rotor
pero no se restaba nunca de la salida. Una Enigma real desplaza la permutación entera según la
posición del rotor, y sumar una constante a la ida no es la misma operación, así que la diferencia
no se cancela. Incluso con un sumador perfectamente correcto la máquina no podía ser autoinversa
para ningún contador que no fuese cero. El arreglo es un restador módulo 10 después del rotor
inverso.</p>

<p>Los dos están arreglados. El sumador y el restador usan procesos compactos con
<code>ieee.numeric_std</code> en lugar de ecuaciones deducidas a mano, mientras que el rotor, el
reflector y el rotor inverso siguen siendo lógica a nivel de puertas, que es la parte de la que iba
el ejercicio en realidad.</p>

</details>

<details>
<summary>La suite de tests automatizados
<span class="hint">Cinco propiedades, y qué puede cazar cada una</span>
</summary>

<p>La suite comprueba propiedades en vez de vectores fijos, así que dice algo sobre el diseño en
lugar de limitarse a congelar lo que hace hoy:</p>

<div class="scroll" tabindex="0">
<table>
	<thead>
		<tr><th class="lbl">Test</th><th class="lbl">Propiedad</th><th>Casos</th></tr>
	</thead>
	<tbody>
		<tr><td class="lbl">1</td><td class="lbl">El reflector nunca mapea un valor consigo mismo</td><td>100</td></tr>
		<tr><td class="lbl">2</td><td class="lbl"><code>decode(encode(m)) == m</code> para toda posición del contador</td><td>100</td></tr>
		<tr><td class="lbl">3</td><td class="lbl">El contador BCD recorre 0-9 y vuelve a 0</td><td>11</td></tr>
		<tr><td class="lbl">4</td><td class="lbl">Rotor y reflector son permutaciones, y <code>Ref(x) = 9 − x</code></td><td>20</td></tr>
		<tr><td class="lbl">5</td><td class="lbl">El rotor inverso invierte de verdad al rotor, <code>R(Ri(y)) == y</code></td><td>10</td></tr>
	</tbody>
</table>
</div>

<p>Los tests 3 al 5 vinieron después, y el 3 se justificó solo enseguida. Comprobé la suite
rompiendo el diseño a propósito de tres maneras distintas, y un biestable del contador corrupto se
coló tranquilamente por delante de los tests 1 y 2. Los dos configuran el mismo contador roto en la
pasada de cifrado y en la de descifrado, así que la simetría se sigue cumpliendo perfectamente,
solo que se cumple alrededor del valor equivocado. Eso solo lo caza una comprobación independiente
de la secuencia de estados del propio contador. Un test de ida y vuelta que es autoconsistente
tiene un punto ciego justo donde los dos sentidos comparten un componente, y es algo en lo que no
me había parado a pensar.</p>

<h3>Metodología</h3>

<p>La suite corre en GHDL. El proceso de estímulos pulsa el reloj él mismo, un pulso cada vez, en
lugar de usar un generador libre, porque si no un flanco puede caer en mitad de una ventana de
medida y el contador avanza a tus espaldas, lo que hacía que los resultados no fuesen
deterministas. Las lecturas de bus rechazan <code>'U'</code> y <code>'X'</code> directamente en vez
de tomarlos como cero sin decir nada, así que un test no puede pasar sobre basura sin inicializar.
Aprobar o suspender lo deciden sentencias <code>assert</code>, y la ejecución sale con código
distinto de cero si salta alguna.</p>

<pre tabindex="0"><code>Test 1: PASSED (100 cases, no fixed points)
Test 2: PASSED (100 cases, all symmetric)
Test 3: PASSED (11 states, 0-9 then wrap to 0)
Test 4: PASSED (20 checks, rotor and reflector are bijections)
Test 5: PASSED (10 values, R(Ri(y)) == y)

  ALL TESTS PASSED</code></pre>

</details>

<details>
<summary>Cómo ejecutarlo tú
<span class="hint">GHDL, o Docker si prefieres no instalar nada</span>
</summary>

<p>Todo esto son dos archivos VHDL y un script de PowerShell. GHDL es la única dependencia
obligatoria, el visor de formas de onda es opcional.</p>

<pre tabindex="0"><code>.\simulate.ps1          # compila y simula -> enigma.vcd
.\simulate.ps1 -test    # ejecuta las cinco suites de tests
.\simulate.ps1 -view    # abre la forma de onda en Surfer o GTKWave
.\simulate.ps1 -clean   # borra los archivos generados</code></pre>

<p>Hay también un camino con Docker (<code>simulate-docker.ps1</code>) que no necesita más que
Docker Desktop. Para las formas de onda, el repositorio incluye un script Tcl que coloca marcas
anotadas en cada caso de prueba, así puedes ir recorriendo las seis etapas y leer el valor en cada
una en lugar de descifrar bits a ojo.</p>

</details>

## Lo que me llevo de esto

Escribir los tests a la vez que el código allá por 2017 habría cazado los dos bugs en una tarde.
Mirar las formas de onda a mano se dejó ocho errores aritméticos y un fallo de arquitectura de
base, y conocer bien el diseño jugó activamente en mi contra, yo sabía cómo se suponía que tenía
que verse la forma de onda, así que eso es lo que vi. Nueve años reabriendo los archivos de vez en
cuando no hicieron ni mella en eso.

El proyecto además se apoya en un compromiso que me sigue pareciendo interesante. Las ecuaciones
SOP a nivel de puertas son fieles a cómo se enseña y se construye la lógica digital de verdad, y
deducirlas a mano es justo de lo que va el ejercicio, pero se vuelven propensas a errores en cuanto
andas por los cien términos. `ieee.numeric_std` es compacto y correcto por construcción, y esconde
exactamente el detalle del que iba el ejercicio. El diseño ahora usa cada cosa donde tiene sentido.
