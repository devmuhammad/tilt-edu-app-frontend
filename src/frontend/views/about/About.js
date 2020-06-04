import React, {Component} from 'react';
import PageHeadingSection from "../../components/sections/PageHeadingSection";
import ImpactCounterSection from "../../components/sections/impact-counter/ImpactCounterSection";
import AboutBG from "../../assets/images/general/image-3.jpg"

class About extends Component {
    render() {
        return (
            <main>
                <PageHeadingSection
                    overlay={"overlay-secondary"}
                    bgImage={AboutBG}
                    pageTitle={"About TILT"}
                    pageTitleColor={"white"}
                >
                    <p className="lead mb-4 font-weight-bold text-white">The Intentional Learning Testing Platform TILT is a unique technology that tests for and identifies the causes of learning difficulties and offers expert guidance to help learners improve in their learning outcomes in record time.</p>
                </PageHeadingSection>
                <ImpactCounterSection/>
                <div className="container">
                    <div className="row mt-4 mt-lg-7">
                        <div className="col-lg-6 pr-lg-5">
                            <p className="h5 font-weight-bold lh-180 mb-3">TILT was created to provide policymakers with regular scientific assessments on education, its implications and potential future risks, as well as to put forward adaptation and mitigation options.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <p className="lead lh-180">
                                Educational technology is the use of both physical hardware, software, and educational theoretic to facilitate learning and improve performance by creating, using, and managing appropriate technological processes and resources. This field, which is also called EdTech or EduTech, has been described as a persisting initiative that seeks to bring learners, teacher, and technical means together in an effective way.
                            </p>
                            <p className="lead lh-180">In addition to experiential knowledge drawn from educational practice, educational technology is based on theoretical knowledge that emerge out of various disciplines such as communication, education, psychology, sociology, artificial intelligence, and computer science, among others.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default About;
