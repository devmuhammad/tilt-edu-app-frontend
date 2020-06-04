import React from 'react';
import {Button, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import "./QuestionItem.css";
/*
TODO: Refactor the entire ToggleButton System
* */
const QuestionItem = (props) => {
    return (
        <div className="col-12 d-flex flex-column border-bottom mb-5">
            <h3 className={`text-bold text-${props.color} text-center`}>{props.question}</h3>
            <div className="row">
                <div className="col-3">
                    <p className={`text-${props.color} font-weight-bold text-right`}>Strongly agree</p>
                </div>
                <div className="col-6">
                    <ToggleButtonGroup
                        bsPrefix={"btn-group btn-group-toggle d-flex justify-content-between"}
                        name={"answers"}
                        onChange={value => props.onAnswer(value)}
                        defaultValue={0}
                    >
                            <ToggleButton value={5} bsPrefix={`btn Button mr-1 ml-1 p-2 mr-lg-4 ml-lg-4 rounded-circle btn-outline-${props.color}`}/>
                            <ToggleButton value={4} bsPrefix={`btn Button mr-1 ml-1 p-2 rounded-circle btn-outline-${props.color} mr-lg-5 ml-lg-5`}/>
                            <ToggleButton value={3} bsPrefix="btn Button mr-1 ml-1 p-2 rounded-circle btn-outline-gray-500 mr-lg-5 ml-lg-5"/>
                            <ToggleButton value={2} bsPrefix="btn Button mr-1 ml-1 p-2 rounded-circle btn-outline-gray-600 mr-lg-5 ml-lg-5"/>
                            <ToggleButton value={1} bsPrefix="btn Button mr-1 ml-1 p-2 rounded-circle btn-outline-gray-800 mr-lg-4 ml-lg-4"/>
                    </ToggleButtonGroup>
                </div>
                <div className="col-3">
                    <p className="font-weight-bold text-left">Strongly disagree</p>
                </div>
            </div>
        </div>
    );
};

export default QuestionItem;
