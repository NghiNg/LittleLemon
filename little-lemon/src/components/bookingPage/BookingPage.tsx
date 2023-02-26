import './BookingPage.css'
import React, { useState } from 'react'
import { Routes, Link, Route, useNavigate } from 'react-router-dom'
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

export const BookingPage = ({availableTimes, updateTime}: {availableTimes: string[], updateTime: React.Dispatch<{
    date: Date;
}>}): JSX.Element => {
    const [form, setForm] = useState<Booking>({
        date: new Date(),
        time: availableTimes[0],
        people: "1",
        occasion: "birthday",
        name: "",
        phone: "",
        comment: "",
    })

    const navigate = useNavigate();

    return (
        <main className="booking">
            <section className="booking">
                <h1 className="display-title">Reserve a table</h1>
                <img src={require("../images/restaurant.jpg")}/>
            </section>
                <Routes>
                    <Route path="/" element={
                        <BookingForm
                            form={form}
                            setForm={(value: Booking, date?: Date) => {setForm(value); if (date){updateTime({date})}}}
                            onConfirm={() => {
                                updateTime({date: form.date});
                                if (submitAPI(form)) {
                                    navigate("confirmation");
                                }
                            }}
                            availableTimes={availableTimes}
                        />}/>
                    <Route path="/confirmation" element={ <ConfirmedBooking booking={form} />}/>
                </Routes>
        </main>
    );
}

const BookingForm = ({
    form, setForm, onConfirm, availableTimes
}: {
    form: Booking,
    setForm: (value: Booking, date?: Date) => void,
    onConfirm: () => void,
    availableTimes: string[],
}): JSX.Element => {
    const validateForm = () =>
            form.name !== "" &&
            form.phone !== "";

    const saveBooking = () => {
        localStorage.setItem("booking", `
        ${form.date.toISOString().substring(0,10)} at ${form.time} for ${form.people} ${Number(form.people) === 1 ? 'person' : 'people'}.
        ${form.name} ${form.phone} for your ${form.occasion}!
        ${form.comment}
        `);
    }
    return (
        <>
            <section className="booking__form">
                <h2 className="card-title">BOOKING INFORMATION</h2>
                <form>
                    <label className="lead-text" htmlFor="res-date">Date <span>*</span></label>
                    <input className="lead-text" data-testid={"date"} id="res-date" type="date" name="date" value={form.date.toISOString().substring(0,10)} onChange={(input) => setForm({...form, date: new Date(input.target.value)}, new Date(input.target.value))}/>
                    <label className="lead-text" htmlFor="res-time">Time <span>*</span></label>
                    <select className="lead-text" id="res-time" value={form.time} name="time"
                     onChange={(input) => setForm({...form, time: input.target.value})}
                    >
                        {Array.isArray(availableTimes) ? availableTimes.map((time: string) => <option value={time} key={time}>{time}</option>) : null}

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
                            saveBooking();
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
    const navigate = useNavigate()
    const form = localStorage.getItem("booking");
    return (
        <section className="booking__confirmed">
            <h1 className="display-title">Booking confirmation</h1>
            <p className="paragraph-text" data-testid="booking-information">{form}</p>
            <p className="highlight-text">Excited to see you!</p>
            <button className="card-title" onClick={() => navigate("/")}>Back to mainpage</button>
            <img src={require("../images/chef.jpg")}/>
        </section>
    )
}