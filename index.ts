import { Browser, Page } from "puppeteer-core";
import { PageContext } from "@context";
import { ListJobs } from "@type";
import { waitForElements, waitPromise } from "@wait";
import "dotenv/config";
import * as src from "./src/index";

const browserPath: string =
  process.env.BROWSER_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const userDataDirPath: string =
  process.env.USER_DATA ||
  "C:\\Users\\Efava\\AppData\\Local\\Google\\Chrome\\User Data\\Default";
const name: string = process.env.NAME || "";
const userName: string = process.env.USER || "";
const password: string = process.env.PASSWORD || "";

(async () => {
  const browser: Browser = await src.browser(browserPath, userDataDirPath);
  const page: Page = await browser.newPage();

  // Setting global context instance for current page
  const pageContext = PageContext.getInstance();
  pageContext.setPage(page);

  try {
    await page.setViewport({ width: 1200, height: 900 });
    await page.goto("https://linkedin.com/feed/");
    await waitForElements("li-icon[aria-label='LinkedIn']");
    console.log("Page has loaded successful");
  } catch (error) {
    console.error("Error, the page failed to load.");
    src.disconnect(browser);
  }

  await waitPromise(2000);

  await src.logIn(name, userName, password);

  await waitPromise(2000);

  const btn: boolean = await waitForElements("span::-p-text('Empleos')");
  if (btn) {
    try {
      const works = await page
        .locator("#global-nav > div > nav > ul > li:nth-child(3) > a")
        .waitHandle();
      await works.hover();
      await waitPromise(2000);
      await works.click();
      console.log("Loading page of jobs...");
      await waitForElements(
        "h2::-p-text('Principales empleos que te recomendamos')"
      );
      console.log("Page of jobs has loaded successful");
      const seeMore = await page
        .locator(
          "a[aria-label='Mostrar todo Principales empleos que te recomendamos'] > span"
        )
        .waitHandle();
      await waitPromise(2000);
      await seeMore.hover();
      await waitPromise(5000);
      await seeMore.click();
      console.log("Loading jobs list...");
      await waitForElements(
        "span::-p-text('Principales empleos que te recomendamos')"
      );
      console.log("List of jobs has loaded successful");
      const simpleRequest = await page
        .locator("a::-p-text('Solicitud sencilla')")
        .waitHandle();
      await waitPromise(2000);
      await simpleRequest.hover();
      await waitPromise(5000);
      await simpleRequest.click();
      console.log("Loading list of jobs with simple request...");
      await waitPromise(2000);
      await waitForElements(
        "span::-p-text('Empleos de solicitud sencilla de LinkedIn')"
      );
      console.log("Page of jobs with simple request has loaded successful");
    } catch (error) {
      console.log("Error, could not click the button.");
      src.disconnect(browser);
    }
  } else {
    console.log("Error, could not found the button.");
    src.disconnect(browser);
  }
  console.log("Looking for jobs in recommended list by LinkedIn...");
  const recomendedJobs: ListJobs = await src.offers();
  console.log(`There were ${recomendedJobs.length} job offers left.`);

  await src.apply(recomendedJobs);

  await waitPromise(8000);
  src.disconnect(browser);
})();
