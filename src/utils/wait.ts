import { PageContext } from "@context";

const initialTime = 2000;
const maxTime = 10000;
const increment = 2000;
let currentTime = initialTime;

export const waitForElements = async (selector: string) => {
  const pageContext = PageContext.getInstance();
  const page = pageContext.getPage();

  let found = false;
  let element: any;

  console.log("Esperando elementos...");
  while (!found && currentTime <= maxTime) {
    try {
      element = await page.waitForSelector(selector, {
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
