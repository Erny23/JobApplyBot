import { ListJobs } from "@type";
import { parseArray, removeDuplicate } from "@parse";

class Parser {
  keyword: string[];

  constructor(keyword: string) {
    this.keyword = this.parseKeywords(keyword);
  }

  private parseKeywords(keyword: string): string[] {
    const listKeywords = parseArray(keyword);
    return removeDuplicate(listKeywords);
  }

  getKeywords(): string[] {
    return this.keyword;
  }
}

const filter = (offers: ListJobs) => {
  const keywordsInclude: string = process.env.KEYWORDS || "";
  const keywordsExclude: string = process.env.EXCLUDES || "";
  if (keywordsInclude === "" && keywordsExclude === "") {
    return offers;
  }
  const keywordForParse: Parser = new Parser(keywordsInclude);
  const includeKeywords: string[] = keywordForParse.getKeywords();
  const excludeForParse: Parser = new Parser(keywordsExclude);
  const excludeKeywords: string[] = excludeForParse.getKeywords();
  return offers
    .filter((offer) => {
      const titleForParse: Parser = new Parser(offer.title);
      const titleKeywords: string[] = titleForParse.getKeywords();

      const isRelevance: boolean = includeKeywords.some((keyword: string) => {
        return titleKeywords.includes(keyword);
      });

      const isNotRelevance: boolean = excludeKeywords.some(
        (keyword: string) => {
          if (!isRelevance) {
            return false;
          }
          return titleKeywords.includes(keyword);
        }
      );

      const specificKeywords = ["no", "remunerado"];
      const specificExclusion: boolean = specificKeywords.every((keyword) => {
        return titleKeywords.includes(keyword);
      });

      return isRelevance && !isNotRelevance && !specificExclusion;
    })
    .map((offer) => {
      return {
        id: offer.id,
        title: offer.title,
        location: offer.location,
        itemsList: {
          view: offer.itemsList.view,
          simpleRequest: offer.itemsList.simpleRequest,
        },
      };
    });
};

export default filter;
