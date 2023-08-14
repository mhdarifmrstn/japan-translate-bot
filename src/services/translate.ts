import { translate as baseTranslate } from "google-translate-api-x";

export default async function translate(text: string) {
  const japanResult = await baseTranslate(text, { from: "ja", to: "en" });

  if (japanResult.from.language.iso === "ja") {
    return {
      resultText: japanResult.text,
      pronunciation: japanResult.raw[0][0],
    };
  }
  const englishResult = await baseTranslate(text, { from: "en", to: "ja" });

  return {
    resultText: englishResult.text,
    pronunciation: englishResult.pronunciation,
  };
}
