import React from 'react'
import {render, screen, waitFor} from '@testing-library/react';
import {createWrapper} from "../mock/createWrapper";
import {Application} from "../../../src/client/Application";
import {resizeWindow} from "../lib/resizeWindow";
import {userEvent} from "@testing-library/user-event";

describe('page/Application', () => {
    const wrapper = createWrapper({})

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

    it('Ширина экрана меньше 575px: меню не отображается',async  () => {
        resizeWindow(570)
        render(<Application/>, {wrapper});

        const contactsLink = await screen.findByText('Contacts')
        expect(contactsLink.parentElement.parentElement.classList.contains('collapse')).toBe(true);
    })

    it('Ширина экрана меньше 575px: по клику на гамбургер меню отображается',async  () => {
        resizeWindow(570)
        render(<Application/>, {wrapper});

        const contactsLink = await screen.findByText('Contacts')

        const hamburger = await screen.findByLabelText('Toggle navigation')
        await userEvent.click(hamburger)

        expect(contactsLink.parentElement.parentElement.classList.contains('collapse')).toBe(false);
    })

    it('Ширина экрана меньше 575px: после выбора элемента из гамбургера меню закрывается',async  () => {
        resizeWindow(570)
        render(<Application/>, {wrapper});

        const contactsLink = await screen.findByText('Contacts')

        const hamburger = await screen.findByLabelText('Toggle navigation')
        await userEvent.click(hamburger)

        await userEvent.click(contactsLink)

        waitFor(() => expect(contactsLink.parentElement.parentElement.classList.contains('collapse')).toBe(true))
    })

    it('По роуту /contacts отрисовалась страница Contacts', async () => {
        const wrapper = createWrapper({
            route: '/contacts',
            routerEntries: ['/contacts']
        })
        render(<Application/>, {wrapper});


        const contactsHeader = await screen.findByText('Contacts')
        expect(contactsHeader).toBeInTheDocument()
    })

    it('По роуту /home отрисовалась страница Home', async () => {
        const wrapper = createWrapper({
            route: '/',
            routerEntries: ['/']
        })
        render(<Application/>, {wrapper});


        const header = await screen.findByText('Welcome to Kogtetochka store!')
        expect(header).toBeInTheDocument()
    })

    it('По роуту /catalog отрисовалась страница Catalog', async () => {
        const wrapper = createWrapper({
            route: '/catalog',
            routerEntries: ['/catalog']
        })
        render(<Application/>, {wrapper});


        const header = await screen.findByText('Catalog')
        expect(header).toBeInTheDocument()
    })

    it('По роуту /delivery отрисовалась страница Delivery', async () => {
        const wrapper = createWrapper({
            route: '/delivery',
            routerEntries: ['/delivery']
        })
        render(<Application/>, {wrapper});


        const header = await screen.findByText('Delivery')
        expect(header).toBeInTheDocument()
    })

    it('По роуту /cart отрисовалась страница Cart', async () => {
        const wrapper = createWrapper({
            route: '/cart',
            routerEntries: ['/cart']
        })
        render(<Application/>, {wrapper});


        const header = await screen.findByText('Cart')
        expect(header).toBeInTheDocument()
    })
});
