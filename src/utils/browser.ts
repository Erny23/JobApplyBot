import puppeteer, { Browser } from "puppeteer-core";

const browser = async (browserPath: string, userDataDirPath: string) => {
  let browser: Browser;

  browser = await puppeteer.launch({
    headless: false,
    executablePath: browserPath,
    userDataDir: userDataDirPath,
    slowMo: 150,
  });

  let browserWSEndpoint = browser.wsEndpoint();
  console.log(browserWSEndpoint);

  return (browser = await puppeteer.connect({
    browserWSEndpoint: browserWSEndpoint,
  }));
};

export default browser;
