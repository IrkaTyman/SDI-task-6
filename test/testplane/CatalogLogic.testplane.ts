import {bugQueryParams} from "./bugQueryParams";
import {basenameTest} from "./basename";

describe("CatalogLogic", () => {
    it("Отображаются все данные продукта с реальными данными с сервера", async ({browser}) => {
        await browser.url(basenameTest + "catalog" + bugQueryParams);

        const names = await Promise.all(
            await browser.$$('.ProductItem').map(card => card.$('.ProductItem-Name')))
        const prices = await Promise.all(
            await browser.$$('.ProductItem').map(card => card.$('.ProductItem-Price')))

        await names[0].waitForDisplayed()
        await prices[0].waitForDisplayed()

        expect(names[0]).toBeDisplayed()
        expect(prices[0]).toBeDisplayed()
    });
});
