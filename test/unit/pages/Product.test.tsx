import React from 'react'
import {render, screen} from '@testing-library/react';
import {ProductItem} from "../../../src/client/components/ProductItem";
import {createWrapper} from "../mock/createWrapper";
import {resetAxiosMock} from "../mock/resetAxiosMock";
import {mockAxios} from "../mock/mockAxios";
import {basenameTest} from "../mock/ReduxWrapper";
import {Catalog} from "../../../src/client/pages/Catalog";
import {Product} from "../../../src/client/pages/Product";

describe('page/Catalog', () => {
    const wrapper = createWrapper({
        route: '/catalog/:id',
        routerEntries: ['/catalog/1']
    })

    beforeEach(() => {
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
});
