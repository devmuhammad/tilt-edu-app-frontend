import React from 'react';

const ImpactCounterItem = (props) => {
    return (
        <div className="card border-left-md border-soft align-content-center">
            <div className="card-body row justify-content-center">
                <div className="text-right">
                    <span className="icon-primary mr-3">
                        <i className={`fas fa-${props.icon} fa-4x`}> </i>
                    </span>
                </div>
                <div className="text-left">
                    <h2 className="text-gray mb-0">
                        <span className="counter display-3 mr-2">{props.count}</span>
                    </h2>
                    <span className="text-center text-muted mb-0">{props.caption}</span>
                </div>
            </div>
        </div>
    );
};

export default ImpactCounterItem;
