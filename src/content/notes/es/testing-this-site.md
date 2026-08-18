---
title: Lo que se ejecuta antes de publicar esta web
summary: Las comprobaciones que tiene que pasar cada push, y los dos fallos que las motivaron.
description: El pipeline de integración continua de jonamarti.github.io - chequeo de tipos, comprobador de enlaces sensible a mayúsculas, Playwright, axe y presupuestos de Lighthouse.
area: qa
date: 2026-08-18
tags: [GitHub Actions, Playwright, axe, Lighthouse, CI]
---

Anunciar experiencia en CI/CD en una web que no tenía ningún pipeline propio era difícil de
defender, así que esta pasa ahora el mismo tipo de comprobaciones que montaría para cualquier otro
proyecto. Un push a `master` dispara el workflow, y los pull requests ejecutan todo menos el
despliegue.

## Las comprobaciones

**Chequeo de tipos.** `astro check` sobre cada fichero `.astro` y `.ts`. Las colecciones de
contenido se validan contra un esquema Zod, así que un proyecto al que le falte un campo del
frontmatter o lo tenga mal escrito rompe el build en lugar de renderizar una tarjeta vacía.

**Comprobador de enlaces.** Un script recorre la salida generada y resuelve cada referencia
interna. El detalle importante es que compara contra las entradas reales del directorio en vez de
preguntarle al sistema de ficheros si existe una ruta. Windows no distingue mayúsculas y GitHub
Pages sí, así que una referencia a `Image.PNG` que en realidad es `image.png` funciona en local y da
404 en producción. Preguntando con `existsSync` no se caza nunca.

**Playwright.** 86 tests repartidos en un proyecto de escritorio y otro de móvil: cada ruta
devuelve 200 con un único `h1`, el selector de idioma cae en la misma página en el otro idioma, el
desplegable se abre y se cierra con teclado, y las URLs de la versión anterior a Astro siguen
resolviendo.

**Accesibilidad.** `axe-core` se ejecuta sobre ocho páginas con el conjunto de reglas WCAG 2.1 AA,
más una pasada con el desplegable de navegación abierto, porque un menú al que solo se llega con el
ratón pasa todos los tests que nunca lo abren.

**Lighthouse.** Presupuestos de rendimiento, accesibilidad, buenas prácticas y SEO. Si no se
cumple un presupuesto, el build falla.

## Qué cazaron de verdad

Dos cosas, y de las dos me había convencido ya de que estaban bien.

La primera fue un desplegable que dejó de aparecer al pasar el ratón. Añadirle `position: relative`
al elemento de lista metió el menú dentro de un contenedor con `overflow: hidden` que llevaba todo
el tiempo recortándolo. Antes funcionaba por accidente: al no haber ningún ancestro posicionado, el
menú absoluto se escapaba del recorte por completo.

La segunda fue la página de proyectos sacando un 58 en rendimiento. No tenía experiencia previa en medir el rendimiento de webapps, por lo que esto me sirvió para aprender y para entender dichas métricas. Un GIF animado de 1,3 MB con cuatro fotogramas dentro, y capturas de casi 2000 píxeles de ancho mostradas en tarjetas de trescientos y pico. Convertir las animaciones a WebP y pasar las capturas por el pipeline de imágenes dejó la página en 275 KiB desde 2200 KiB, y el largest contentful paint en 2,2 segundos desde 10,8.