import React from 'react'
import { render, screen } from '@testing-library/react';
import {createWrapper} from "../mock/createWrapper";
import {Home} from "../../../src/client/pages/Home";
import {Contacts} from "../../../src/client/pages/Contacts";
import {Delivery} from "../../../src/client/pages/Delivery";

describe('page/Delivery', () => {
    const wrapper = createWrapper({})

    it('Отобразились статические значения', async () => {
        render(<Delivery/>, {wrapper});

        const header1 = await screen.findByText('Delivery')
        const text1 = await screen.findByText(`Swift and Secure Delivery: Experience the convenience of hassle-free shipping with our scratchers. We understand the excitement of receiving your new cat furniture, so we prioritize swift delivery to your doorstep. Rest assured, your order is handled with care every step of the way, ensuring it arrives safely and securely.`)
        const text2 = await screen.findByText(`Track Your Package with Ease: Stay informed and in control of your delivery with our easy-to-use tracking system. From the moment your order is placed to the minute it reaches your home, you can monitor its journey in real-time. No more guessing games – know exactly when to expect your package and plan accordingly.`)
        const text3 = await screen.findByText(`Customer Satisfaction Guaranteed: Your satisfaction is our top priority, which is why we go above and beyond to provide exceptional delivery service. If you have any questions or concerns about your shipment, our dedicated customer support team is here to assist you every step of the way. Trust us to deliver not only your scratcher but also peace of mind.`)

        expect(text1).toBeInTheDocument();
        expect(header1).toBeInTheDocument();
        expect(text3).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
});
