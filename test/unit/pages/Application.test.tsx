import React, {act} from 'react'
import {getByText, render, screen, waitFor} from '@testing-library/react';
import {createWrapper} from "../mock/createWrapper";
import {Application} from "../../../src/client/Application";
import {resizeWindow} from "../lib/resizeWindow";
import {userEvent} from "@testing-library/user-event";
import {CartApi, ExampleApi} from "../../../src/client/api";
import {basenameTest} from "../mock/ReduxWrapper";
import {addToCart, initStore} from "../../../src/client/store";
import {Cart} from "../../../src/client/pages/Cart";
import {mockAxios} from "../mock/mockAxios";

describe('page/Application', () => {
    const api = new ExampleApi(basenameTest);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const wrapper = createWrapper({
        route: '*',
        routerEntries: ['/cart'],
        store,
    })

    beforeEach(() => {
        store.dispatch({type: 'CLEAR_CART'})
        mockAxios([
            {
                path: `${basenameTest}/api/products`,
                method: 'GET',
                reply: {
                    statusOrCallback: 200,
                    data: [
                        {
                            id: 0,
                            name: 'Name 1',
                            price: 'Price 1',
                        },
                        {
                            id: 1,
                            name: 'Name 2',
                            price: 'Price 2',
                        },
                    ]
                }
            }
        ])
    })

    it('Отобразились навигационные ссылки: Home, Contacts, Delivery, Catalog, Cart с верными ссылками', async () => {
        render(<Application/>, {wrapper});

        const homeLink = await screen.findByText('Kogtetochka store')
        const contactsLink = await screen.findByText('Contacts')
        const catalogLink = await screen.findByText('Catalog')
        const deliveryLink = await screen.findByText('Delivery')
        const cartLink = await screen.findByText('Cart')

        const onClick = jest.fn()
        homeLink.onclick = onClick
        contactsLink.onclick = onClick
        catalogLink.onclick = onClick
        deliveryLink.onclick = onClick
        cartLink.onclick = onClick

        await userEvent.click(homeLink)
        await userEvent.click(contactsLink)
        await userEvent.click(catalogLink)
        await userEvent.click(deliveryLink)
        await userEvent.click(cartLink)

        expect(onClick).toBeCalledTimes(5);

        expect(homeLink).toHaveAttribute('href', '/');
        expect(contactsLink).toHaveAttribute('href', '/contacts');
        expect(catalogLink).toHaveAttribute('href', '/catalog');
        expect(deliveryLink).toHaveAttribute('href', '/delivery');
        expect(cartLink).toHaveAttribute('href', '/cart');
    });

    it('Ширина экрана меньше 575px: меню не отображается', async () => {
        resizeWindow(570)
        render(<Application/>, {wrapper});

        const contactsLink = await screen.findByText('Contacts')
        expect(contactsLink.parentElement.parentElement.classList.contains('collapse')).toBe(true);
    })

    it('Ширина экрана меньше 575px: по клику на гамбургер меню отображается', async () => {
        resizeWindow(570)
        render(<Application/>, {wrapper});

        const contactsLink = await screen.findByText('Contacts')

        const hamburger = await screen.findByLabelText('Toggle navigation')
        await userEvent.click(hamburger)
        expect(contactsLink.parentElement.parentElement.classList.contains('collapse')).toBe(false);
    })

    it('Ширина экрана меньше 575px: после выбора элемента из гамбургера меню закрывается', async () => {
        resizeWindow(570)
        render(<Application/>, {wrapper});

        const contactsLink = await screen.findByText('Contacts')

        const hamburger = await screen.findByLabelText('Toggle navigation')
        await userEvent.click(hamburger)

        await userEvent.click(contactsLink)

        await waitFor(() =>
            expect(contactsLink.parentElement.parentElement.classList.contains('collapse')).toBe(true)
        )
    })

    it('По роуту /contacts отрисовалась страница Contacts', async () => {
        const wrapper = createWrapper({
            route: '*',
            routerEntries: ['/contacts']
        })
        render(<Application/>, {wrapper});

        const container = document.querySelector('.container') as HTMLElement
        const contactsHeader = getByText(container, 'Contacts')
        expect(contactsHeader).toBeInTheDocument()
    })

    it('По роуту / отрисовалась страница Home', async () => {
        const wrapper = createWrapper({
            route: '*',
            routerEntries: ['/']
        })
        render(<Application/>, {wrapper});


        const header = await screen.findByText('Welcome to Kogtetochka store!')
        expect(header).toBeInTheDocument()
    })

    it('По роуту /catalog отрисовалась страница Catalog', async () => {
        const wrapper = createWrapper({
            route: '*',
            routerEntries: ['/catalog']
        })
        render(<Application/>, {wrapper});

        const container = document.querySelector('.container') as HTMLElement
        const header = getByText(container, 'Catalog')
        expect(header).toBeInTheDocument()
    })

    it('По роуту /delivery отрисовалась страница Delivery', async () => {
        const wrapper = createWrapper({
            route: '*',
            routerEntries: ['/delivery']
        })
        render(<Application/>, {wrapper});

        const container = document.querySelector('.container') as HTMLElement
        const header = getByText(container, 'Delivery')
        expect(header).toBeInTheDocument()
    })

    it('По роуту /cart отрисовалась страница Cart', async () => {
        const wrapper = createWrapper({
            route: '*',
            routerEntries: ['/cart']
        })
        render(<Application/>, {wrapper});

        const container = document.querySelector('.container') as HTMLElement
        const header = getByText(container, 'Cart')
        expect(header).toBeInTheDocument()
    })

    it('При добавлении одного и того же товара в таблице отображается количество 2', async () => {
        act(() => {
            store.dispatch(addToCart({
                id: 1,
                name: 'Name 2',
                price: 100,
                color: 'Color 1',
                material: 'Material 1',
                description: 'Description 1',
            }))
            store.dispatch(addToCart({
                id: 1,
                name: 'Name 2',
                price: 100,
                color: 'Color 1',
                material: 'Material 1',
                description: 'Description 1',
            }))
        })

        render(<Application/>, {wrapper});

        waitFor(async () => {
            const productRow = await screen.findByTestId(1)
            const count = productRow.querySelector('.Cart-Count')
            expect(count.textContent).toBe('2')
        }, {timeout: 500})
    })

    it('После добавления товаров изменяется шапка и появляется таблица', async () => {
        render(<Application/>, {wrapper});

        act(() => {
            store.dispatch(addToCart({
                name: 'Name 1',
                id: 1,
                price: 100,
                color: 'Color 1',
                material: 'Material 1',
                description: 'Description 1',
            }))
        })

        waitFor(async () => {
            const headerCart = await screen.findByText('Cart (1)')
            const table = await screen.findByRole('table')

            expect(headerCart).toBeInTheDocument()
            expect(table).toBeInTheDocument()
        }, {timeout: 500})
    })
});
