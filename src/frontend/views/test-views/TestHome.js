import React, {Component} from 'react';
import PageHeadingSection from "../../components/sections/PageHeadingSection";
import PageHeadingImage from "../../assets/images/illustrations/Student.svg"
import EvaluationStagesSection from "../../components/sections/evaluation-stages/EvaluationStagesSection";
import PageHeadingButton from "../../components/snippets/PageHeadingButton";
import SectionHeading from "../../components/sections/SectionHeading";


class TestHome extends Component {

    state = {

    };

    render() {
        return (
            <main>
                <PageHeadingSection textColor={"primary"} headingImage={PageHeadingImage}>
                    <h1 className="font-weight-bold text-gray display-1">Welcome To The Test</h1>
                    <h3 className="font-weight-light">Together we will find the cause of each learning deficiency</h3>
                    <PageHeadingButton
                        link={"/test/take-test"}
                        text={"Begin The Test"}
                        icon={"fa-arrow-right"}
                        color={"secondary"}
                    />
                    <h3 className="pt-4 mb-0 text-tertiary">Patiently answer every question honestly</h3>
                    <p className="lead pt-0">Ask your teacher or guardian to explain any question you do not clearly understand</p>
                    <SectionHeading
                        renderHeading={() => "How the test works!"}
                        renderDescription={() => "The following are the various stages of our assessment"}
                        pb={7}
                        pt={7}
                    />
                </PageHeadingSection>
                <EvaluationStagesSection />
                <div className="d-flex justify-content-center pb-8 pt-lg-4">
                    <PageHeadingButton
                        link={"/test/take-test"}
                        text={"Begin The Test"}
                        icon={"fa-arrow-right"}
                        color={"secondary"}
                    />
                </div>
            </main>
        );
    }
}

export default TestHome;
