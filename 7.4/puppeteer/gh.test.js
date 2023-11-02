let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Three new tests have been added", () => {
  afterEach(() => {
    page.close();
  });

  test("The page About ", async () => {
    await page.goto("https://github.com/about");
    const title = await page.title();
    expect(title).toContain("About · GitHub");
  }, 30000);

  test("The page Pricing", async () => {
    await page.goto("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing · Plans for every developer · GitHub");
  }, 30000);

  test("The page contains Introduction to GitHub", async () => {
    await page.goto("https://skills.github.com");
    const btnSelector = (ss = ".btn.btn-primary.btn-large");
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Introduction to GitHub");
  }, 30000);
});