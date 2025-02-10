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
    await page.setViewport({ width: 900, height: 900 });
    await page.goto("https://linkedin.com/feed/");
    await waitForElements("li-icon[aria-label='LinkedIn']");
    console.log("Página cargada correctamente.");
  } catch (error) {
    console.error("La página no cargó:", error);
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
      console.log("Entrando a la página de empleos...");
      await waitForElements(
        "h2::-p-text('Principales empleos que te recomendamos')"
      );
      console.log("Página de Empleos cargada correctamente.");
      const seeMore = await page
        .locator(
          "a[aria-label='Mostrar todo Principales empleos que te recomendamos'] > span"
        )
        .waitHandle();
      await waitPromise(2000);
      await seeMore.hover();
      await waitPromise(5000);
      await seeMore.click();
      console.log("Cargando lista de trabajos...");
      await waitForElements(
        "span::-p-text('Principales empleos que te recomendamos')"
      );
      console.log("Lista de trabajos cargada correctamente.");
      const simpleRequest = await page
        .locator("a::-p-text('Solicitud sencilla')")
        .waitHandle();
      await waitPromise(2000);
      await simpleRequest.hover();
      await waitPromise(5000);
      await simpleRequest.click();
      console.log("Filtrando trabajos por solicitud sencilla...");
      await waitPromise(2000);
      await waitForElements(
        "span::-p-text('Empleos de solicitud sencilla de LinkedIn')"
      );
      console.log("Trabajos filtrados correctamente.");
    } catch (error) {
      console.log("Error al hacer click en botón empleos.");
      src.disconnect(browser);
    }
  } else {
    console.log("No se encontró el botón de empleos.");
    src.disconnect(browser);
  }

  const jobs: ListJobs = await src.offers();
  console.log("Lista de trabajos obtenida: ", jobs);

  await waitPromise(5000);
  src.disconnect(browser);
})();
