import React from 'react';

const SectionHeading = (props) => {
    return (
        <section className={`section section-lg pt-${props.pt ? props.pt : 5} pb-${props.pb ? props.pb : 7} pb-lg-${props.pb ? props.pb : 7} bg-${props.bgColor ? props.bgColor : "soft"}`}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center text-dark">
                        <h2 className="h1">
                            {props.renderHeading()}
                        </h2>
                        <p className="lead text-gray my-4">
                            {props.renderDescription()}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionHeading;
