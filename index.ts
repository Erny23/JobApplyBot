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
      slowMo: 50,
    });

    let browserWSEndpoint = browser.wsEndpoint();
    console.log(browserWSEndpoint);

    browser = await puppeteer.connect({
      browserWSEndpoint: browserWSEndpoint,
    });

    const page = await browser.newPage();
    await page.goto("https://linkedin.com/feed/");

    // Intentar detectar si hay un formulario de inicio de sesión
    try {
      await page
        .locator("h1")
        .filter((h1) => h1.innerText === "Iniciar sesión")
        .wait();
      console.log("Se detectó el feed.");
      // Aquí puedes agregar el código para manejar el formulario de inicio de sesión
    } catch (error) {
      console.log("No se detectó un formulario de inicio de sesión.");
    }

    browser.close();
  } catch (error) {
    console.error("Ocurrió un error:", error);
  } finally {
    if (browser) {
      await browser.disconnect();
      console.log("Navegador desconectado correctamente.");
    }
  }
})();
