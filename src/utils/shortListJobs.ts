import { Page } from "puppeteer-core";
import { ListJobs } from "../types/types";
import { waitPromise } from "./wait";

const recomendedWorks = async (page: Page) => {
  const routeBase: string = "main > div > div:nth-child(2) > div > div";

  const element1 = await page
    .locator(`${routeBase} > ul > li:nth-child(10)`)
    .waitHandle();
  await element1?.scrollIntoView();

  await waitPromise(2000);

  const element2 = await page
    .locator(`${routeBase} > ul > li:nth-child(15)`)
    .waitHandle();
  await element2?.scrollIntoView();

  await waitPromise(2000);

  const element3 = await page
    .locator(`${routeBase} > ul > li:nth-child(20)`)
    .waitHandle();
  await element3?.scrollIntoView();

  await waitPromise(2000);

  const footer = await page.locator("#jobs-search-results-footer").waitHandle();
  await footer?.scrollIntoView();

  await waitPromise(2000);

  const offers: ListJobs = await page.$$eval(
    `${routeBase} > ul > li`,
    (list) => {
      return list.map((offer) => {
        const id = offer.getAttribute("id");

        const titleElement = offer.querySelector("a");
        const title = titleElement ? titleElement.ariaLabel?.trim() : null;

        const locationElement = offer.querySelector(
          "div > div > div > div > div:nth-child(2) > div > ul > li > span"
        );
        const location = locationElement
          ? locationElement.textContent?.trim()
          : null;

        const viewSelector = offer
          .querySelector(
            "div > div > div > ul.job-card-list__footer-wrapper > li:nth-child(1)"
          )
          ?.textContent?.includes("Visto");

        const iconSelector = offer.querySelector(
          "div > div > div > ul.job-card-list__footer-wrapper > li > svg.job-card-list__icon"
        );

        const simpleRequestSelector =
          offer
            .querySelector(
              "div > div > div > ul.job-card-list__footer-wrapper > li:nth-child(2) > span"
            )
            ?.textContent?.includes("Solicitud") ||
          offer
            .querySelector(
              "div > div > div > ul.job-card-list__footer-wrapper > li:nth-child(3) > span"
            )
            ?.textContent?.includes("Solicitud");

        const itemsList = {
          view: viewSelector,
          simpleRequest: iconSelector && simpleRequestSelector,
        };

        return {
          id,
          title,
          location,
          itemsList,
        };
      });
    }
  );

  return offers;
};

export default recomendedWorks;
