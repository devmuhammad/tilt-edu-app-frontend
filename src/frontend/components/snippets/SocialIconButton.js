import React from 'react';

const SocialIconButton = (props) => {
    return (
        <li className="list-inline-item">
            <a href={props.link} target="_blank" className={`btn btn-link btn-${props.type}`} rel="noopener nofollow" data-toggle="tooltip" data-placement="bottom"
                title={props.title}>
                <span className={`icon icon-${props.size}`}>
                    <i className={`fab fa-${props.type}`}>
                    </i>
                </span>
            </a>
        </li>
    );
};

export default SocialIconButton;
