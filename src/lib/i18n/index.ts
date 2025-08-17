export type { Translations, TeamMember, Language } from './types/translations';
export { enTranslations } from './locales/en';
export { zhTranslations } from './locales/zh';
export { maintainers, developers, designers, contributors, sponsors } from './constants/team';

import { Translations } from './types/translations';
import { enTranslations } from './locales/en';
import { zhTranslations } from './locales/zh';

export const translations: Record<'en' | 'zh', Translations> = {
  en: enTranslations,
  zh: zhTranslations,
};