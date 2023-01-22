import React from 'react'
import './Footer.css'

import { Nav } from '../nav/Nav'
import { Logo } from '../images/Logo'

export const Footer = () => {
    return (
        <footer className='footer'>
            <img src={require("../images/restauranfood.jpg")}/>
            <section>
                <h4>Doormat Navigation</h4>
            <Nav className='footer'/>
            </section>
            <section>
                <h4>Contact</h4>
                <ul className='footer__list footer__contacts'>
                    <li>Address</li>
                    <li>Phone number</li>
                    <li>Email</li>
                </ul>
            </section>
            <section>
                <h4>Social Media Links</h4>
                <ul className='footer__list footer__socials'>
                    <li>Address</li>
                    <li>Phone number</li>
                    <li>Email</li>
                </ul>
            </section>
        </footer>
    );
}