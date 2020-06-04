import React from 'react';
import PageHeadingButton from "../snippets/PageHeadingButton";
import studentBanner from "../../assets/images/illustrations/students-banner.svg"

const HomeHeadingSection = () => {
    return (
        <section className="section-header bg-soft text-dark">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 d-md-none">
                        <h1 className="display-2 font-weight-bold mb-0 text-primary">
                            Every Learner can excel
                        </h1>
                    </div>
                    <div className="col-12 col-md-7 col-lg-6 order-lg-1">
                        <h1 className="text-primary display-2 font-weight-bold d-none d-md-inline">Every Learner can excel
                        </h1>
                        <p className="lead text-muted mt-4"><span className="font-weight-bold">The Intentional Learning Testing Platform TILT</span> is a unique technology that tests for and identifies the causes of learning difficulties and offers expert guidance to help learners improve in their learning outcomes in record time.
                        </p>
                        <div className="col-12 d-md-none">
                            <img src={studentBanner} className="img-fluid mb-lg-6 mb-0" alt="Students Reading Banner"/>
                        </div>
                        <p className="lead text-muted mt-4">
                            <span className="font-weight-bold text-primary">TILT</span> is designed based on learning psychology.
                        </p>
                        <div className="mt-4 mt-lg-5 mb-5 mb-lg-0">
                            <PageHeadingButton
                                text={"Take The Test"}
                                color={"secondary"}
                                icon={"fa-arrow-right"}
                                link={"/test"}
                            />
                        </div>
                    </div>
                    <div className="col-4 col-md-5 col-lg-6 order-lg-2 d-none d-sm-block">
                        <img src={studentBanner} className="img-fluid mb-lg-6 mb-0" alt="Students Reading Banner"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHeadingSection;
