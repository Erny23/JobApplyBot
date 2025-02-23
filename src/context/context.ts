import { Page } from "puppeteer-core";

// We export a single instance (Singleton) of the context
export class PageContext {
  private static instance: PageContext; // Singleton unique instance
  private page: Page | null = null; // Here we will store the page instance

  // Private constructor to avoid direct instantiation
  private constructor() {}

  // Static method to get the single instance
  public static getInstance(): PageContext {
    if (!PageContext.instance) {
      PageContext.instance = new PageContext();
    }
    return PageContext.instance;
  }

  // Method to set the page instance
  public setPage(page: Page): void {
    this.page = page;
  }

  // Method to get the page instance
  public getPage(): Page {
    if (!this.page) {
      throw new Error(
        "Error, the page context has not be set, first call to setPage method in PageContext class."
      );
    }
    return this.page;
  }
}
