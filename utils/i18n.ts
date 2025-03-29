// Based on https://github.com/Kodaps/gradient-ascent

export const locales = ["en", "pt"];
export const defaultLocale = "en";

export type Locale = "en" | "pt";

export type Dict = {
  [key: string]: string | Dict;
};

function getFromDictionary(
  keys: Array<string>,
  dict: Dict | string,
): Dict | string {
  if (typeof dict == "string") {
    return dict;
  }

  if (keys.length === 0) {
    return "";
  }

  if (!dict) {
    return "";
  }

  const key = keys.shift() || "";

  return getFromDictionary(keys, dict[key]);
}

export const _t = (key: string, dict: Dict): string => {
  if (!key) {
    return "";
  }

  const keys = key.split(".");

  // console.warn('Split keys is now ', keys);

  const ret = getFromDictionary(keys, dict);

  if (!ret) {
    return key;
  }

  if (typeof ret !== "string") {
    console.error("getFromDict returned a " + typeof ret);
    return key;
  }

  return ret;
};
