import React, {Component} from 'react';
import AddGroupModal from './modals/AddGroupModal';
import EditGroupModal from './modals/EditGroupModal';


import PropTypes from 'prop-types';
import GroupList from "./GroupList";
import {GroupProvider} from "./GroupContext";

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
            <GroupProvider>
                <AddGroupModal
                    clickedForm={this.state.clickedForm}
                    handleRemoveModal={this.handleRemoveModal}
                />
                <div className="menu-bar">
                    <div className="compose group mb-3">
                        <button className="btn group-btn btn-block" onClick={this.handleClickedForm}>Groups 
                        <i className="mdi mdi-plus-circle"></i>
                        </button>
                    </div>
                    <GroupList/>
                </div>
            </GroupProvider>
        );
    }
}

Group.propTypes = {};

export default Group;