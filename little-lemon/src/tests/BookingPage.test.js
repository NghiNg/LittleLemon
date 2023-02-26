import { render, fireEvent, screen } from "@testing-library/react";
import { BookingPage } from '../components/bookingPage/BookingPage'
import { BrowserRouter } from "react-router-dom";

const availableTimesMock = {
    "17:00": true,
    "18:00": true,
    "19:00": true,
    "20:00": true,
    "21:00": true,
    "22:00": true
}

test('Renders the BookingForm heading', () => {
    render(<BrowserRouter><BookingPage availableTimes={availableTimesMock} updateTime={({date: Date}) => {null}}/></BrowserRouter>)
    const headingElement = screen.getByText("Reserve a table");
    expect(headingElement).toBeInTheDocument();
})