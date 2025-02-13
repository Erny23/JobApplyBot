import { ListJobs } from "@type";
import { parseArrayEnv } from "@parse";

const keywordsEnv = process.env.KEYWORDS;
const excludeEnv = process.env.EXCLUDE;

const filter = (offers: ListJobs) => {
  const include = parseArrayEnv(keywordsEnv);
  const exclude = parseArrayEnv(excludeEnv);

  return offers
    .filter((offer) => {
      // Check if the bid matches an inclusion keyword
      const matches = (job: string) => {
        if (!job) {
          return false;
        }
        const keyword = job.toLowerCase();
        if (offer.title && typeof offer.title === "string") {
          return offer.title.toLowerCase().includes(keyword);
        }
        return false;
      };

      // Check if the bid matches at least one inclusion keyword
      const hasKeywordMatch = include.some((job) => matches(job));

      // Check if the bid does NOT match any exclusion keywords
      const hasNoExcludeMatch = exclude.every((job) => !matches(job));

      // Include the bid only if it matches at least one keyword
      // and does not match any exclusion keywords
      return hasKeywordMatch && hasNoExcludeMatch;
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
