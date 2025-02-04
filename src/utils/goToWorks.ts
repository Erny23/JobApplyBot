import { Page } from "puppeteer-core";

const works = async (page: Page) => {
  try {
    await page.hover("a[href='https://www.linkedin.com/jobs/?']");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.click("a[href='https://www.linkedin.com/jobs/?']");
    console.log("Entrando a la página de empleos...");
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
};

export default works;
