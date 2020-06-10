import React from 'react';

const NavActionButton = (props) => {
    return (
        <a href={props.link} disabled={props.disabled} role="button" className={props.className}>
            <i className={`fa ${props.icon} mr-1`}></i>{props.text}
        </a>
    );
};

export default NavActionButton;
