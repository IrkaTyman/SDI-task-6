import React, {act} from 'react'
import {render, screen} from '@testing-library/react';
import {ProductItem} from "../../../src/client/components/ProductItem";
import {createWrapper} from "../mock/createWrapper";
import {resetAxiosMock} from "../mock/resetAxiosMock";
import {mockAxios} from "../mock/mockAxios";
import {basenameTest} from "../mock/ReduxWrapper";
import {Catalog} from "../../../src/client/pages/Catalog";
import {Product} from "../../../src/client/pages/Product";
import {addToCart, initStore} from "../../../src/client/store";
import {CartApi, ExampleApi} from "../../../src/client/api";

describe('page/Catalog', () => {
    const api = new ExampleApi(basenameTest);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const wrapper = createWrapper({
        route: '/catalog/:id',
        routerEntries: ['/catalog/1'],
        store,
    })

    beforeEach(() => {
        store.dispatch({type: 'CLEAR_CART'})
        mockAxios([
                {
                    path: `${basenameTest}/api/products/1`,
                    method: 'GET',
                    reply: {
                        statusOrCallback: 200,
                        data: {
                            id: 1,
                            name: 'Name',
                            price: 'Price',
                            description: 'Description',
                            material: 'Material',
                            color: 'Color'
                        },
                    }
                }
            ])
    })

    afterEach(() => {
            resetAxiosMock()
        }
    )

    it('Компонент появился в DOM дереве', async () => {
        render(<Product/>, {wrapper});

        const component = await screen.findByText('Name');

        expect(component).toBeInTheDocument();
    });

    it('Отобразился товар, пришедший с сервера - видно описание', async () => {
        render(<Product/>, {wrapper});

        const description = await screen.findByText('Description')

        expect(description).toBeInTheDocument();
    });

    it('После добавления товара отображается бейдж В корзине', async () => {
        render(<Product/>, {wrapper});

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

        const badge = await screen.findByText('Item in cart')
        expect(badge).toBeInTheDocument();
    });
});
