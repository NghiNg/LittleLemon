import React from 'react'
import './Nav.css'

export const Nav = ({className}: {className: string}): JSX.Element => {
    return (
        <nav className={`nav ${className}-nav`}>
            <ul className={`nav__list ${className}-nav__list`}>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/menu">Menu</a></li>
                <li><a href="/reservations">Reservations</a></li>
                <li><a href="/order">Order Online</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    );
}