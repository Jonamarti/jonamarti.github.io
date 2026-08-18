import { defaultLang, ui, type Lang, type UiKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
	const [, segment] = url.pathname.split('/');
	if (segment in ui) return segment as Lang;
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	return function t(key: UiKey): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

/** Prefixes a root relative path with the locale, except for the default one. */
export function localizePath(path: string, lang: Lang): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	return lang === defaultLang ? clean : `/${lang}${clean}`;
}

/** Removes the locale prefix, so the same page can be resolved in another language. */
export function stripLangPrefix(pathname: string): string {
	const [, segment, ...rest] = pathname.split('/');
	if (segment in ui && segment !== defaultLang) {
		return `/${rest.join('/')}`;
	}
	return pathname;
}

export function otherLang(lang: Lang): Lang {
	return lang === 'en' ? 'es' : 'en';
}

export type { Lang } from './ui';
export { defaultLang, languages } from './ui';
