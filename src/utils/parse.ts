export const parseArray = (env: string): string[] => {
  if (!env) {
    return [];
  }
  env = env.toLocaleLowerCase();
  return env
    .split(",")
    .flatMap((part) => part.split("\n"))
    .flatMap((part) => part.split(/[\s\/\\()-]+/));
};

export const removeDuplicate = (keywords: string[]): string[] => {
  keywords = keywords.filter(
    (keyword) =>
      keyword.length > 0 &&
      keyword.length > 1 &&
      keyword !== "con" &&
      keyword !== "para" &&
      keyword !== "por" &&
      keyword !== "en" &&
      keyword !== "de" &&
      keyword !== "del"
  );
  const uniqueKeywords = new Set(keywords);
  return Array.from(uniqueKeywords);
};
