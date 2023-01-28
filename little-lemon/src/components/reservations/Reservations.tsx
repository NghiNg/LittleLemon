import './Reservations.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Timepicker from 'react-time-picker'

interface Booking {
    date: Date;
    time: string;
    people: string;
    name: string;
    phone: string;
    comment?: string;
}
export const Reservations = (): JSX.Element => {
    const [isSentIn, setIsSentIn] = useState(false);
    const [form, setForm] = useState<Booking>({
        date: new Date(),
        time: "",
        people: "",
        name: "",
        phone: "",
        comment: "",
    })
    console.log(form);
    return (
        <main className="reservations">
            <section className="reservations__about">
                <h1 className="display-title">Reserve a table</h1>
                <img src={require("../images/restaurant.jpg")}/>
            </section>
            {isSentIn ?
                <ConfirmedBooking booking={form}/>
            :
                <BookingForm form={form} setForm={setForm} onConfirm={() => setIsSentIn(true)}/>
            }
        </main>
    );
}

const BookingForm = ({
    form, setForm, onConfirm
}: {
    form: Booking,
    setForm: (value: Booking) => void,
    onConfirm: () => void,
}): JSX.Element => {
    const validateForm = () =>
            form.time !== "" &&
            form.people !== "" &&
            form.name !== "" &&
            form.phone !== "";

            console.log(form.phone)
    return (
        <>
            <section className="reservations__booking">
                <h2 className="card-title">BOOKING INFORMATION</h2>
                <form>
                    <label className="lead-text">Date <span>*</span></label>
                    <Datepicker className="lead-text" selected={form.date} name="date" onChange={(input: Date) => setForm({...form, date: input})}/>
                    <label className="lead-text">Time <span>*</span></label>
                    <Timepicker className="lead-text" format="h:mm" value={form.time} name="time" onChange={(input) => setForm({...form, time: input?.toString()})}/>
                    <label className="lead-text">How many people <span>*</span></label>
                    <input className="lead-text" value={form.people} name="people" type="number" onChange={(input) => setForm({...form, people: input.target.value})}/>
                </form>
            </section>
            <section className="reservations__contact">
                <h2 className="card-title">CONTACT INFORMATION</h2>
                <form>
                    <label className="lead-text">Name <span>*</span></label>
                    <input className="lead-text" value={form.name} name="name" type="text" onChange={(input) => setForm({...form, name: input.target.value})}/>
                    <label className="lead-text">Phone Number <span>*</span></label>
                    <input className="lead-text" value={form.phone} name="phone" type="number" onChange={(input) => setForm({...form, phone: input.target.value})}/>
                    <label className="lead-text">Comment</label>
                    <textarea className="lead-text" value={form.comment} name="comment" onChange={(input) => setForm({...form, comment: input.target.value})}/>
                </form>
                <button 
                    className="card-title"
                    onClick={() => {
                        if (validateForm()) {
                            setForm(form);
                            onConfirm();
                        } else {
                            alert("Not all required fields are filled out!");
                        }
                    }}
                >
                    Reserve Table
                </button>
            </section>
        </>
    );
}

const ConfirmedBooking = ({booking}: {booking: Booking}): JSX.Element => {
    return (
        <section className="reservations__confirmed">
            <h1 className="display-title">Booking confirmation</h1>
            <p className="paragraph-text"><>{booking.date.getDate()}/{booking.date.getMonth()+1}/{booking.date.getFullYear()} at {booking.time} for {booking.people} people.</></p>
            <p className="paragraph-text">{booking.name} {booking.phone}</p>
            <p className="paragraph-text">{booking.comment}</p>
            <p className="highlight-text">Excited to see you!</p>
            <Link to="/">
                <button className="card-title">Back to mainpage</button>
            </Link>
            <img src={require("../images/chef.jpg")}/>
        </section>
    )
}