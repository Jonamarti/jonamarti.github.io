import type { Lang } from '../i18n/ui';

type TimelineEntry = {
	date: Record<Lang, string>;
	title: Record<Lang, string>;
	body: Record<Lang, string>;
};

export const timeline: TimelineEntry[] = [
	{
		date: { en: 'College', es: 'Universidad' },
		title: { en: 'Electronic Engineering', es: 'Ingeniería Electrónica' },
		body: {
			en: 'Assembly (Motorola 68K), Java, Python, VHDL, Scilab - computer architecture fundamentals, physics and mathematics.',
			es: 'Assembly (Motorola 68K), Java, Python, VHDL y Scilab: fundamentos de arquitectura de computadores, física y matemáticas.',
		},
	},
	{
		date: { en: 'Self-taught', es: 'Autodidacta' },
		title: { en: 'Web Development Foundations', es: 'Fundamentos de desarrollo web' },
		body: {
			en: 'HTML, CSS, JavaScript. Wireshark, Git... Built typical first projects: Number Converter, To Do App. Trying to reinvent the wheel without relying on existing frameworks.',
			es: 'HTML, CSS, JavaScript. Wireshark, Git... Los primeros proyectos de siempre: Number Converter y To Do App, reinventando la rueda a propósito para no depender de frameworks.',
		},
	},
	{
		date: { en: '2022', es: '2022' },
		title: { en: 'Frontend Developer', es: 'Desarrollador frontend' },
		body: {
			en: 'Left college and started working using React, TypeScript, Redux, CSS.',
			es: 'Dejé la universidad y empecé a trabajar con React, TypeScript, Redux y CSS.',
		},
	},
	{
		date: { en: '2023', es: '2023' },
		title: { en: 'QA, DevOps and Automation', es: 'QA, DevOps y automatización' },
		body: {
			en: 'Pivoted to QA and automation, using Cypress for E2E testing, Jenkins for CI, and GitLab CI/CD, with a focus on building reliable systems and pipelines.',
			es: 'Giro hacia QA y automatización: Cypress para tests E2E, Jenkins para integración continua y GitLab CI/CD, centrado en construir sistemas y pipelines fiables.',
		},
	},
	{
		date: { en: 'In parallel', es: 'En paralelo' },
		title: { en: 'Martial arts', es: 'Artes marciales' },
		body: {
			en: "Judo, Sambo, MMA and grappling. I've been training all my life and teaching MMA, Sambo and Grappling since 2018.",
			es: 'Judo, Sambo, MMA y grappling. Llevo entrenando toda la vida y dando clases de MMA, Sambo y Grappling desde 2018.',
		},
	},
	{
		date: { en: 'Current', es: 'Actualmente' },
		title: { en: 'Beyond', es: 'Lo siguiente' },
		body: {
			en: 'Automating as much as possible while keeping quality high. Using AI as an acceleration tool for my projects.',
			es: 'Automatizar todo lo posible sin bajar el listón de calidad. Uso la IA como herramienta de aceleración en mis proyectos.',
		},
	},
];
