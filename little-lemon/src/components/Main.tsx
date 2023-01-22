import React from 'react'
import { Card } from './card/Card'

import './Main.css'
import { Testimonial } from './testimonial/Testimonial'


export const Main = (): JSX.Element => {
    const foods: {title: string, price: number, info: string}[] = [
        {title: "Greek salad", price: 12.99, info: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. "},
        {title: "Bruchetta", price: 5.99, info: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. "},
        {title: "Lemon Dessert", price: 5.00, info: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."},
    ]
    return (
        <main >
            <section className="main__about">
                <img src={require("./images/restauranfood.jpg")}/>
                <h1 className="display-title">Little Lemon</h1>
                <h2>Chicago</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <button className="card-title">Reserve a Table</button>
            </section>
            <section className="main__specials">
                <button className="card-title">Online Menu</button>
                <h3 className="section-title">SPECIALS</h3>
                <div>
                    {foods.map(food => <Card title={food.title} price={food.price} info={food.info}/>)}
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
                <img src={require("./images/a.jpg")}/>
                <img src={require("./images/b.jpg")}/>
            </section>
        </main>
    );
}