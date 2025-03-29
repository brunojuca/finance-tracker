import "server-only";
import { _t, Locale } from "../../utils/i18n";

const dictionaries = {
  en: () =>
    import("../../dictionaries/en.json").then((module) => module.default),
  pt: () =>
    import("../../dictionaries/pt.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
export type Translator = (key: string) => string;

export const getTranslations = async (locale: Locale): Promise<Translator> => {
  const dict = await getDictionary(locale);

  return (key: string) => _t(key, dict);
};
