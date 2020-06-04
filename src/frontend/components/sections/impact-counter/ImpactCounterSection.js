import React, {Fragment} from 'react';
import ImpactCounterItem from "./ImpactCounterItem";
import SectionHeading from "../SectionHeading";

const ImpactCounterSection = () => {
    return (
        <Fragment>
            <SectionHeading
                renderHeading={() => (
                    <Fragment>
                        See the Impact of
                        <span className="text-primary font-weight-bold">&nbsp; TILT</span>
                    </Fragment>
                )}
                renderDescription={() => (
                    <Fragment>
                        <span className="text-primary font-weight-bold">&nbsp; The TILT Platform</span> is empowering student and schools to detect and correct the causes of academic failures. See the number for yourself
                    </Fragment>
                )}
            />
            <section className="section section-lg py-0">
                <div className="container mt-n5 mt-md-n6">

                    <div className="row">
                        <div className="col-12">
                            <div className="card-group">
                                <ImpactCounterItem
                                    caption={"Test Completed"}
                                    count={"13400"}
                                    icon={"file-alt"}
                                />
                                <ImpactCounterItem
                                    caption={"Schools Registered"}
                                    count={"800"}
                                    icon={"school"}
                                />
                                <ImpactCounterItem
                                    caption={"Learners Tested"}
                                    count={"1200"}
                                    icon={"user-graduate"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default ImpactCounterSection;
