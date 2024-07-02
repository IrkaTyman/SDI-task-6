import React from 'react'
import {render, screen} from '@testing-library/react';
import {ProductItem} from "../../../src/client/components/ProductItem";
import {createWrapper} from "../mock/createWrapper";
import {ProductDetails} from "../../../src/client/components/ProductDetails";
import {userEvent} from "@testing-library/user-event/setup/index";
import {axiosMock} from "../mock/axiosMock";

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

        const component = await screen.findByText('Name');

        expect(component).toBeInTheDocument();
    });

    it('В компоненте отображаются название, цена, описание, материал, цвет, кнопка добавления в корзину', async () => {
        render(<ProductDetails
            product={{
                id: 1,
                name: 'Product',
                price: 100,
                description: 'Description',
                material: 'Material',
                color: 'Color'
            }}/>, {wrapper});

        const name = await screen.findByText('Product')
        const price = await screen.findByText('$100')
        const description = await screen.findByText('Description')
        const material = await screen.findByText('Material')
        const color = await screen.findByText('Color')
        const cartButton = await screen.findByText('Add To Cart')

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

        const itemToCart = await screen.findByText('Item in cart')

        expect(itemToCart).toBeInDocument();
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

        const cartButton = await screen.findByText('Add To Cart')

        await userEvent.click(cartButton)

        const itemToCart = await screen.findByText('Item in cart')

        expect(itemToCart).toBeInDocument();
    });
});
