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
      slowMo: 150,
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
      await page.waitForSelector("form[method='post']", {
        timeout: 20000,
      });
      await page.waitForSelector("input");
      await page.click("input[id='username']");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      for (const char of userName) {
        await page.keyboard.type(char, { delay: 200 });
      }
      await page.click("input[id='password']");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      for (const char of password) {
        await page.keyboard.type(char, { delay: 200 });
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await page.click("input[id='rememberMeOptIn-checkbox']");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await page.locator("input[id='rememberMeOptIn-checkbox']").fill("true");
      console.log("Se llenó el formulario.");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await page.hover("button[type='submit']");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await page.click("button[type='submit']");
      console.log("Iniciando sesión...");
      await page.waitForSelector("h3", { visible: true });
      await page.waitForFunction(() => {
        const h3 = document.querySelector("h3");
        return h3 && h3.textContent?.includes(name);
      });
      console.log("Sesión iniciada correctamente.");
    } catch (error) {
      console.log("No se detectó el formulario de inicio de sesión.");
    }

    await page.waitForSelector("h3", { visible: true });
    await page.waitForFunction(() => {
      const h3 = document.querySelector("h3");
      return h3 && h3.textContent?.includes(name);
    });
    console.log("Sesión ya abierta.");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await page.hover("a[href='https://www.linkedin.com/jobs/?']");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.click("a[href='https://www.linkedin.com/jobs/?']");
    console.log("Entrando a la página de empleos...");

    try {
      await page.waitForSelector(
        "a[href='https://www.linkedin.com/jobs/collections/recommended?discover=recommended&discoveryOrigin=JOBS_HOME_JYMBII']",
        { visible: true }
      );
      const moreWorks = page.locator(
        "a[href='https://www.linkedin.com/jobs/collections/recommended?discover=recommended&discoveryOrigin=JOBS_HOME_JYMBII']"
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await moreWorks.hover();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await moreWorks.click();
      console.log("Redirigiendo a empleos recomendados...");

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const simpleRequest = page.locator(
        "a[href='https://www.linkedin.com/jobs/collections/easy-apply?discover=recommended&discoveryOrigin=JOBS_HOME_JYMBII&start=0']"
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await simpleRequest.hover();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await simpleRequest.click();
      console.log("Redirigiendo a empleos con solicitud simple...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await page.waitForSelector("ul.hTpjJTkbbHIePPiRZSAuhLZgzXdXmWlxpc", {
        visible: true,
      });
      console.log("Empleos cargados correctamente.");
    } catch (error) {
      console.log("Error de try/catch página de empleos.");
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
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
