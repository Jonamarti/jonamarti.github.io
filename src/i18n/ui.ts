export const languages = {
	en: 'English',
	es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
	en: {
		'nav.home': 'Home',
		'nav.projects': 'Projects',
		'nav.about': 'About',
		'nav.areas': 'Areas',
		'nav.seeAllAreas': 'See all areas',
		'nav.seeAll': 'See all projects',
		'nav.label': 'Main navigation',
		'nav.toggle': 'Toggle navigation menu',
		'nav.language': 'Ver en español',

		'skip.link': 'Skip to content',
		'goUp.label': 'Back to top',

		'home.title': 'Jon A. Martiarena - Full Stack Developer & QA Automation',
		'home.description':
			'Jon A. Martiarena - full stack developer and QA automation specialist. Projects in React, TypeScript, Cypress, VHDL and vanilla JavaScript.',
		'home.greeting': "Hi, I'm Jon A. Martiarena",
		'home.role': 'Full stack developer and QA automation specialist',
		'home.intro':
			'Coming from electronics and low level programming, I work on web development, test automation and CI/CD.',

		'projects.title': 'Projects - Jon A. Martiarena',
		'projects.description':
			'Projects by Jon A. Martiarena - full stack, React, vanilla JavaScript, Python and gate level VHDL. Live demos and source code.',
		'projects.heading': 'List of projects',
		'projects.intro': 'You can find some of my projects below',
		'projects.readMore': 'Read more...',

		'areas.title': 'Areas - Jon A. Martiarena',
		'areas.description':
			'The areas Jon A. Martiarena works in: electronics and low level design, QA and automation, tinkering and web development.',
		'areas.heading': 'Areas',
		'areas.intro': 'Each area collects the projects and notes that belong to it. A project can sit in more than one.',
		'areas.projects': 'Projects in this area',
		'areas.notes': 'Notes',
		'areas.noNotes': 'No notes written yet.',
		'areas.projectCount': 'projects',
		'areas.projectCountOne': 'project',
		'areas.back': 'All areas',
		'areas.inThis': 'Areas',

		'filter.label': 'Filter projects by area',
		'filter.all': 'All',
		'filter.showing': 'Showing {shown} of {total} projects',

		'about.title': 'About - Jon A. Martiarena',
		'about.description':
			'About Jon A. Martiarena - full stack developer, QA automation specialist and martial arts instructor, with a background in electronics and self taught web development.',
		'about.heading': 'About me',
		'about.skills': "Technologies I've worked with",
		'about.path': 'My Path',

		'footer.github': 'GitHub profile',
		'footer.linkedin': 'LinkedIn profile',
		'footer.repo': 'GitHub repository',
		'footer.projectLink': 'Link to project page:',
		'footer.appLink': 'Link to the app:',

		'notFound.title': 'Page not found - Jon A. Martiarena',
		'notFound.heading': 'Page not found',
		'notFound.body': 'That page does not exist. Try the navigation bar above.',
	},
	es: {
		'nav.home': 'Inicio',
		'nav.projects': 'Proyectos',
		'nav.about': 'Sobre mí',
		'nav.areas': 'Áreas',
		'nav.seeAllAreas': 'Ver todas las áreas',
		'nav.seeAll': 'Ver todos los proyectos',
		'nav.label': 'Navegación principal',
		'nav.toggle': 'Abrir o cerrar el menú de navegación',
		'nav.language': 'View in English',

		'skip.link': 'Saltar al contenido',
		'goUp.label': 'Volver arriba',

		'home.title': 'Jon A. Martiarena - Desarrollo full stack y automatización de QA',
		'home.description':
			'Jon A. Martiarena - desarrollador full stack y especialista en automatización de QA. Proyectos en React, TypeScript, Cypress, VHDL y JavaScript sin frameworks.',
		'home.greeting': 'Hola, soy Jon A. Martiarena',
		'home.role': 'Desarrollador full stack y especialista en automatización de QA',
		'home.intro':
			'Vengo de la electrónica y la programación de bajo nivel. Trabajo en desarrollo web, automatización de tests y CI/CD.',

		'projects.title': 'Proyectos - Jon A. Martiarena',
		'projects.description':
			'Proyectos de Jon A. Martiarena: full stack, React, JavaScript sin frameworks, Python y VHDL a nivel de puerta. Demos y código fuente.',
		'projects.heading': 'Lista de proyectos',
		'projects.intro': 'Abajo puedes ver algunos de mis proyectos',
		'projects.readMore': 'Leer más...',

		'areas.title': 'Áreas - Jon A. Martiarena',
		'areas.description':
			'Las áreas en las que trabaja Jon A. Martiarena: electrónica y diseño a bajo nivel, QA y automatización, cacharreo y desarrollo web.',
		'areas.heading': 'Áreas',
		'areas.intro': 'Cada área reúne los proyectos y apuntes que le corresponden. Un proyecto puede estar en más de una.',
		'areas.projects': 'Proyectos de esta área',
		'areas.notes': 'Apuntes',
		'areas.noNotes': 'Todavía no hay apuntes escritos.',
		'areas.projectCount': 'proyectos',
		'areas.projectCountOne': 'proyecto',
		'areas.back': 'Todas las áreas',
		'areas.inThis': 'Áreas',

		'filter.label': 'Filtrar proyectos por área',
		'filter.all': 'Todos',
		'filter.showing': 'Mostrando {shown} de {total} proyectos',

		'about.title': 'Sobre mí - Jon A. Martiarena',
		'about.description':
			'Sobre Jon A. Martiarena: desarrollador full stack, especialista en automatización de QA e instructor de artes marciales, con formación en electrónica y desarrollo web autodidacta.',
		'about.heading': 'Sobre mí',
		'about.skills': 'Tecnologías con las que he trabajado',
		'about.path': 'Mi recorrido',

		'footer.github': 'Perfil de GitHub',
		'footer.linkedin': 'Perfil de LinkedIn',
		'footer.repo': 'Repositorio de GitHub',
		'footer.projectLink': 'Repositorio del proyecto:',
		'footer.appLink': 'Enlace a la aplicación:',

		'notFound.title': 'Página no encontrada - Jon A. Martiarena',
		'notFound.heading': 'Página no encontrada',
		'notFound.body': 'Esa página no existe. Prueba con la barra de navegación.',
	},
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLang];
