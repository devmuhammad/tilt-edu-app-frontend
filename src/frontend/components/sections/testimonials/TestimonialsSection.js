import React, {Fragment} from 'react';
import SectionHeading from "../SectionHeading";
import TestimonialsDisplay from "./TestimonialsDisplay";

const TestimonialsSection = () => {
    return (
        <div>
            <SectionHeading
                pb={2}
                renderHeading={() => "Testimonials"}
                renderDescription={() => (
                    <Fragment>
                        Here are some accolades and commendations from students, parents, teachers and partners on the impact of the <span className="font-weight-bolder text-primary">TILT Platform</span>
                    </Fragment>
                )}
                bgColor={"neutral"}
                pb={1}
            />
            <TestimonialsDisplay/>
        </div>
    );
};

export default TestimonialsSection;
