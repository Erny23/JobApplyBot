import { Browser, Page } from "puppeteer-core";
import "dotenv/config";
import * as src from "./src/index";
import { ListJobs } from "./src/types/types";

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

  try {
    await page.setViewport({ width: 900, height: 900 });
    await page.goto("https://linkedin.com/feed/");
    await src.waitElement(page, "li-icon[aria-label='LinkedIn']");
    console.log("Página cargada correctamente.");
  } catch (error) {
    console.error("La página no cargó:", error);
    src.disconnect(browser);
  }

  await src.wait(2000);

  await src.logIn(page, name, userName, password);

  await src.wait(2000);

  const btn: boolean = await src.waitElement(page, "span::-p-text('Empleos')");
  if (btn) {
    try {
      const works = await page
        .locator("#global-nav > div > nav > ul > li:nth-child(3) > a")
        .waitHandle();
      await works.hover();
      await src.wait(2000);
      await works.click();
      console.log("Entrando a la página de empleos...");
      await src.waitElement(
        page,
        "h2::-p-text('Principales empleos que te recomendamos')"
      );
      console.log("Página de Empleos cargada correctamente.");
      const seeMore = await page
        .locator(
          "a[aria-label='Mostrar todo Principales empleos que te recomendamos'] > span"
        )
        .waitHandle();
      await src.wait(2000);
      await seeMore.hover();
      await src.wait(5000);
      await seeMore.click();
      console.log("Cargando lista de trabajos...");
      await src.waitElement(
        page,
        "span::-p-text('Principales empleos que te recomendamos')"
      );
      console.log("Lista de trabajos cargada correctamente.");
      const simpleRequest = await page
        .locator("a::-p-text('Solicitud sencilla')")
        .waitHandle();
      await src.wait(2000);
      await simpleRequest.hover();
      await src.wait(5000);
      await simpleRequest.click();
      console.log("Filtrando trabajos por solicitud sencilla...");
      await src.wait(2000);
      await src.waitElement(
        page,
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

  const jobs = await src.listJobs(page);
  console.log("Lista de trabajos obtenida: ", jobs);

  await src.wait(5000);
  src.disconnect(browser);
})();
