describe("CartLogic", () => {
    it("Добавление в корзину изменяет заголовок корзины", async ({browser}) => {
        await browser.url("store/catalog/1");

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        const headers = await Promise.all(
            await browser.$$(".navbar-nav a").map(link => link.getText())
        )

        expect(headers).toEqual([
            'Catalog',
            'Delivery',
            'Contacts',
            'Cart (1)'
        ]);
    });

    it("При повторном добавлении товара в заголовке корзины не изменяется количество", async ({browser}) => {
        await browser.url("store/catalog/1");

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        await addCartButton.click()

        const headers = await Promise.all(
            await browser.$$(".navbar-nav a").map(link => link.getText())
        )

        expect(headers).toEqual([
            'Catalog',
            'Delivery',
            'Contacts',
            'Cart (1)'
        ]);
    });

    it("После добавления товара 2 раза на странице корзины появляется таблица товаров с верным кол-вом и кнопка Очистить корзину", async ({browser}) => {
        await browser.url("store/catalog/1");

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        await addCartButton.click()

        await browser.url("store/cart");

        const count = await browser.$('.Table .Count')

        const clearButton = await browser.$('.Cart-Clear')

        await count.waitForDisplayed()

        expect(count).toHaveText('2')
        expect(clearButton).toHaveText('Clear shopping cart')
    });

    it("После добавления товара и при очищении корзины страница вновь пустая", async ({browser}) => {
        await browser.url("store/catalog/1");

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        await browser.url("store/cart");

        const clearButton = await browser.$('.Cart-Clear')

        await clearButton.waitForDisplayed()

        await clearButton.click()

        const text = await browser.$('.col').getText()

        await text.waitForDisplayed()

        expect(text).toHaveText('Cart is empty. Please select products in the')
    });

    it("После добавления товара отображается название, цена, количество, стоимость и общая сумма", async ({browser}) => {
        await browser.url("store/catalog/1");

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()
        await addCartButton.click()

        await browser.url("store/cart");

        const name = await browser.$('.Table .Name')

        const price = await browser.$('.Table .Price')

        const count = await browser.$('.Table .Count')

        const total = await browser.$('.Table .Total')

        const orderPrice = await browser.$('.OrderPrice')

        await name.waitForDisplayed()

        expect(name).toHaveText('Ergonomic kogtetochka')
        expect(price).toHaveText('$384')
        expect(count).toHaveText('2')
        expect(total).toHaveText('$768')
        expect(orderPrice).toHaveText('$768')
    });

    it("После добавления товара на карточке и странице товара отображается CartBadge", async ({browser}) => {
        await browser.url("store/catalog/0");

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        const productPageBadge = await browser.$('.text-success')

        await browser.url("store/catalog");

        const badges = await Promise.all(
            await browser.$$('.card').map(card => card.$('.text-success'))
        )

        await badges[0].waitForDisplayed()

        expect(productPageBadge).toHaveText('Item in cart')
        expect(badges[0]).toHaveText('Item in cart')
    });

    it("После добавления товара и перезагрузки корзина сохранилась", async ({browser}) => {
        await browser.url("store/catalog/1");

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        await browser.refresh()

        await browser.url("store/cart");

        const count = await browser.$('.Table .Count')

        const clearButton = await browser.$('.Cart-Clear')

        await count.waitForDisplayed()

        expect(count).toBeDisplayedInViewport()
        expect(clearButton).toBeDisplayedInViewport()
    });
});
