import React,{useContext,useState,Fragment} from 'react';
import {GroupContext} from '../Questionnaire';
import EditGroupModal from "./modals/EditGroupModal";
import axios from 'axios';
import ActionButton from './ActionButtons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import {SectContext} from '../Questionnaire'
import Loader from 'react-loader-spinner'
import { Alert, AlertTitle } from '@material-ui/lab';


const GroupList = () =>{
    // const [grps, sectList] = useContext(SectContext);
    const [groups,setGroups] = useContext(GroupContext);
    const [sectionList,setSectionList] = useContext(SectContext);
    const [loading, setLoading] = useState(false)
    const [groupId,setGroupId] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState();


    const handleToggleOpen = (e) =>{
        setIsOpen(true);
        setGroupId(e.target.getAttribute('groupid'))
    };

    const handleToggleClose = () =>{
      setIsOpen(false);
    };

    const handleListItemClick = (groupid, index) => {
        setLoading(true)
        setSelectedIndex(index)
        
        axios.get('https://tiltapp-api.herokuapp.com/groups/'+groupid+'/sections').then( res => {
        // console.log(res.data)
            if(res.status){
            setSectionList(sectionList => sectionList = res.data)  
            setLoading(false)
            }  else {
            setLoading(false)
                return(<Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Could not retrieve Sections— <strong> {res.message}</strong>
              </Alert>)
                
            }

       }).catch( err => {
        setLoading(false)
        console.log(err);
        return(<Alert severity="error">Error retrieving section !</Alert>)
       });
    }

    const deleteGroup = (e) => {
        let  id = e.target.getAttribute('groupid');
        // console.log(id);
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
                <List >
                    {/* <Fragment> */}
                        {
                            groups.map((group,index) =>
                            <ListItem button key={index} id={group.id} 
                                className="pt-3 pb-3" selected={selectedIndex === index}
                                onClick={() => handleListItemClick(group.id, index)}>
                            <ListItemIcon>
                            <i className={`fa fa-${group.icon} text-${group.color}`}> </i>
                            </ListItemIcon>
                            <ListItemText primary={group.name} />
                            <ListItemSecondaryAction>
                            {/* <IconButton  > */}
                            {loading && selectedIndex === index ? <Loader edge="end"
                                        type="Oval"
                                        color="gray"
                                        height={25}
                                        width={25}
                                        //  timeout={3000} //3 secs
                                    />
                            : <ActionButton edge="end"
                                        handleToggleOpen={handleToggleOpen}
                                        groupid={group.id}
                                        deleteGroup={deleteGroup}
                                    />}
                                {/* </IconButton> */}
                                </ListItemSecondaryAction>
                          </ListItem>
                                
                                )
                        }
                    {/* </Fragment> */}
                </List>
            </Fragment>
    );
};

export default GroupList;