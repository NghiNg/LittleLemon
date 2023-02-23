import './BookingPage.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { submitAPI } from '../main/api.js'

interface Booking {
    date: Date;
    time: string;
    people: string;
    occasion: string;
    name: string;
    phone: string;
    comment?: string;
}

export const BookingPage = ({availableTimes, updateTime, onFinishedReserving}: {availableTimes: string[], updateTime: React.Dispatch<{
    date: Date;
}>, onFinishedReserving: () => void}): JSX.Element => {
    const [isSentIn, setIsSentIn] = useState(false);
    const [form, setForm] = useState<Booking>({
        date: new Date(),
        time: availableTimes[0],
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
                <ConfirmedBooking booking={form} onFinishedReserving={onFinishedReserving}/>
            :
                <BookingForm form={form} setForm={setForm} onConfirm={() => {updateTime({date: form.date}); setIsSentIn(submitAPI(form))}} availableTimes={availableTimes}/>
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
    availableTimes: string[],
}): JSX.Element => {
    const validateForm = () =>
            form.name !== "" &&
            form.phone !== "";

    return (
        <>
            <section className="booking__form">
                <h2 className="card-title">BOOKING INFORMATION</h2>
                <form>
                    <label className="lead-text" htmlFor="res-date">Date <span>*</span></label>
                    <input className="lead-text" data-testid={"date"} id="res-date" type="date" name="date" value={form.date.toISOString().substring(0,10)} onChange={(input) => setForm({...form, date: new Date(input.target.value)})}/>
                    <label className="lead-text" htmlFor="res-time">Time <span>*</span></label>
                    <select className="lead-text" id="res-time" value={form.time} name="time"
                     onChange={(input) => setForm({...form, time: input.target.value})}
                    >
                        {availableTimes.map((time: string) => <option value={time} key={time}>{time}</option>)}

                    </select>
                    <label className="lead-text" htmlFor="guests">How many people <span>*</span></label>
                    <input className="lead-text" value={form.people} id="guests" name="people" type="number" placeholder="1" min="1" max="10" onChange={(input) => setForm({...form, people: input.target.value})}/>
                    <label className="lead-text" htmlFor="occasion">Occasion</label>
                    <select className="lead-text" id="occasion" onChange={(input) => setForm({...form, occasion: input.target.value})}>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                    </select>
                    <label className="lead-text" htmlFor="res-name">Name <span>*</span></label>
                    <input className="lead-text" id="res-name" data-testid={"name"} value={form.name} name="name" type="text" onChange={(input) => setForm({...form, name: input.target.value})}/>
                    <label className="lead-text" htmlFor="res-phone">Phone Number <span>*</span></label>
                    <input className="lead-text" id="res-phone" data-testid={"phone"} value={form.phone} name="phone" type="number" onChange={(input) => setForm({...form, phone: input.target.value})}/>
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

const ConfirmedBooking = ({booking, onFinishedReserving}: {booking: Booking, onFinishedReserving: () => void}): JSX.Element => {
    return (
        <section className="booking__confirmed">
            <h1 className="display-title">Booking confirmation</h1>
            <p className="paragraph-text"><>{booking.date.toISOString().substring(0,10)} at {booking.time} for {booking.people} {Number(booking.people) === 1 ? 'person' : 'people'}.</></p>
            <p className="paragraph-text">{booking.name} {booking.phone} for your {booking.occasion}!</p>
            <p className="paragraph-text">{booking.comment}</p>
            <p className="highlight-text">Excited to see you!</p>
            <button className="card-title" onClick={onFinishedReserving}>Back to mainpage</button>
            <img src={require("../images/chef.jpg")}/>
        </section>
    )
}