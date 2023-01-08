import React from 'react'

import { Nav } from './Nav'
import { Logo } from './images/Logo'

export const Footer = () => {
    return (
        <footer>
            <Logo/>
            <Nav/>
            Contact
            <ul>
                <li>Address</li>
                <li>Phone number</li>
                <li>Email</li>
            </ul>
            Social Media Links
            <ul>
                <li>Address</li>
                <li>Phone number</li>
                <li>Email</li>
            </ul>
        </footer>
    );
}