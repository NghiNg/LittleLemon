import { render, fireEvent, screen } from "@testing-library/react";
import { BookingPage } from '../components/bookingPage/BookingPage'
import { BrowserRouter } from "react-router-dom";

const availableTimesMock = [
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00"
]

test('Renders the BookingForm heading', () => {
    render(<BrowserRouter><BookingPage availableTimes={availableTimesMock} updateTime={({date: Date}) => {null}}/></BrowserRouter>)
    const headingElement = screen.getByText("Reserve a table");
    expect(headingElement).toBeInTheDocument();
})

test("writes and reads localStorage correctly", () => {
    render(<BrowserRouter><BookingPage availableTimes={availableTimesMock} updateTime={({date: Date}) => {null}}/></BrowserRouter>)
    fireEvent.change(screen.getByTestId("name"), {target: {value: "asdf"}});
    fireEvent.change(screen.getByTestId("phone"), {target: {value: "1234"}});
    fireEvent.click(screen.getByText("Make your reservation"))
    const savedBooking = localStorage.getItem("booking")
    expect(savedBooking).toContain("asdf")
    expect(savedBooking).toContain("1234")
    expect(screen.getByTestId("booking-information")).toHaveTextContent("asdf")
    expect(screen.getByTestId("booking-information")).toHaveTextContent("1234")
})