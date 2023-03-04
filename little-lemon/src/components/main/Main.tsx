import { useState, useReducer } from 'react'
import { Routes, Link, Route, useNavigate } from 'react-router-dom'

import './Main.css'

import { Testimonial } from '../testimonial/Testimonial'
import { Card } from '../card/Card'
import { BookingPage } from '../bookingPage/BookingPage'
import { fetchAPI } from './api.js'

export const initializeTimes = (date: Date): string[] => fetchAPI(date)

const availableReducer = (state: string[], action: {date: Date}) => {
    return fetchAPI(action.date)
}

export const Main = () => {
    const foods: {title: string, price: number, info: string}[] = [
        {title: "Greek salad", price: 12.99, info: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. "},
        {title: "Bruchetta", price: 5.99, info: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. "},
        {title: "Lemon Dessert", price: 5.00, info: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."},
    ]

    const [date, setDate] = useState(new Date());
    const [availableTimes, updateTimes] = useReducer(availableReducer, initializeTimes(date));
    const navigate = useNavigate()
    return (
        <main >
                <Routes>
                    <Route path="/booking/*" element={<BookingPage availableTimes={availableTimes} updateTime={updateTimes}/>}/>
                    <Route path="/" element={
                        <>
                            <section className="main__about">
                                <img alt="picture of baguettes" src={require("../images/restauranfood.jpg")}/>
                                <h1 className="display-title">Little Lemon</h1>
                                <h2>Chicago</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <button className="card-title" aria-label="On Click" onClick={() => navigate("/booking")}>Reserve a Table</button>
                            </section>
                            <section className="main__specials">
                                <button className="main__specials-button card-title" aria-label="On Click" role={"link"} onClick={() => window.location.href=`${window.location.host}/menu`}>Online Menu</button>
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
                                    <img alt="picture of two chefs" src={require("../images/a.jpg")}/>
                                    <img alt="picture of two chefs" src={require("../images/b.jpg")}/>
                                </div>
                            </section>
                            <section>
                                <label htmlFor="res-date" className="card-title">Available times for booking</label>
                                <input className="lead-text" data-testid={"availability"} id="res-date" type="date" name="date" value={date.toISOString().substring(0, 10)} onChange={input => {setDate(new Date(input.target.value)); updateTimes({date: new Date(input.target.value)})}}/>
                                <ul>
                                    {Array.isArray(availableTimes) ? availableTimes.map(time => <li key={time}>{time}</li>) : <></>}
                                </ul>
                            </section>
                        </>
                    }/>
                </Routes>
        </main>
    );
}