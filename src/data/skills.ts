import type { Lang } from '../i18n/ui';

type SkillGroup = {
	title: Record<Lang, string>;
	items: string[];
};

export const skillGroups: SkillGroup[] = [
	{
		title: { en: 'Languages & Low Level', es: 'Lenguajes y bajo nivel' },
		items: ['Assembly (Motorola 68K)', 'Java', 'Python', 'VHDL', 'Scilab'],
	},
	{
		title: { en: 'Frontend', es: 'Frontend' },
		items: ['React', 'TypeScript', 'HTML / CSS', 'Redux / Sagas', 'Astro'],
	},
	{
		title: { en: 'Backend & Full Stack', es: 'Backend y full stack' },
		items: ['Node.js / Express', 'MongoDB'],
	},
	{
		title: { en: 'QA & DevOps', es: 'QA y DevOps' },
		items: ['Cypress', 'Jenkins', 'GitLab', 'Docker', 'Nginx', 'GHDL'],
	},
];
