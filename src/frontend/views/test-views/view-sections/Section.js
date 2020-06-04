import React from 'react';

const Section = (props) => {
    return (
        <div className="section p-0">
            <div className="container">
                <div className="row">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Section;
