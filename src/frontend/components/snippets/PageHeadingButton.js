import React from 'react';

const PageHeadingButton = (props) => {
    return (
        <a
            onClick={(event) => props.onClick(event)}
            href={props.link}
            className={`btn btn-pill btn-lg btn-${props.color} animate-up-2 mr-3`}>
            <span className="btn-inner-text text-white">
                {props.text}
                <i className={`fas ${props.icon} ml-3`}> </i>
            </span>
        </a>
    );
};

export default PageHeadingButton;
