import React, { useState, useReducer } from 'react'
import { Link, Outlet, Route, Routes } from 'react-router-dom'

import './Main.css'

import { Testimonial } from '../testimonial/Testimonial'
import { Card } from '../card/Card'
import { BookingPage } from '../bookingPage/BookingPage'

export interface AvailableTimes {
    "17:00": boolean,
    "18:00": boolean,
    "19:00": boolean,
    "20:00": boolean,
    "21:00": boolean,
    "22:00": boolean
}

export const Main = (): JSX.Element => {
    const availableReducer = (state: AvailableTimes, action: {time: "17:00"|"18:00"|"19:00"|"20:00"|"21:00"|"22:00"}) => {
            const temp = {...state};
            temp[action.time] = false;
            return temp;
    }

    const [availableTimes, updateTimes] = useReducer(availableReducer, {"17:00": true,
    "18:00": true,
    "19:00": true,
    "20:00": true,
    "21:00": true,
    "22:00": true});

    return (
        <>
            <Routes>
                <Route path='/reservations' element={<BookingPage availableTimes={availableTimes} updateTime={updateTimes}/>}/>
                <Route path='/about' element={<Main/>}/>
                <Route path='/menu' element={<Main/>}/>
                <Route path='/order' element={<Main/>}/>
                <Route path='/login' element={<Main/>}/>
                <Route path='/' element={<MainContent availableTimes={availableTimes}/>}/>
            </Routes>
            <Outlet/>
        </>
    );
}

const MainContent = ({availableTimes}: {availableTimes: AvailableTimes}) => {
    const foods: {title: string, price: number, info: string}[] = [
        {title: "Greek salad", price: 12.99, info: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. "},
        {title: "Bruchetta", price: 5.99, info: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. "},
        {title: "Lemon Dessert", price: 5.00, info: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."},
    ]

    const [date, setDate] = useState("");

    return (
        <main >
            <section className="main__about">
                <img src={require("../images/restauranfood.jpg")}/>
                <h1 className="display-title">Little Lemon</h1>
                <h2>Chicago</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <Link to="/reservations">
                    <button className="card-title">Reserve a Table</button>
                </Link>
            </section>
            <section className="main__specials">
                <Link to="/menu">
                    <button className="main__specials-button card-title">Online Menu</button>
                </Link>
                <h3 className="section-title">SPECIALS</h3>
                <div>
                    {foods.map(food => <Card key={food.title} title={food.title} price={food.price} info={food.info}/>)}
                </div>
            </section>
            <section className="main__testimonials">
                <h3 className="section-title">Testimonials</h3>
                <div>
                    <Testimonial/>
                    <Testimonial/>
                    <Testimonial/>
                    <Testimonial/>
                </div>
            </section>
            <section className="main__info">
                <h1 className="display-title">Little Lemon</h1>
                <h2 className="sub-title">Chicago</h2>
                <p className="paragraph-text">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
                    Exercitation veniam consequat sunt nostrud amet.
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
                </p>
                <div className="main__info-images">
                    <img src={require("../images/a.jpg")}/>
                    <img src={require("../images/b.jpg")}/>
                </div>
            </section>
            <section>
                <p className="card-title">Available times for booking</p>
                <input className="lead-text" id="res-date" type="date" name="date" value={date} onChange={input => setDate(input.target.value)}/>
               {date !== "" && <ul>
                    {Object.entries(availableTimes).filter((time) => time[1]).map((time) => <li>{time[0]}</li>)}
                </ul>}
            </section>
        </main>
    );
}