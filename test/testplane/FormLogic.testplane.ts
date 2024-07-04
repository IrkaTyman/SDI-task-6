describe("FormLogic", () => {
    it("После добавления в корзину можно заполнить форму заказа, после заполнения отобразиться успешность", async ({browser}) => {
        await browser.url("store/catalog/1");

        const addCartButton = await browser.$('.btn')

        await addCartButton.waitForDisplayed()

        await addCartButton.click()

        await browser.url("store/cart?bug_id=10");

        const inputName = await browser.$('#f-name')
        const inputPhone = await browser.$('#f-phone')
        const inputEmail = await browser.$('#f-address')

        await inputName.setValue('Name')
        await inputPhone.setValue('9999999999')
        await inputEmail.setValue('test@test.ru')

        const submitButton = await browser.$('.btn')

        await submitButton.click()

        const successAlert = await browser.$('.alert')

        expect(successAlert).toHaveElementClass('alert-success')
    });
});
