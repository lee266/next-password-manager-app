/**
 * Please refer to this link
 * https://github.com/i18next/next-i18next
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
    // localeDetection: false,
    // please set path of  locales folder
  },
  localePath: path.resolve('./public/locales'),
}