import i18default from "i18next";
// tslint:disable-next-line:no-var-requires
const i18next: typeof i18default = require("i18next");
import { getConfigRoot } from "./configUtil";
import { en, ja } from "./stringResources";

let lng = "en";

try {
  lng = getConfigRoot().language;
} catch (ex) {
  console.log(ex.message);
}

i18next.init({
  fallbackLng: "en",
  lng,
  resources: {
    en: {
      translation: en,
    },
    ja: {
      translation: ja,
    },
  },
});

export default function translateTaggedTemplate(strings: TemplateStringsArray, ...keys: string[]): string {
  return i18next.t(strings.raw[0]);
}
