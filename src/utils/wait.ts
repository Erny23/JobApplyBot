import { Page } from "puppeteer-core";

const initialTime = 2000;
const maxTime = 10000;
const increment = 2000;
let currentTime = initialTime;

export const waitForElements = async (page: Page, selector: string) => {
  let found = false;
  let emelent: any;

  console.log("Esperando elementos...");
  while (!found && currentTime <= maxTime) {
    try {
      emelent = await page.waitForSelector(selector, {
        visible: true,
        timeout: currentTime,
      });
      found = true;
    } catch (error) {
      console.log(
        `No se encontraron elementos. Reintentando en ${
          currentTime / 1000
        } segundos...`
      );
      currentTime += increment;
    }
  }

  if (found) {
    console.log("Elemento encontrado!");
  } else {
    console.log("No se encontró: ", selector);
  }
  return found;
};

export const waitPromise = (time: number) => {
  if (time < 1000) {
    return;
  }
  return new Promise((resolve) => setTimeout(resolve, time));
};
