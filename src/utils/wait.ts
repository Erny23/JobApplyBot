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

  console.log("Waitting for elements...");
  while (!found && currentTime <= maxTime) {
    try {
      element = await page.waitForSelector(selector, {
        visible: true,
        timeout: currentTime,
      });
      found = true;
    } catch (error) {
      console.log(
        `Could not found elements. Restarting in ${
          currentTime / 1000
        } seconds...`
      );
      currentTime += increment;
    }
  }

  if (found) {
    console.log("Found elements!");
  } else {
    console.log("Could not found the selector: ", selector);
  }
  return found;
};

export const waitPromise = (time: number) => {
  if (time < 1000) {
    return;
  }
  return new Promise((resolve) => setTimeout(resolve, time));
};
