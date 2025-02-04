import { Browser, Page } from "puppeteer-core";
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

  try {
    await page.setViewport({ width: 900, height: 900 });
    await page.goto("https://linkedin.com/feed/");
    await page.waitForSelector("li-icon[aria-label='LinkedIn']", {
      visible: true,
    });
    console.log("Página cargada correctamente.");
  } catch (error) {
    console.error("La página no cargó:", error);
    browser.close();
    await browser.disconnect();
    console.log("Navegador desconectado correctamente.");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const login: boolean = await src.logIn(page, name, userName, password);
  if (!login) {
    console.log("No se pudo iniciar sesión.");
    browser.close();
    await browser.disconnect();
    console.log("Navegador desconectado correctamente.");
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  await src.works(page);

  await new Promise((resolve) => setTimeout(resolve, 5000));
  browser.close();
  await browser.disconnect();
  console.log("Navegador desconectado correctamente.");
})();
