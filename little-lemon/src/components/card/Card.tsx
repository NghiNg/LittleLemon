import './Card.css'
import { Scooter } from '../images/Scooter'

export const Card = ({title, price, info}: {title: string, price: number, info: string}): JSX.Element => {
    return (
        <div className="card">
            <img alt="food image" src={require('../images/greeksalad.jpg')}/>
            <div>
                <h4 className="card-title">{title}</h4>
                <span>${price.toFixed(2)}</span>
            </div>
            <p className="paragraph-text">{info}</p>
            <a className="card-title" href="/booking">Order a delivery <Scooter/></a>
        </div>
    );
}