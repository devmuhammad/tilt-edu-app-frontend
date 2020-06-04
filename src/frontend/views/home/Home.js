import React, {Component} from 'react';
import HomeHeadingSection from "../../components/sections/HomeHeadingSection";
import EvaluationStagesSection from "../../components/sections/evaluation-stages/EvaluationStagesSection";
import ImpactCounterSection from "../../components/sections/impact-counter/ImpactCounterSection";
import TestimonialsSection from "../../components/sections/testimonials/TestimonialsSection";

class Home extends Component {
    render() {
        return (
            <main>
                <HomeHeadingSection/>
                <EvaluationStagesSection/>
                <ImpactCounterSection/>

                <TestimonialsSection/>
            </main>
        );
    }
}

export default Home;
