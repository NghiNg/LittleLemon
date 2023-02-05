import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

export const Nav = ({className}: {className: string}): JSX.Element => {
    return (
        <nav className={`nav ${className}-nav`}>
            <ul className={`nav__list ${className}-nav__list`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/home/about">About</Link></li>
                <li><Link to="/home/menu">Menu</Link></li>
                <li><Link to="/home/reservations">Reservations</Link></li>
                <li><Link to="/home/order">Order Online</Link></li>
                <li><Link to="/home/login">Login</Link></li>
            </ul>
        </nav>
    );
}
