import './BookingPage.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AvailableTimes } from '../main/Main'

interface Booking {
    date: string;
    time: "17:00" | "18:00" | "19:00" | "20:00" | "21:00" | "22:00";
    people: string;
    occasion: string;
    name: string;
    phone: string;
    comment?: string;
}

export const BookingPage = ({availableTimes, updateTime}: {availableTimes: AvailableTimes, updateTime: React.Dispatch<{
    time: "17:00" | "18:00" | "19:00" | "20:00" | "21:00" | "22:00";
}>}): JSX.Element => {
    const [isSentIn, setIsSentIn] = useState(false);
    const [form, setForm] = useState<Booking>({
        date: "",
        time: "17:00",
        people: "1",
        occasion: "birthday",
        name: "",
        phone: "",
        comment: "",
    })

    return (
        <main className="booking">
            <section className="booking">
                <h1 className="display-title">Reserve a table</h1>
                <img src={require("../images/restaurant.jpg")}/>
            </section>
            {isSentIn ?
                <ConfirmedBooking booking={form}/>
            :
                <BookingForm form={form} setForm={setForm} onConfirm={() => {updateTime({time: form.time}); setIsSentIn(true)}} availableTimes={availableTimes}/>
            }
        </main>
    );
}

const BookingForm = ({
    form, setForm, onConfirm, availableTimes
}: {
    form: Booking,
    setForm: (value: Booking) => void,
    onConfirm: () => void,
    availableTimes: AvailableTimes,
}): JSX.Element => {
    const validateForm = () =>
            form.date !== "" &&
            form.name !== "" &&
            form.phone !== "";

    return (
        <>
            <section className="booking__form">
                <h2 className="card-title">BOOKING INFORMATION</h2>
                <form>
                    <label className="lead-text" htmlFor="res-date">Date <span>*</span></label>
                    <input className="lead-text" id="res-date" type="date" name="date" onChange={(input) => setForm({...form, date: input.target.value})}/>
                    <label className="lead-text" htmlFor="res-time">Time <span>*</span></label>
                    <select className="lead-text" id="res-time" value={form.time} name="time"
                     onChange={(input) => setForm({...form, time: input.target.value as "17:00" | "18:00" | "19:00" | "20:00" | "21:00" | "22:00"})}
                    >
                        {Object.entries(availableTimes).filter((time) => time[1]).map((time) => <option value={time[0]} key={time[0]}>{time[0]}</option>)}

                    </select>
                    <label className="lead-text" htmlFor="guests">How many people <span>*</span></label>
                    <input className="lead-text" value={form.people} id="guests" name="people" type="number" placeholder="1" min="1" max="10" onChange={(input) => setForm({...form, people: input.target.value})}/>
                    <label className="lead-text" htmlFor="occasion">Occasion</label>
                    <select className="lead-text" id="occasion" onChange={(input) => setForm({...form, occasion: input.target.value})}>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                    </select>
                    <label className="lead-text" htmlFor="res-name">Name <span>*</span></label>
                    <input className="lead-text" id="res-name" value={form.name} name="name" type="text" onChange={(input) => setForm({...form, name: input.target.value})}/>
                    <label className="lead-text" htmlFor="res-phone">Phone Number <span>*</span></label>
                    <input className="lead-text" id="res-phone" value={form.phone} name="phone" type="number" onChange={(input) => setForm({...form, phone: input.target.value})}/>
                    <label className="lead-text" htmlFor="res-comment">Comment</label>
                    <textarea className="lead-text" id="res-comment" value={form.comment} name="comment" onChange={(input) => setForm({...form, comment: input.target.value})}/>
                </form>
                <input
                    className="button booking__submit"
                    type="submit"
                    value="Make your reservation"
                    onClick={() => {
                        if (validateForm()) {
                            onConfirm();
                        } else {
                            alert("Not all required fields are filled out!");
                        }
                    }}
                />
            </section>
        </>
    );
}

const ConfirmedBooking = ({booking}: {booking: Booking}): JSX.Element => {
    return (
        <section className="booking__confirmed">
            <h1 className="display-title">Booking confirmation</h1>
            <p className="paragraph-text"><>{booking.date} at {booking.time} for {booking.people} people.</></p>
            <p className="paragraph-text">{booking.name} {booking.phone} for your {booking.occasion}!</p>
            <p className="paragraph-text">{booking.comment}</p>
            <p className="highlight-text">Excited to see you!</p>
            <Link to="/">
                <button className="card-title">Back to mainpage</button>
            </Link>
            <img src={require("../images/chef.jpg")}/>
        </section>
    )
}