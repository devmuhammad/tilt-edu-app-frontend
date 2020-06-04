import React from 'react';

const EvaluationStagesCard = (props) => {
    return (
        <div className="col-12 col-lg-4 mb-5">
            <a className="card animate-up-3 shadow-sm border-soft" href="#">
                <div className="px-5 pt-4 pb-5">
                    <span className={`badge badge-${props.badgeColor} badge-pill mb-2`}>
                        {props.badgeText}
                    </span>
                    <h5 className="mb-3">{props.heading}</h5>
                    <p className="text-gray mb-0">{props.info}</p>
                    <div className="pt-4">
                        <img src={props.image} className="img-fluid img-center"
                            alt="Illustration"/>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default EvaluationStagesCard;
