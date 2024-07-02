import React from 'react'
import { render, screen } from '@testing-library/react';
import {createWrapper} from "../mock/createWrapper";
import {Home} from "../../../src/client/pages/Home";

describe('page/Home', () => {
    const wrapper = createWrapper({})

    it('Отобразились статические значения', async () => {
        render(<Home/>, {wrapper});

        const headerWelcome = await screen.findByText('Welcome to Kogtetochka store!')
        const text1 = await screen.findByText('We have a large assortment of scratching posts!')
        const header1 = await screen.findByText('Stability')
        const header2 = await screen.findByText('Comfort')
        const header3 = await screen.findByText('Design')
        const text5 = await screen.findByText(`Empower Your Coding Journey with Every Scratch – Get Your Paws on Our Purr-fect Scratchers Today!`)
        const text4 = await screen.findByText(`Engage your cat's natural instincts and keep them entertained for hours with our interactive scratching posts. Featuring built-in toys and enticing textures, they stimulate your cat's senses and encourage active play.`)
        const text3 = await screen.findByText(`Pamper your feline friend with the luxurious comfort of our scratching posts. Covered in soft, plush fabric, they offer a cozy retreat for your cat to relax and unwind.`)
        const text2 = await screen.findByText('Our scratching posts are crafted with precision and designed for unparalleled stability. Made from high-quality materials, they provide a sturdy platform for your cat\'s scratching needs.')

        expect(headerWelcome).toBeInTheDocument();
        expect(text1).toBeInTheDocument();
        expect(header1).toBeInTheDocument();
        expect(header2).toBeInTheDocument();
        expect(header3).toBeInTheDocument();
        expect(text5).toBeInTheDocument();
        expect(text4).toBeInTheDocument();
        expect(text3).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
});
