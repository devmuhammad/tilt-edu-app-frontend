import React from 'react';

const PageHeadingSection = (props) => {
    return (
        <section className={`${props.overlay ? props.overlay : null} section section-lg bg-image bg-${props.bgColor ? props.bgColor : "soft"} pt-${props.pt ? props.pt : 10} pb-${props.pb ? props.pb : 5}`} data-background={props.bgImage}>
            <div className="container">
                <div className="row justify-content-center">
                    {props.headingImage ? <img src={props.headingImage} alt="Page Heading Image" className="w-50"/> : null}
                    <div className={`col-10 mx-auto text-center`}>
                        <h1 className={`text-${props.pageTitleColor ? props.pageTitleColor : "primary"} display-1 font-weight-bold`}>{props.pageTitle}</h1>
                        {props.children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageHeadingSection;
