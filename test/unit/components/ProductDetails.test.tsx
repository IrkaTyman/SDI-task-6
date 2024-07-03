import React from 'react'
import {render, screen} from '@testing-library/react';
import {createWrapper} from "../mock/createWrapper";
import {ProductDetails} from "../../../src/client/components/ProductDetails";
import {userEvent} from "@testing-library/user-event";

describe('ProductDetails', () => {
    const wrapper = createWrapper({})

    it('Компонент появился в DOM дереве (его название)', async () => {
        render(<ProductDetails
            product={{
                id: 1,
                name: 'Product',
                price: 100,
                description: 'Description',
                material: 'Material',
                color: 'Color'
            }}/>, {wrapper});

        const component = await screen.findByText('Product');

        expect(component).toBeInTheDocument();
    });

    it('В компоненте отображаются название, цена, описание, материал, цвет, кнопка добавления в корзину', async () => {
        render(<ProductDetails
            product={{
                id: 1,
                name: 'Product 1',
                price: 100,
                description: 'Description 1',
                material: 'Material 1',
                color: 'Color 1'
            }}/>, {wrapper});

        const name = await screen.findByText('Product 1')
        const price = await screen.findByText('$100')
        const description = await screen.findByText('Description 1')
        const material = await screen.findByText('Material 1')
        const color = await screen.findByText('Color 1')
        const cartButton = await screen.findByText('Add to Cart')

        expect(name).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(material).toBeInTheDocument();
        expect(color).toBeInTheDocument();
        expect(cartButton).toBeInTheDocument();
    });

    it('До добавления товара в корзину не отображается CartBadge', async () => {
        render(<ProductDetails
            product={{
                id: 1,
                name: 'Product',
                price: 100,
                description: 'Description',
                material: 'Material',
                color: 'Color'
            }}/>, {wrapper});

        const itemToCart = screen.queryByText('Item in cart')

        expect(itemToCart).not.toBeInTheDocument();
    })

    it('После добавления товара в корзину отображается CartBadge', async () => {
        render(<ProductDetails
            product={{
                id: 1,
                name: 'Product',
                price: 100,
                description: 'Description',
                material: 'Material',
                color: 'Color'
            }}/>, {wrapper});

        const cartButton = await screen.findByText('Add to Cart')

        await userEvent.click(cartButton)

        const itemToCart = await screen.findByText('Item in cart')

        expect(itemToCart).toBeInTheDocument();
    });
});
