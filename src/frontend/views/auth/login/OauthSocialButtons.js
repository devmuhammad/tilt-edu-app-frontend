import React from 'react';

const OauthSocialButtons = () => {
    return (
        <div className="btn-wrapper my-4 text-center">
            <button className="btn mr-2 btn-icon-only btn-pill btn-twitter" type="button">
                <span className="btn-inner-icon">
                    <i className="fa fa-twitter"> </i>
                </span>
            </button>
            <button className="btn mr-2 btn-icon-only btn-pill btn-facebook" type="button">
                <span className="btn-inner-icon">
                    <i className="fa fa-facebook-f"> </i>
                </span>
            </button>
            <button className="btn mr-2 btn-icon-only btn-pill btn-google" type="button">
                <span className="btn-inner-icon">
                    <i className="fa fa-google"> </i>
                </span>
            </button>
        </div>
    );
};

export default OauthSocialButtons;
