import React, {Component,Fragment} from 'react';
import AddSectionModal from './modal/AddSectionModal';
import SectionList from "./SectionList";
import {SectionProvider} from "./SectionContext";
import PropTypes from 'prop-types';


class Section extends Component {
    state = {
        clickedForm: undefined
    };


    handleClickedForm = () =>{
        this.setState( () => ({clickedForm:1}) )
    };

    handleRemoveModal = () => {
        this.setState( () =>({clickedForm:undefined}))
    };

    render() {
        return (
            <SectionProvider>
                <AddSectionModal
                    clickedForm={this.state.clickedForm}
                    handleRemoveModal={this.handleRemoveModal}
                />
            <Fragment>
            <div className="mail-list-container col-md-3  pb-4 border-right bg-white">
                <div className=" section-button-content ">
                    <button className="btn section-button " onClick={this.handleClickedForm}>Section
                    <i className="mdi mdi-plus-circle"></i>
                    </button>
                </div>
                <div className="section-container pt-1 px-2">
                    <SectionList/>
                </div>
            </div>
        </Fragment>
            </SectionProvider>
        );
    }
}

Section.propTypes = {};

export default Section;