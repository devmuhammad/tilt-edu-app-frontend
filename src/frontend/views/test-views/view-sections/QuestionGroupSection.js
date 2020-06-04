import React from 'react';
import {ButtonGroup, ButtonToolbar} from "react-bootstrap";

const QuestionGroupSection = (props) => {
    const buttonToolbarStyle = {
        height: "80px",
        marginLeft: "20px",
        marginRight: "20px",
        overflow: "auto",
        borderRadius: "10px",
        backgroundColor: "#dde1ed"
    };
    return (
        <div className="section-header py-0">
            <div className="container">
                <div className="row mt-n5 mb-0 mt-0">
                    <div className="col-12 justify-content-center d-flex">
                        <ButtonToolbar
                            style={buttonToolbarStyle}>
                            <ButtonGroup size="lg" >
                                {props.children}
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionGroupSection;
