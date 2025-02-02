import puppeteer from "puppeteer-core";
import "dotenv";

const browserPath: string =
  process.env.BROWSER_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const userDataDirPath: string =
  process.env.USER_DATA ||
  "C:\\Users\\Efava\\AppData\\Local\\Google\\Chrome\\User Data\\Default";
const user = process.env.USER || "";

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
    await page.goto("https://linkedin.com/feed/");

    // Intentar detectar si hay un formulario de inicio de sesión
    try {
      await page
        .locator("h1")
        .filter((h1) => h1.innerText === "Iniciar sesión")
        .wait();
      console.log("Se detectó un formulario de inicio de sesión.");
      // Aquí puedes agregar el código para manejar el formulario de inicio de sesión
    } catch (error) {
      console.log("No se detectó un formulario de inicio de sesión.");
    }

    // Intentar detectar si hay un feed
    try {
      // Identifica la página de feed
      await page.waitForSelector("h3", { timeout: 5000 });
      await page
        .locator("h3")
        .filter((h3) => h3.innerText === user)
        .wait();
      console.log("Se detectó el feed.");
      // Aquí puedes agregar el código para manejar el formulario de inicio de sesión
    } catch (error) {
      console.log("Se produjo un error");
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
