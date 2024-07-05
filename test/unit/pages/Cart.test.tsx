import React, {act} from 'react'
import {render, screen, waitFor} from '@testing-library/react';
import {createWrapper} from "../mock/createWrapper";
import {Cart} from "../../../src/client/pages/Cart";
import {CartApi, ExampleApi} from "../../../src/client/api";
import {addToCart, initStore} from "../../../src/client/store";
import {basenameTest} from "../mock/ReduxWrapper";
import {userEvent} from "@testing-library/user-event";

describe('page/Cart', () => {
    const api = new ExampleApi(basenameTest);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const wrapper = createWrapper({store})

    beforeEach(() => {
        store.dispatch({type: 'CLEAR_CART'})
    })

    it('Компонент появился в DOM дереве', async () => {
        render(<Cart/>, {wrapper});

        const component = await screen.findByText('Shopping cart');

        expect(component).toBeInTheDocument();
    });

    it('Когда корзина пустая, отображается предупреждение и ссылка на католог', async () => {
        render(<Cart/>, {wrapper});

        const text = await screen.findByText(/Cart is empty. Please select products in the/)
        const link = await screen.findByText(/^catalog$/)

        expect(text).toBeInTheDocument();
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/catalog');
    });

    it('После клика на кнопку очищения корзины она очищается', async () => {
        render(<Cart/>, {wrapper});

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
            const clearButton = await screen.findByText('Clear shopping cart')

            await userEvent.click(clearButton)

            const emptyContent = await screen.findByText(/Cart is empty. Please select products in the/i)

            expect(emptyContent).toBeInTheDocument()
        }, {timeout: 100})
    })

    it('У добавленного продукта в корзине отображается название, цена', async () => {
        render(<Cart/>, {wrapper});

        act(() => {
            store.dispatch({
                type: 'ADD_TO_CART', product: {
                    name: 'Name 1',
                    id: 1,
                    price: 100,
                    color: 'Color 1',
                    material: 'Material 1',
                    description: 'Description 1',
                }
            })

            store.dispatch({
                type: 'ADD_TO_CART', product: {
                    name: 'Name 1',
                    id: 1,
                    price: 100,
                    color: 'Color 1',
                    material: 'Material 1',
                    description: 'Description 1',
                }
            })

            store.dispatch({
                type: 'ADD_TO_CART', product: {
                    name: 'Name 2',
                    id: 2,
                    price: 300,
                    color: 'Color 2',
                    material: 'Material 2',
                    description: 'Description 2',
                }
            })
        })

        waitFor(async () => {
            const name = await screen.findByText('Name 1')
            const price = await screen.findByText('$100')

            expect(name).toBeInTheDocument()
            expect(price).toBeInTheDocument()
        }, {timeout: 100})
    })
});
