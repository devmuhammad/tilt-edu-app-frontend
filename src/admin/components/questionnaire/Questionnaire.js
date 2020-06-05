import React, {Fragment} from 'react';
import Group from './group/Group';
import Section from './section/Section';
import Question from './question/Question';
 const Questionnaire = () =>{
    return (
        <Fragment>
            <div className="content-wrapper">
                <div className="email-wrapper wrapper">
                    <div className="row align-items-stretch">
                        <div className="mail-sidebar d-none d-lg-block col-md-2 p-0 bg-white">
                            <Group/>
                        </div>
                        <Section />
                        <Question />
                    </div>
                </div>
            </div>
        </Fragment>
    );

};

 export default Questionnaire;