import { PageContext } from "@context";
import { Jobs, ListJobs } from "@type";
import { waitPromise } from "@wait";

const recomendedWorks = async () => {
  const pageContext = PageContext.getInstance();
  const page = pageContext.getPage();

  const routeBase: string = "main > div > div:nth-child(2) > div > div";

  let i = 5;
  while (i < 25) {
    const element = await page
      .locator(`${routeBase} > ul > li:nth-child(${i})`)
      .waitHandle();
    if (element) {
      await element.scrollIntoView();
    }
    await waitPromise(5000);
    i += 5;
  }

  const footer = await page.locator("#jobs-search-results-footer").waitHandle();
  if (footer) {
    await footer.scrollIntoView();
  }

  await waitPromise(2000);

  const listOffers: ListJobs = await page.$$eval(
    `${routeBase} > ul > li`,
    (list) => {
      class Offer {
        private offer: Element;
        private static readonly SELECTORS = {
          TITLE: "a",
          LOCATION:
            "div > div > div > div > div:nth-child(2) > div > ul > li > span",
          VIEW: "div > div > div > ul.job-card-list__footer-wrapper > li:nth-child(1)",
          ICON: "div > div > div > ul.job-card-list__footer-wrapper > li > svg.job-card-list__icon",
        };

        constructor(offer: Element) {
          this.offer = offer;
        }

        get id(): string {
          if (!this.offer.getAttribute("id")) {
            return "";
          }
          return this.offer.getAttribute("id") as string;
        }

        get title(): string {
          const titleElement = this.offer.querySelector(
            Offer.SELECTORS.TITLE
          ) as HTMLElement;
          if (!titleElement) {
            return "";
          }
          const title = titleElement.textContent as string;
          return title.trim();
        }

        get location(): string {
          const locationElement = this.offer.querySelector(
            Offer.SELECTORS.LOCATION
          ) as HTMLElement;
          if (!locationElement) {
            return "";
          }
          const location = locationElement.textContent as string;
          return location.trim();
        }

        get view(): boolean {
          const viewElement = this.offer.querySelector(
            Offer.SELECTORS.VIEW
          ) as HTMLElement;
          if (!viewElement) {
            return false;
          }
          const viewText = viewElement.textContent as string;
          return viewText.includes("Visto");
        }

        get simpleRequest(): boolean {
          const iconSelector = this.offer.querySelector(
            Offer.SELECTORS.ICON
          ) as HTMLElement;
          if (!iconSelector) {
            return false;
          }

          return !!iconSelector;
        }

        get offerData(): Jobs {
          return {
            id: this.id,
            title: this.title,
            location: this.location,
            itemsList: {
              view: this.view,
              simpleRequest: this.simpleRequest,
            },
          };
        }
      }

      return list.map((offer) => {
        const offerInstance = new Offer(offer);
        return offerInstance.offerData;
      });
    }
  );

  return listOffers;
};

export default recomendedWorks;
