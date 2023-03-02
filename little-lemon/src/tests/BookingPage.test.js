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

test('Submit button on invalid form popup error message', () => {
    render(<BrowserRouter><BookingPage availableTimes={availableTimesMock} updateTime={({date: Date}) => {null}}/></BrowserRouter>)
    fireEvent.click(screen.getByText("Make your reservation"))
    expect(screen.getByText("How many people")).toBeInTheDocument();
})

test('Removes errormessage when name input changes to valid state', () => {
    render(<BrowserRouter><BookingPage availableTimes={availableTimesMock} updateTime={({date: Date}) => {null}}/></BrowserRouter>)
    const nameErrorMessage = screen.getByText("Name needs to be longer.");
    fireEvent.change(screen.getByTestId("name"), {target: {value: "asdf"}});
    expect(nameErrorMessage).not.toBeInTheDocument();
})

test('Removes errormessage when phone input changes to valid state', () => {
    render(<BrowserRouter><BookingPage availableTimes={availableTimesMock} updateTime={({date: Date}) => {null}}/></BrowserRouter>)
    const phoneErrorMessage = screen.getByText("Phone number needs to be longer.");
    fireEvent.change(screen.getByTestId("phone"), {target: {value: "12341234"}});
    expect(phoneErrorMessage).not.toBeInTheDocument();
})

test("writes and reads localStorage correctly", () => {
    render(<BrowserRouter><BookingPage availableTimes={availableTimesMock} updateTime={({date: Date}) => {null}}/></BrowserRouter>)
    fireEvent.change(screen.getByTestId("name"), {target: {value: "asdf"}});
    fireEvent.change(screen.getByTestId("phone"), {target: {value: "12341234"}});
    fireEvent.click(screen.getByText("Make your reservation"))
    const savedBooking = localStorage.getItem("booking")
    expect(savedBooking).toContain("asdf")
    expect(savedBooking).toContain("12341234")
    expect(screen.getByTestId("booking-information")).toHaveTextContent("asdf")
    expect(screen.getByTestId("booking-information")).toHaveTextContent("12341234")
})