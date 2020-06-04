import React,{Fragment} from 'react';
import Item from "./Item";


const Section = () => {


    handleClickedForm = () =>{
        this.setState( () => ({clickedForm:1}) )
    };

    handleRemoveModal = () => {
        this.setState( () =>({clickedForm:undefined}))
    };

    return (
        <Fragment>
        <div className="mail-list-container col-md-3  pb-4 border-right bg-white">
            <div className=" section-button-content  pb-4 mb-3">
                <button className="btn section-button btn-danger">Section <i className="mdi mdi-plus-circle"></i></button>
            </div>

            <div className="section-container pt-5 px-2">
                <Item/>
            </div>
        </div>
    </Fragment>
    );

};

export default Section;