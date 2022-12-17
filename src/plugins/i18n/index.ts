import { createI18n } from 'vue-i18n';
import en from './en';
import chZn from './ch-cn';

export const localLang = navigator.language.split('-')[0];
const storageLang =
  window.localStorage
    .getItem('locale')
    ?.split('"')[1]
    .split('"')[0]
    .toLocaleLowerCase() || 'en';
export const c =
  storageLang.toLocaleLowerCase() !== 'zh' &&
  storageLang.toLocaleLowerCase() !== 'en'
    ? 'en'
    : storageLang;

const i18n = createI18n({
  globalInjection: true,
  // locale: c || localLang || 'zh',
  locale: 'zh',
  messages: {
    en,
    us: en,
    zh: chZn,
    cn: chZn,
  },
});
export default i18n;
