import {bugQueryParams} from "./bugQueryParams";
import {basenameTest} from "./basename";

describe("FormLogic", () => {
    it("После добавления в корзину можно заполнить форму заказа, после заполнения отобразиться успешность", async ({browser}) => {
        await browser.url(basenameTest+"catalog/1"+bugQueryParams);

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        await browser.url(basenameTest+"cart"+bugQueryParams);

        const inputName = await browser.$('#f-name')
        const inputPhone = await browser.$('#f-phone')
        const inputEmail = await browser.$('#f-address')

        await inputName.setValue('Name')
        await inputPhone.setValue('9999999999')
        await inputEmail.setValue('test@test.ru')

        const submitButton = await browser.$('.Form-Submit')

        await submitButton.click()

        const successAlert = await browser.$('.Cart-SuccessMessage.alert-success')
        const orderId = await browser.$('.Cart-SuccessMessage.alert-success .Cart-Number').getText()

        await successAlert.waitForDisplayed()

        expect(successAlert).toBeDisplayed()
        expect(orderId).toBe('1')
    });
});
