describe("PageScreenTests", () => {
    it("Страница Корзины (пустая) отображается без изменений", async ({browser}) => {
        await browser.url("store/cart");

        await browser.$('.Cart').assertView('plain')
    });

    it("Страница Каталог отображается без изменений (исключая порядок карточек)", async ({browser}) => {
        await browser.url("store/catalog");

        await browser.$('.Catalog').assertView('plain')
    });

    it("Страница Продукт отображается без изменений (исключая данные продукта)", async ({browser}) => {
        await browser.url("store/catalog/1");

        await browser.$('.Product').assertView('plain')
    });

    it("Страница Доставка отображается без изменений", async ({browser}) => {
        await browser.url("store/delivery");

        await browser.$('.Delivery').assertView('plain')
    });

    it("Страница Главная отображается без изменений", async ({browser}) => {
        await browser.url("store");

        await browser.$('.Home').assertView('plain')
    });

    it("Страница Контакты отображается без изменений", async ({browser}) => {
        await browser.url("store/contacts");

        await browser.$('.Contacts').assertView('plain')
    });
});
