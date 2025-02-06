import { Browser } from "puppeteer-core";

const disconnect = async (browser: Browser) => {
  await browser.close();
  await browser.disconnect();
  console.log("Navegador desconectado correctamente.");
};

export default disconnect;
