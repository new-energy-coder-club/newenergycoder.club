// Re-export from the new modular structure for backward compatibility
export type { Translations, TeamMember, Language } from './i18n/types/translations';
export { translations } from './i18n';

// Import for default language constant
import type { Language } from './i18n/types/translations';

// Re-export for backward compatibility
export { translations as default };

export const defaultLanguage: Language = 'en';