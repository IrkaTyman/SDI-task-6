import React from 'react'
import { render, screen } from '@testing-library/react';
import {createWrapper} from "../mock/createWrapper";
import {Home} from "../../../src/client/pages/Home";
import {Contacts} from "../../../src/client/pages/Contacts";

describe('page/Contacts', () => {
    const wrapper = createWrapper({})

    it('Отобразились статические значения', async () => {
        render(<Contacts/>, {wrapper});

        const header1 = await screen.findByText('Contacts')
        const text1 = await screen.findByText(`Have a question about our scratchers or need help placing an order? Don't hesitate to reach out to us! Our dedicated team is here to provide you with top-notch service and support.`)
        const text2 = await screen.findByText(`Our friendly representatives are available during business hours to assist you with any inquiries you may have.`)
        const text3 = await screen.findByText(`At our store, customer satisfaction is our priority, and we're committed to ensuring you have a smooth and enjoyable shopping experience. Reach out to us today – we're here to help make your cat's scratching dreams a reality!`)

        expect(text1).toBeInTheDocument();
        expect(header1).toBeInTheDocument();
        expect(text3).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
});
