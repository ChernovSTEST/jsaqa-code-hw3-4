let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
});

describe("Additional Tests", () => {
  let pageAdditional;

  beforeEach(async () => {
    pageAdditional = await browser.newPage();
  });

  test("The page About", async () => {
    await pageAdditional.goto("https://github.com/about");
    const title = await pageAdditional.title();
    expect(title).toContain("About · GitHub");
  }, 30000);

  test("The page Pricing", async () => {
    await pageAdditional.goto("https://github.com/pricing");
    const title = await pageAdditional.title();
    expect(title).toContain("Pricing · Plans for every developer · GitHub");
  }, 30000);

  test("The page contains Introduction to GitHub", async () => {
    await pageAdditional.goto("https://skills.github.com");
    const btnSelector = ".btn.btn-primary.btn-large";
    await pageAdditional.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await pageAdditional.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Introduction to GitHub");
  }, 30000);

  afterEach(() => {
    pageAdditional.close();
  });
});