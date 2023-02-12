import { useState, useReducer } from 'react'
import { Link } from 'react-router-dom'

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
export const initializeTimes = (): AvailableTimes => {
    return {"17:00": true,
    "18:00": true,
    "19:00": true,
    "20:00": true,
    "21:00": true,
    "22:00": true}
}

const availableReducer = (state: AvailableTimes, action: {time: "17:00"|"18:00"|"19:00"|"20:00"|"21:00"|"22:00"}) => {
        const temp = {...state};
        temp[action.time] = false;
        console.log(temp);
        return temp;
}

export const Main = () => {
    const foods: {title: string, price: number, info: string}[] = [
        {title: "Greek salad", price: 12.99, info: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. "},
        {title: "Bruchetta", price: 5.99, info: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. "},
        {title: "Lemon Dessert", price: 5.00, info: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."},
    ]

    const [isReservingTable, setIsReservingTable] = useState(false);

    const [availableTimes, updateTimes] = useReducer(availableReducer, initializeTimes());
    const [date, setDate] = useState("");

    if (isReservingTable) {
        return (<BookingPage availableTimes={availableTimes} updateTime={updateTimes} onFinishedReserving={() => setIsReservingTable(false)}/>)
    }

    return (
        <main >
            <section className="main__about">
                <img src={require("../images/restauranfood.jpg")}/>
                <h1 className="display-title">Little Lemon</h1>
                <h2>Chicago</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <button className="card-title" onClick={() => setIsReservingTable(true)}>Reserve a Table</button>
            </section>
            <section className="main__specials">
                <button className="main__specials-button card-title" role={"link"} onClick={() => window.location.href=`${window.location.host}/menu`}>Online Menu</button>
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
                <label htmlFor="res-date" className="card-title">Available times for booking</label>
                <input className="lead-text" data-testid={"availability"} id="res-date" type="date" name="date" value={date} onChange={input => setDate(input.target.value)}/>
               {date !== "" && <ul>
                    {Object.entries(availableTimes).filter((time) => time[1]).map((time) => <li>{time[0]}</li>)}
                </ul>}
            </section>
        </main>
    );
}