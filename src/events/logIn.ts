import { PageContext } from "@context";
import { waitForElements } from "@wait";

const logIn = async (name: string, userName: string, password: string) => {
  const pageContext = PageContext.getInstance();
  const page = pageContext.getPage();

  let login: boolean = false;
  const currentUrl: string = page.url();

  if (currentUrl.includes("linkedin.com/feed")) {
    try {
      await waitForElements(`h3::-p-text("${name}")`);
      console.log("Already login");
    } catch (error) {
      console.log("Could not check login");
    }
  } else if (currentUrl.includes("login")) {
    try {
      await waitForElements("form[class='login__form']");
      console.log("Login form is detected");
      await page.waitForSelector("input");

      const userNameProfile = await page.$("dt[class='profile__identity']");
      if (userNameProfile) {
        console.log("Previous user login is detected");
      } else {
        const useNameInput = await page
          .locator("input[id='username']")
          .waitHandle();
        await useNameInput.click();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        for (const char of userName) {
          await page.keyboard.type(char, { delay: 200 });
        }
      }

      await page.click("input[id='password']");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      for (const char of password) {
        await page.keyboard.type(char, { delay: 200 });
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const checkbox = await page.locator("input[value='true']").waitHandle();
      if (!checkbox) {
        await page.locator("input[value='false']").click();
      }

      console.log("The login form was fill successful");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const button = await page.locator("button[type='submit']").waitHandle();
      await button.hover();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await button.click();

      console.log("Logging in...");

      try {
        await waitForElements(
          "h3[class='profile-card-name text-heading-large']"
        );
        console.log("The login has loaded successful");
        login = true;
      } catch (error) {
        console.log("Error, could not load login.");
      }
    } catch (error) {
      console.log("Error, the page login failed to load.");
    }
  } else {
    console.log("Error, there was a problem loading the page.");
  }

  return login;
};

export default logIn;
