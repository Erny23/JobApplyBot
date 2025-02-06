import { Page } from "puppeteer-core";
import { waitForElements } from "./wait";

const logIn = async (
  page: Page,
  name: string,
  userName: string,
  password: string
) => {
  let login: boolean = false;
  const currentUrl: string = page.url();

  if (currentUrl.includes("linkedin.com/feed")) {
    try {
      const feed: boolean = await waitForElements(
        page,
        `h3::-p-text("${name}")`
      );
      if (feed) {
        console.log("Sesión ya abierta.");
        return (login = true);
      } else {
        console.log("No se detectó la página de feed.");
      }
    } catch (error) {
      console.log("No se pudo confirmar el inicio de sesión.");
    }
  } else if (currentUrl.includes("login")) {
    try {
      const form: boolean = await waitForElements(
        page,
        "form[class='login__form']"
      );
      console.log("Se detectó la página de inicio de sesión.");
      await page.waitForSelector("input");

      const userNameProfile = await page.$("dt[class='profile__identity']");
      if (userNameProfile) {
        console.log("Se detectó el usuario anteriormente utilizado.");
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

      console.log("Se llenó el formulario.");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const button = await page.locator("button[type='submit']").waitHandle();
      await button.hover();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await button.click();

      console.log("Iniciando sesión...");

      try {
        await waitForElements(
          page,
          "h3[class='profile-card-name text-heading-large']"
        );
        console.log("Sesión iniciada correctamente.");
        login = true;
      } catch (error) {
        console.log("Error al iniciar sesión.");
      }
    } catch (error) {
      console.log("No se detectó la página de inicio de sesión.");
    }
  } else {
    console.log("Ocurrió un problema al cargar la página.");
  }

  return login;
};

export default logIn;
