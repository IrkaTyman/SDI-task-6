import {bugQueryParams} from "./bugQueryParams";
import {basenameTest} from "./basename";

describe("CartLogic", () => {
    it("Добавление в корзину изменяет заголовок корзины", async ({browser}) => {
        await browser.url(basenameTest+"catalog/1"+bugQueryParams);

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
        await browser.url(basenameTest+"catalog/1"+bugQueryParams);

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
        await browser.url(basenameTest+"catalog/1"+bugQueryParams);

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        await addCartButton.click()

        await browser.url(basenameTest+"cart"+bugQueryParams);

        const count = await browser.$('.Cart-Table .Cart-Count')

        const clearButton = await browser.$('.Cart-Clear')

        await count.waitForDisplayed()

        expect(count).toHaveText('2')
        expect(clearButton).toHaveText('Clear shopping cart')
    });

    it("После добавления товара и при очищении корзины страница вновь пустая", async ({browser}) => {
        await browser.url(basenameTest+"catalog/1"+bugQueryParams);

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        await browser.url(basenameTest+"cart"+bugQueryParams);

        const clearButton = await browser.$('.Cart-Clear')

        await clearButton.waitForDisplayed()

        await clearButton.click()

        const text = await browser.$('.col')

        await text.waitForDisplayed()

        expect(text).toHaveText('Cart is empty. Please select products in the')
    });

    it("После добавления товара отображается название, цена, количество, стоимость и общая сумма", async ({browser}) => {
        await browser.url(basenameTest+"catalog/1"+bugQueryParams);

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()
        await addCartButton.click()

        await browser.url(basenameTest+"cart"+bugQueryParams);

        const name = await browser.$('.Cart-Table .Cart-Name')

        const price = await browser.$('.Cart-Table .Cart-Price')

        const count = await browser.$('.Cart-Table .Cart-Count')

        const total = await browser.$('.Cart-Table .Cart-Total')

        const orderPrice = await browser.$('.Cart-OrderPrice')

        await name.waitForDisplayed()

        expect(name).toHaveText('Ergonomic kogtetochka')
        expect(price).toHaveText('$384')
        expect(count).toHaveText('2')
        expect(total).toHaveText('$768')
        expect(orderPrice).toHaveText('$768')
    });

    it("После добавления товара на карточке и странице товара отображается CartBadge", async ({browser}) => {
        await browser.url(basenameTest+"catalog/0"+bugQueryParams);

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        const productPageBadge = await browser.$('.text-success')

        await browser.url(basenameTest+"catalog"+bugQueryParams);

        const badges = await Promise.all(
            await browser.$$('.card').map(card => card.$('.text-success'))
        )

        await badges[0].waitForDisplayed()

        expect(productPageBadge).toHaveText('Item in cart')
        expect(badges[0]).toHaveText('Item in cart')
    });

    it("После добавления товара и перезагрузки корзина сохранилась", async ({browser}) => {
        await browser.url(basenameTest+"catalog/1"+bugQueryParams);

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        await browser.refresh()

        await browser.url("store/cart"+bugQueryParams);

        const count = await browser.$('.Cart-Table .Cart-Count')

        const clearButton = await browser.$('.Cart-Clear')

        await count.waitForDisplayed()

        expect(count).toBeDisplayedInViewport()
        expect(clearButton).toBeDisplayedInViewport()
    });
});
