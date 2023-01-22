import "./Testimonial.css"

export const Testimonial = () => {
    return (
        <div className="testimonial">
            <h4 className="card-title">Rating 5/5</h4>
            <img alt="food image" src={require('../images/greeksalad.jpg')}/>
            <span>Name Nameson</span>
            <p className="paragraph-text">Best food ever</p>
        </div>
    );
}