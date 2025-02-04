import { Page } from "puppeteer-core";

const logIn = async (
  page: Page,
  name: string,
  userName: string,
  password: string
) => {
  try {
    const form = await page.waitForSelector("form[class='login__form']", {
      timeout: 5000,
    });
    if (form) {
      console.log("Se detectó el formulario de inicio de sesión.");
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
        await page.waitForSelector("h3", { visible: true });
        await page.waitForFunction(() => {
          const h3 = document.querySelector("h3");
          return h3 && h3.textContent?.includes(name);
        });
        console.log("Sesión iniciada correctamente.");
      } catch (error) {
        console.log("Error al iniciar sesión.");
      }
    } else {
      await page.waitForSelector("h3", { visible: true });
      await page.waitForFunction(() => {
        const h3 = document.querySelector("h3");
        return h3 && h3.textContent?.includes(name);
      });
      console.log("Sesión ya abierta.");
      return true;
    }
  } catch (error) {
    console.log("No se pudo confirmar el inicio de sesión: ", error);
    return false;
  }
};

export default logIn;
