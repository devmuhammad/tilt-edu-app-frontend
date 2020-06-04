import React,{Fragment} from 'react';
import ActionButtons from './ActionButtons'; 

 const Item = (props)=>{
    return (
        <Fragment>
            <div className="mail-list">
                <div className="content">
                    <p className="sender-name"> {props.name} </p>
                </div>
                <div className="details">
                    <a href  onClick={ props.handleToggleOpen} sectionId={props.section}><i className="fa fa-edit"></i></a>        
                </div>
            </div>
        </Fragment>
    );
}

export default Item;