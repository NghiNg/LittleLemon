import React from 'react'
import './Header.css'

import { useWindowSize } from '../../hooks/useWindowSize'
import { Logo } from '../images/Logo'
import { Hamburger } from '../images/Hamburger'
import { Nav } from '../nav/Nav'

export const Header = (): JSX.Element =>
{
    const windowSize = useWindowSize();
    return (
        <header>
            <Logo/>
            {windowSize.width < 800 ?
            <div role='button' onClick={()=>console.log("click hamburger")}>
                <Hamburger/>
            </div>
            :
                <Nav className="header"/>
        }
        </header>
    );
}