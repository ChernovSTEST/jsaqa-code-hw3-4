const { test, expect } = require("@playwright/test");
const { USER_EMAIL, USER_PASSWORD } = require("../user");

test('Успешная авторизация', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');

  // Заполняем поле Email и пароль
  await page.fill('[placeholder="Email"]', USER_EMAIL);
  await page.fill('[placeholder="Пароль"]', USER_PASSWORD);

  // Нажимаем на кнопку "Войти"
  await page.click('[data-testid="login-submit-btn"]');

  // Ожидаем, что URL стал "https://netology.ru/profile"
  await expect(page).toHaveURL("https://netology.ru/profile");

  // Ожидаем, что заголовок "Моё обучение" видим и имеет правильный текст
  const h2Element = page.locator('h2:has-text("Моё обучение")');
  await h2Element.waitFor({ state: 'visible', timeout: 10000 });

  // Проверяем, что "Каталог курсов" видим и имеет правильный текст
  const catalogCoursesButton = page.locator('[data-testid="header-navigatorBtn"]:visible');
  await expect(catalogCoursesButton).toHaveText("Каталог курсов");
  await expect(catalogCoursesButton).toBeVisible();
});

  test('Неуспешная авторизация', async ({page}) => {
  
    await page.goto('https://netology.ru/?modal=sign_in');
  
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(USER_EMAIL);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill("USER_PASSWORD");
    await page.getByTestId('login-submit-btn').click();
  
    await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
    const errorPopup = page.getByTestId('login-error-hint');
    await expect(errorPopup).toBeVisible();
    await expect(errorPopup).toHaveText("Вы ввели неправильно логин или пароль");
  });