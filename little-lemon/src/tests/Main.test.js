import { render, fireEvent, screen } from "@testing-library/react";
import { Main, availableReducer, initializeTimes } from '../components/main/Main'

const initialTimes = {"17:00": true,
"18:00": true,
"19:00": true,
"20:00": true,
"21:00": true,
"22:00": true}

test("initializeTimes returns correct values", () => {
    const initializeTimesResult = initializeTimes();
    expect(initializeTimesResult).toEqual(initialTimes)
})

test("reserving table updates available times", () => {
    render(<Main />)
    fireEvent.click(screen.getByText("Reserve a Table"))
    expect(screen.getByText("BOOKING INFORMATION")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("date"), {target: {value: "9999-01-01"}});
    fireEvent.change(screen.getByTestId("name"), {target: {value: "asdf"}});
    fireEvent.change(screen.getByTestId("phone"), {target: {value: "1234"}});
    fireEvent.click(screen.getByText("Make your reservation"))
    fireEvent.click(screen.getByText("Back to mainpage"))
    fireEvent.change(screen.getByTestId("availability"), {target: {value: "9999-01-01"}});
    expect( screen.queryByText("17:00")).toBeNull();
})

test("reserving table updates available times", () => {
    render(<Main />)
    fireEvent.change(screen.getByTestId("availability"), {target: {value: "9999-01-01"}});
    expect(screen.getByText("17:00")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
    expect(screen.getByText("19:00")).toBeInTheDocument();
    expect(screen.getByText("20:00")).toBeInTheDocument();
    expect(screen.getByText("21:00")).toBeInTheDocument();
    expect(screen.getByText("22:00")).toBeInTheDocument();
})