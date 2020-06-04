import React from 'react';

const ProgressBar = (props) => {
    return (
        <div className="container pt-4 pb-2">
            <div className="row">
                <div className="col-12">
                    <div className="progress-wrapper">
                        <div className="progress-info info-xl">
                            <div className="progress-label">
                                <span className={`text-${props.color}`}> </span>
                            </div>
                            <div className="progress-percentage">
                                <span className={`text-${props.color} text-bold`}>
                                    {`${props.progress}% Completed`}
                                </span>
                            </div>
                        </div>
                        <div className="progress progress-xl">
                            <div className={`progress-bar bg-${props.color}`} role="progressbar" aria-valuenow={`${props.progress}`} aria-valuemin="0" aria-valuemax="100"> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
