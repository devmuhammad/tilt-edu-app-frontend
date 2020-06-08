import React, {Component} from 'react';
import AddGroupModal from './modals/AddGroupModal';
import EditGroupModal from './modals/EditGroupModal';

import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types';
import GroupList from "./GroupList";
import {GroupContext} from "../Questionnaire";
import { flexbox } from '@material-ui/system';

class Group extends Component {
    state = {
        clickedForm: undefined
        
    };


    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    handleClickedForm = () =>{
        this.setState( () => ({clickedForm:1}) )
    };

    handleRemoveModal = () => {
        this.setState( () =>({clickedForm:undefined}))
    };

    render() {
        return (
            <GroupContext.Consumer>
                {groups => 
                <div>
                <AddGroupModal
                    clickedForm={this.state.clickedForm}
                    handleRemoveModal={this.handleRemoveModal}
                />
                <div className="menu-bar">
                    <div className="compose group">
                        <button className="btn group-btn btn-block" onClick={this.handleClickedForm}>Groups 
                        <i className="mdi mdi-plus-circle"></i>
                        </button>
                    </div>
                   { groups.length >= 1 ? <GroupList/> : <Loader 
                    type="Rings"
                    color="gray"
                    height={50}
                    width={50}
                    style={{display:"flex", justifyContent:"center",marginTop:10}}
                    //  timeout={3000} //3 secs
                    />}
                </div>
                </div>
                }
            </GroupContext.Consumer>
        );
    }
}

Group.propTypes = {};

export default Group;