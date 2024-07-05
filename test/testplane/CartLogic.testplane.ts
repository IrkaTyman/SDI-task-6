import {bugQueryParams} from "./bugQueryParams";
import {basenameTest} from "./basename";

describe("CartLogic", () => {
    it("После добавления товара и перезагрузки корзина сохранилась", async ({browser}) => {
        await browser.url(basenameTest + "catalog/1" + bugQueryParams);

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        await browser.refresh()

        await browser.url(basenameTest + "cart" + bugQueryParams);

        const count = await browser.$('.Cart-Table .Cart-Count')

        const clearButton = await browser.$('.Cart-Clear')

        await count.waitForDisplayed()

        expect(count).toBeDisplayedInViewport()
        expect(clearButton).toBeDisplayedInViewport()
    });
});
