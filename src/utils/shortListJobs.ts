import { Page } from "puppeteer-core";
import { ListJobs } from "../types/types";

const recomendedWorks = async (page: Page) => {
  const jobs: ListJobs = await page.$$eval(
    "ul[aria-label='Principales empleos que te recomendamos'] > li",
    (liElements) => {
      return liElements.map((li) => {
        const titleElement = li.querySelector(
          "div > div > div > div:nth-child(2) > div > a[dir='ltr'] > span:nth-child(1) > strong"
        );
        const title = titleElement ? titleElement.textContent?.trim() : null;

        const locationElement = li.querySelector(
          "div > div > div > div:nth-child(2) > div > ul > li > span"
        );
        const location = locationElement
          ? locationElement.textContent?.trim()
          : null;

        const simpleRequest = li.querySelector(
          "div > div > div > div:nth-child(2) > ul > li > span[dir='ltr']"
        );

        return {
          title,
          location,
          hasSimpleRequest: !!simpleRequest, // ¿Existe el span con "Solicitud sencilla"?
        };
      });
    }
  );
  const list = jobs.filter(
    (item) => item.title !== null && item.hasSimpleRequest !== false
  );

  return list;
};

export default recomendedWorks;
