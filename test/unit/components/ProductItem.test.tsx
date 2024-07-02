import React from 'react'
import { render, screen } from '@testing-library/react';
import {ProductItem} from "../../../src/client/components/ProductItem";
import {createWrapper} from "../mock/createWrapper";

describe('ProductItem', () => {
    const wrapper = createWrapper({})

    it('Компонент появился в DOM дереве', async () => {
        render(<ProductItem
            product={{
            id: 1,
            name: 'Product',
            price: 100
        }} />, {wrapper});

        const component = await screen.findByTestId(1);

        expect(component).toBeInTheDocument();
    });

    it('В компоненте отображаются название, цена, ссылка на товар', async () => {
        render(<ProductItem
            product={{
                id: 1,
                name: 'Product',
                price: 100
            }} />, {wrapper});

        const name = await screen.findByText('Product')
        const price = await screen.findByText('$100')
        const linkDetails = await screen.findByText('Details')

        expect(name).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(linkDetails).toBeInTheDocument();
    });

    it('Ссылка на товар ведет на нужную страницу', async () => {
        render(<ProductItem
            product={{
                id: 1,
                name: 'Product',
                price: 100
            }} />, {wrapper});

        const linkDetails = await screen.findByText('Details')

        expect(linkDetails).toHaveAttribute('href', `/catalog/${1}`);
    });
});
