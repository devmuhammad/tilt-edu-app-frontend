import React from 'react';
const Helpers = require('../../../../helpers/Helpers')

const SummaryResultCard = (props) => {
    return (
        <div className="col-md-6 col-lg-4 mb-6">
            <div className="pricing-card animate-up-2">
                <div className={`card shadow border-${props.color} p-0`}>
                    <header className="card-header bg-white text-center">
                        <span>
                            <i className={`far fa-${props.icon} fa-7x icon-${props.color}`}> </i>
                        </span>
                        <h2 className="text-gray-800 mb-3 font-weight-bolder mt-3">{props.group}</h2>
                    </header>
                    <div className="card-body p-0">
                        <div className="container text-center mb-3">
                            {
                                props.sections
                                    .map((section, index) => {
                                        return (
                                            <p
                                                key={Math.round(Math.random()*100) + index}
                                                className={`${index !== props.sections.length + 1 ? "border-bottom" : null} m-0`}
                                            >
                                                {Helpers.titleCase(section)}
                                            </p>
                                        )
                                    }
                                )
                            }
                        </div>
                    </div>
                    <div className={`d-flex justify-content-center card-footer bg-${props.color}`}>
                            <span className="d-block text-white ">
                                <span className="display-1 font-weight-bold">
                                    {props.score}<span className="align-middle font-medium">%</span>
                                </span>
                            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryResultCard;
