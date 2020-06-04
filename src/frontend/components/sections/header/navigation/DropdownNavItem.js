import React from 'react';
import {NavLink} from "react-router-dom";

const DropdownNavItem = (props) => {
    return (
            <NavLink to={props.link}
                className="list-group-item list-group-item-action d-flex align-items-center p-0 py-3 px-lg-4">
                <span className={`icon icon-sm icon-${props.color}`}>
                    <i className={props.icon}></i>
                </span>
                <div className="ml-4">
                    <span className="text-dark d-block">{props.name}</span>
                    <span className="small">{props.info}</span>
                </div>
            </NavLink>
    );
};

export default DropdownNavItem;
