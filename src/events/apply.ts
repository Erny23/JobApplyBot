import { Jobs, ListJobs } from "@type";
import { PageContext } from "@context";
import { waitForElements, waitPromise } from "@wait";
import { ElementHandle } from "puppeteer-core";

const apply = async (offer: ListJobs) => {
  const pageContext = PageContext.getInstance();
  const page = pageContext.getPage();

  const ids: string[] = offer.map((item: Jobs) => item.id);

  console.log("IDs: ", ids);

  const detailsSelector =
    "main div.scaffold-layout__detail div.jobs-search__job-details--wrapper div.job-view-layout";

  let applyList: object[] = [];

  for (const item of ids) {
    const element: ElementHandle<HTMLAnchorElement> = await page
      .locator(`#${item} a`)
      .waitHandle();
    await element.scrollIntoView();
    await waitPromise(2000);
    await element.click();
    await waitPromise(2000);

    const details = await page.locator(`${detailsSelector}`).waitHandle();

    const company = await details.$("div.jobs-details__main-content > section");
    await company?.scrollIntoView();
    await waitPromise(2000);

    const header = await details.$(
      "div.jobs-details__main-content > div:nth-child(1)"
    );
    await header?.scrollIntoView();
    await waitPromise(2000);

    const info = await page.$eval(`${detailsSelector}`, (item) => {
      class ApplyJobs {
        private offer: Element;
        private static readonly SELECTORS = {
          TITLE:
            "div.jobs-details__main-content > div:nth-child(1) h1.t-24 > a.ember-view",
          SUB_DATA:
            "div.jobs-details__main-content > div:nth-child(1) div.job-details-jobs-unified-top-card__primary-description-container > div > span",
          MODE: "div.jobs-details__main-content > div:nth-child(1) ul > li:nth-child(1) > span > span",
          FEATURES:
            "div.jobs-details__main-content div#how-you-match-card-container > section.job-details-how-you-match-card__header > div > h2",
        };

        constructor(offer: Element) {
          this.offer = offer;
        }

        get title(): string {
          const titleElement = this.offer.querySelector(
            ApplyJobs.SELECTORS.TITLE
          ) as HTMLElement;
          if (!titleElement) {
            return "";
          }
          const title = titleElement.textContent as string;
          return title.trim();
        }

        get subData(): string[] {
          const subDataElement = this.offer.querySelectorAll(
            ApplyJobs.SELECTORS.SUB_DATA
          ) as NodeListOf<Element>;
          if (!subDataElement) {
            return [""];
          }
          const subData = Array.from(subDataElement).map((item) => {
            if (item.textContent) {
              return item.textContent as string;
            } else {
              return "";
            }
          });
          return subData
            .map((item) => item.trim())
            .filter((item) => item !== "" && item !== "·" && item.length > 2);
        }

        get mode(): string[] {
          const modeElement = this.offer.querySelectorAll(
            ApplyJobs.SELECTORS.MODE
          ) as NodeListOf<Element>;
          if (!modeElement) {
            return [""];
          }
          const mode = Array.from(modeElement).map((item) => {
            const tags = item.querySelector("span > span:nth-child(1)");
            if (tags) {
              return tags.textContent as string;
            } else {
              return "";
            }
          });
          return mode.map((item) => item.trim());
        }

        get features(): string {
          const featureElement = this.offer.querySelector(
            ApplyJobs.SELECTORS.FEATURES
          ) as HTMLElement;
          if (!featureElement) {
            return "";
          }
          const feature = featureElement.textContent as string;
          return feature.trim();
        }

        get applyData() {
          return {
            title: this.title,
            mode: this.mode,
            subData: {
              location: this.subData[0],
              Date: this.subData[1],
              Participants: this.subData[2],
              Other: this.subData[3],
            },
            features: this.features,
          };
        }
      }
      const offerInstance = new ApplyJobs(item);
      return offerInstance.applyData;
    });
    applyList.push(info);
  }
  console.log("Apply: ", applyList);
  return applyList;
};

export default apply;
