// Re-export from the new modular structure for backward compatibility
export type { Translations, TeamMember, Language } from './i18n/types/translations';
export { translations } from './i18n/index';

export const defaultLanguage = 'en' as const;