import React from 'react'
import {render, screen} from '@testing-library/react';
import {ProductItem} from "../../../src/client/components/ProductItem";
import {createWrapper} from "../mock/createWrapper";
import {resetAxiosMock} from "../mock/resetAxiosMock";
import {mockAxios} from "../mock/mockAxios";
import {basenameTest} from "../mock/ReduxWrapper";
import {Catalog} from "../../../src/client/pages/Catalog";
import {Cart} from "../../../src/client/pages/Cart";

describe('page/Cart', () => {
    const wrapper = createWrapper({})

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
});
