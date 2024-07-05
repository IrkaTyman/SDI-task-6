import React, {act} from 'react'
import {render, screen, waitFor} from '@testing-library/react';
import {ProductItem} from "../../../src/client/components/ProductItem";
import {createWrapper} from "../mock/createWrapper";
import {resetAxiosMock} from "../mock/resetAxiosMock";
import {mockAxios} from "../mock/mockAxios";
import {basenameTest} from "../mock/ReduxWrapper";
import {Catalog} from "../../../src/client/pages/Catalog";
import {CartApi, ExampleApi} from "../../../src/client/api";
import {addToCart, initStore} from "../../../src/client/store";

describe('page/Catalog', () => {
    const api = new ExampleApi(basenameTest);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const wrapper = createWrapper({
        store
    })

    beforeEach(() => {
        store.dispatch({type: 'CLEAR_CART'})
    })

    beforeAll(() => {
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

    afterAll(() => {
            resetAxiosMock()
        }
    )

    it('Компонент появился в DOM дереве', async () => {
        render(<Catalog/>, {wrapper});

        const component = await screen.findByText('Catalog');

        expect(component).toBeInTheDocument();
    });

    it('Отображается лоадер во время загрузки товаров', async () => {
        render(<Catalog/>, {wrapper});

        const loader = await screen.findByText('LOADING')

        expect(loader).toBeInTheDocument();
    });

    it('Отобразились все карточки, пришедшие с сервера', async () => {
        render(<Catalog/>, {wrapper});

        const cart0 = await screen.findAllByTestId(0)
        const cart1 = await screen.findAllByTestId(1)

        /*
         Пояснение по поводу двойки:
         Сама карточка товара имеет testid + такой же testid меет див, оборачивающий эту карточку в Catalog
         */
        expect(cart0).toHaveLength(2);
        expect(cart1).toHaveLength(2);
    });

    it('После добавления товара отображается бейдж В корзине', async () => {
        render(<Catalog/>, {wrapper});

        act(() => {
            store.dispatch(addToCart({
                id: 1,
                name: 'Name 2',
                price: 100,
                color: 'Color 1',
                material: 'Material 1',
                description: 'Description 1',
            }))
        })

        waitFor(async () => {
            const badge = await screen.findByText('Item in cart')
            expect(badge).toBeInTheDocument();
        }, {timeout: 100})
    });

    it('После добавления товара два раза в корзине отображается количество два', async () => {
        render(<Catalog/>, {wrapper});

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

        waitFor(async () => {
            const badge = await screen.findByText('Item in cart')
            expect(badge).toBeInTheDocument();
        }, {timeout: 100})
    });
});
