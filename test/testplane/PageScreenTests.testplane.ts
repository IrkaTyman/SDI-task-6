import {bugQueryParams} from "./bugQueryParams";
import {basenameTest} from "./basename";

describe("PageScreenTests", () => {
    it("Страница Корзины (пустая) отображается без изменений", async ({browser}) => {
        await browser.url(basenameTest+"cart"+bugQueryParams);

        const page = await browser.$('.Cart')
        await page.assertView('plain', {tolerance: 0.06})
    });

    it("Страница Каталог отображается без изменений (исключая порядок карточек)", async ({browser}) => {
        await browser.url(basenameTest+"catalog"+bugQueryParams);

        const page = await browser.$('.Catalog')
        await page.assertView('plain', {tolerance: 0.06})
    });

    it("Страница Продукт отображается без изменений (исключая данные продукта)", async ({browser}) => {
        await browser.url(basenameTest+"catalog/1"+bugQueryParams);

        const page = await browser.$('.Product')
        await page.assertView('plain', {tolerance: 0.06})
    });

    it("Страница Доставка отображается без изменений", async ({browser}) => {
        await browser.url(basenameTest+"delivery"+bugQueryParams);

        const page = await browser.$('.Delivery')
        await page.assertView('plain', {tolerance: 0.06})
    });

    it("Страница Главная отображается без изменений", async ({browser}) => {
        await browser.url(basenameTest+bugQueryParams);

        await browser.$('.Home').assertView('plain', {tolerance: 0.06})
    });

    it("Страница Контакты отображается без изменений", async ({browser}) => {
        await browser.url(basenameTest+"contacts"+bugQueryParams);

        const page = await browser.$('.Contacts')
        await page.assertView('plain', {tolerance: 0.06})
    });
});
