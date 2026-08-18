import type { Lang } from '../i18n/utils';

export const areaIds = ['electronics', 'qa', 'tinkering', 'web'] as const;

export type AreaId = (typeof areaIds)[number];

type Area = {
	id: AreaId;
	name: Record<Lang, string>;
	/** One line for the area index and the meta description. */
	summary: Record<Lang, string>;
	/** Paragraphs for the area page itself. */
	intro: Record<Lang, string[]>;
};

export const areas: Area[] = [
	{
		id: 'electronics',
		name: { en: 'Electronics and low level', es: 'Electrónica y bajo nivel' },
		summary: {
			en: 'Digital logic and assembly, from truth tables to gates.',
			es: 'Lógica digital y assembly, de la tabla de verdad a las puertas.',
		},
		intro: {
			en: [
				'Boolean equations derived from truth tables, simplified with Karnaugh maps and mapped onto AND, OR and NOT gates and T flip-flops. No behavioural shortcuts, which is slower to write and much easier to get wrong, and that is exactly the point of doing it that way.',
				'This is also where Motorola 68K assembly and computer architecture live. I picked all of it up studying Electronic Engineering at the UPV/EHU, a degree I did not finish, and it still changes how I read code several abstraction levels above it.',
				'The Enigma below is the piece I keep coming back to. It is a working cipher machine at gate level, and it is also the clearest example I have of why a design you understand well is not a design you have verified.',
			],
			es: [
				'Ecuaciones booleanas deducidas de tablas de verdad, simplificadas con mapas de Karnaugh y traducidas a puertas AND, OR y NOT y biestables T. Sin atajos de comportamiento, que es más lento de escribir y mucho más fácil de equivocar, y ahí está justamente la gracia de hacerlo así.',
				'Aquí vive también el assembly de Motorola 68K y la arquitectura de computadores. Todo eso lo aprendí estudiando Ingeniería Electrónica en la UPV/EHU, una carrera que no llegué a terminar, y me sigue cambiando la forma de leer código que está varios niveles de abstracción por encima.',
				'El Enigma de abajo es la pieza a la que sigo volviendo. Es una máquina de cifrado funcionando a nivel de puertas, y es también el ejemplo más claro que tengo de por qué un diseño que entiendes bien no es un diseño que hayas verificado.',
			],
		},
	},
	{
		id: 'qa',
		name: { en: 'QA and automation', es: 'QA y automatización' },
		summary: {
			en: 'Testing, pipelines and the things that only automation catches.',
			es: 'Testing, pipelines y lo que solo caza la automatización.',
		},
		intro: {
			en: [
				'End to end testing with Cypress and Playwright, continuous integration with Jenkins, GitLab CI and GitHub Actions, and environments built with Docker and Nginx so that a pipeline runs against something close to production.',
				'This site is part of the area rather than a showcase of it. Every push runs a type check, a build, a link checker, 86 Playwright tests across desktop and mobile, an axe accessibility pass and Lighthouse budgets before anything is deployed.',
			],
			es: [
				'Tests de extremo a extremo con Cypress y Playwright, integración continua con Jenkins, GitLab CI y GitHub Actions, y entornos montados con Docker y Nginx para que el pipeline corra contra algo parecido a producción.',
				'Esta web forma parte del área, no es un escaparate de ella. Cada push pasa un chequeo de tipos, un build, un comprobador de enlaces, 86 tests de Playwright en escritorio y móvil, una auditoría de accesibilidad con axe y los presupuestos de Lighthouse antes de desplegar nada.',
			],
		},
	},
	{
		id: 'tinkering',
		name: { en: 'Tinkering', es: 'Cacharreo' },
		summary: {
			en: 'Things built to find out how they work, not that anyone asked.',
			es: 'Cosas construidas para ver cómo funcionan.',
		},
		intro: {
			en: [
				'Cellular automata, matrix operations, numerical methods. Small things I built to understand something rather than to ship it, which is also why several of them reinvent a wheel that already existed.',
				'They tend to teach more than the tidy version would. Writing a matrix multiplication that is too slow and fails and then working out why is a different kind of knowledge from importing a library that is already fast and optimized.',
			],
			es: [
				'Autómatas celulares, operaciones con matrices, métodos numéricos. Cosas pequeñas que construí para entender algo, no para publicarlo, que es también la razón de que varias reinventen una rueda que ya existía.',
				'Suelen enseñar más que la mejor versión. Escribir una multiplicación de matrices que va lenta y con bugs y luego averiguar por qué es un tipo de conocimiento distinto a importar una librería que funciona óptimamente.',
			],
		},
	},
	{
		id: 'web',
		name: { en: 'Web development', es: 'Desarrollo web' },
		summary: {
			en: 'Full stack work, from vanilla JavaScript to React and Astro.',
			es: 'Full stack, de JavaScript sin frameworks a React y Astro.',
		},
		intro: {
			en: [
				'React, TypeScript and Redux on the front end, Node and Express with MongoDB behind it, and Astro for this site. I try not to depend on any one framework, so several of these projects deliberately reinvent the wheel in plain JavaScript first.',
				'The order below is roughly the order I built them, which doubles as a record of what I was learning at the time.',
			],
			es: [
				'React, TypeScript y Redux en el front, Node y Express con MongoDB detrás, y Astro para esta web. Intento no depender de ningún framework en concreto, así que varios de estos proyectos reinventan la rueda a propósito en JavaScript pelado.',
				'El orden de abajo es más o menos el orden en que los construí, lo que sirve también como registro de lo que estaba aprendiendo en cada momento.',
			],
		},
	},
];

export function findArea(id: string) {
	return areas.find((area) => area.id === id);
}
