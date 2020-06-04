import React,{useContext,useState,Fragment} from 'react';
import {GroupContext} from './GroupContext';
import EditGroupModal from "./modals/EditGroupModal";
import axios from 'axios';
import ActionButton from './ActionButtons';


const GroupList = () =>{
    const [groups,setGroups] = useContext(GroupContext);
    const [groupId,setGroupId] = useState(0);
    const [isOpen, setIsOpen] = useState(false);


    const handleToggleOpen = (e) =>{
        setIsOpen(true);
        setGroupId(e.target.getAttribute('groupid'))
    };

    const handleToggleClose = () =>{
      setIsOpen(false);
    };
    const deleteGroup = (e) => {
        let  id = e.target.getAttribute('groupid');
        console.log(id);
        if ( id !== 0){
            window.confirm('Are you sure?') &&
            axios.delete('https://tiltapp-api.herokuapp.com/groups/'+id).then( res => {
                axios.get('https://tiltapp-api.herokuapp.com/groups').then(res => {
                    setGroups(res.data);
                }).catch( err => {
                    console.log(err);
                });
            } ).catch(err => console.log(err));
        }
    };

    return (
            <Fragment>
                    <EditGroupModal
                        isOpen={isOpen}
                        handleToggleClose={handleToggleClose}
                        groupId={groupId}
                    />
                <ul className="menu-items">
                    <Fragment>
                        {
                            groups.map((group,index) =>
                                <li key={index} id={group.id}>
                                    <a href="#" >
                                        <i className={`fa fa-${group.icon} text-${group.color}`}> </i>
                                        {group.name}
                                    </a>
                                    <ActionButton
                                        handleToggleOpen={handleToggleOpen}
                                        groupid={group.id}
                                        deleteGroup={deleteGroup}
                                    />
                                </li>)
                        }
                    </Fragment>
                </ul>
            </Fragment>
    );
};

export default GroupList;