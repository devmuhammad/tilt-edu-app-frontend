import React, {Component} from 'react';
import { Carousel } from "react-bootstrap";
import "./TestimonialDisplay.module.css"

class TestimonialsDisplay extends Component {

    state = {
        testimonials: [
            {
                message: "TILT has helped my child focus on the most important aspects of his studies which has impacted us positive ",
                name: "Rosemary Kayode",
                role: "Parent"
            },
            {
                message: "Our students now have better understanding of their course works as we have better understood their academic needs through the TILT Platform",
                name: "Innocent Danjuma",
                role: "Teacher"
            },
            {
                message: "TILT has helped me have a better understanding of what my academic deficiencies are.",
                name: "Ibrahim Bala",
                role: "Student"
            }
        ]
    };

    renderTestimonial = () => {
        return this.state.testimonials.map((testimonial, index) => (
            <Carousel.Item key={testimonial.name + index}>
                <p className={`text-center text-muted blockquote lead message`}>{testimonial.message}</p>
                <div className="col-12 text-center mt-2">
                    <p className={`text-primary font-weight-bold mb-0 `}>{testimonial.name}</p>
                    <p className="font-weight-bold">{testimonial.role}</p>
                </div>
            </Carousel.Item>

        ));
    };

    render() {

        return (
            <section className="section section-lg py-0 mt-sm-5 mt-md-0">
                <div className="container">
                    <div className="row col-12">
                        <Carousel
                            prevIcon={<span className="text-primary"><i className="fas fa-angle-left fa-7x"> </i></span>}
                            nextIcon={<span className="text-primary"><i className="fas fa-angle-right fa-7x"> </i></span>}
                        >
                            {this.renderTestimonial()}
                        </Carousel>
                    </div>
                </div>
            </section>
        );
    }
}

export default TestimonialsDisplay;
