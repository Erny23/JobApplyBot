import puppeteer from "puppeteer-core";
import "dotenv/config";

const browserPath: string =
  process.env.BROWSER_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const userDataDirPath: string =
  process.env.USER_DATA ||
  "C:\\Users\\Efava\\AppData\\Local\\Google\\Chrome\\User Data\\Default";
const name = process.env.NAME || "";
const userName = process.env.USER || "";
const password = process.env.PASSWORD || "";

(async () => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false,
      executablePath: browserPath,
      userDataDir: userDataDirPath,
      slowMo: 100,
    });

    let browserWSEndpoint = browser.wsEndpoint();
    console.log(browserWSEndpoint);

    browser = await puppeteer.connect({
      browserWSEndpoint: browserWSEndpoint,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 900 });
    await page.goto("https://linkedin.com/feed/");

    try {
      const form = await page.waitForSelector("form[method='post']", {
        timeout: 10000,
      });
      if (form) {
        const uselog = page.locator("input[id='username']");
        await uselog.wait();
        await uselog.fill(userName);
        await page.locator("input[id='password']").fill(password);
        await page.locator("input[id='rememberMeOptIn-checkbox']").fill("true");
        console.log("Se llenó el formulario. Datos: ", uselog);
      } else {
        console.log("No se detectó el formulario.");
      }
    } catch (error) {
      console.log("Se produjo un error en try/catch: ", error);
    }

    // browser.close();
  } catch (error) {
    console.error("Ocurrió un error:", error);
  } finally {
    if (browser) {
      await browser.disconnect();
      console.log("Navegador desconectado correctamente.");
    }
  }
})();
