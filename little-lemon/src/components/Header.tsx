import React from 'react'

import { Logo } from './images/Logo'
import { Nav } from './Nav'

export const Header = (): JSX.Element => {
    return (
        <header>
            <Logo/>
            <Nav/>
        </header>
    );
}