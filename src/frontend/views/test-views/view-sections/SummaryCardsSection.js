import React from 'react';

const SummaryCardsSection = (props) => {
    return (
        <div className="section-header py-0 pt-8 pt-lg-5">
            <div className="container">
                <div className="row mt-n9">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default SummaryCardsSection;
