import React, {useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {GroupContext} from '../GroupContext';
import axios from 'axios';




 const  EditGroupModal = (props) => {
     const [group,setGroup] = useState({});
     const [loading,setLoading] = useState(true);
     const [groups,setGroups] = useContext(GroupContext);

     const [name, setName] = useState('');
     const [icon, setIcon] = useState('');
     const [color, setColor] = useState('');
     const [errors, setErrors] = useState([]);

     useEffect(() => {
         if (props.groupId !== 0) {
             getData();
         }
     },[props.groupId]);

     async function getData() {
        await axios.get('https://tiltapp-api.herokuapp.com/groups/'+props.groupId)
            .then(  res => {
            setLoading(false);
            setGroup(res.data[0]);
            setName(res.data[0].name)
                setIcon(res.data[0].icon)
                setColor(res.data[0].color)

         }).catch( err => {
             console.log(err);
         });
     }

     const validate = () => {
         const errors = {};
         if (name === '') errors.name = 'Group name can not be empty' ;
         if (icon === '') errors.icon = 'Icon field  can not be empty' ;
         if (color === '') errors.color = 'Color can not be empty' ;
         return errors;
     };

     const data = {
         name,
         icon,
         color
     };


     const handleUpdate = (event) => {
         event.preventDefault();
         const  errors = validate();
         if (Object.keys(errors).length === 0){
             axios.put('https://tiltapp-api.herokuapp.com/groups/'+props.groupId,data).then( res => {
                 axios.get('https://tiltapp-api.herokuapp.com/groups').then(res => {
                     setGroups(res.data);
                     props.handleToggleClose()
                 }).catch( err => {
                     console.log(err);
                 });
             }).then( err => {
                 console.log(err);
             } );
         }else{
             setErrors(errors)
         }

     };

     const updateName = e =>{
         setName(e.target.value);
     };

     const eupdateIcon = e =>{
         setIcon(e.target.value);
     };
     const eupdateColor = e =>{
         setColor(e.target.value);
     };

    return (
        <div>
            <Dialog open={props.isOpen}  aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Group</DialogTitle>
                <DialogContent>
                    {
                        (loading)?'Loading...':

                            <React.Fragment>
                            <form   onSubmit={handleUpdate} noValidate autoComplete="off">
                                <div>
                                    <TextField  name="name"  value={name} margin="dense"  label="Name" variant="outlined" onChange={updateName}/>
                                </div>

                                <div>
                                    <TextField  name="icon"  value={icon} margin="dense" label="Icon" variant="outlined" onChange={eupdateIcon}/>
                                </div>

                                <div>
                                    <TextField  name="color" value={color}  label="Color" margin="dense" variant="outlined" onChange={eupdateColor} />
                                </div>
                                <DialogActions>
                                    <div>
                                        <button className={"btn btn-sm btn-success"} type={"submit"} color="primary">
                                            Update
                                        </button>
                                    </div>
                                    <Button onClick={props.handleToggleClose} color="secondary">
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </form>
                            </React.Fragment>
                    }

                </DialogContent>

            </Dialog>
        </div>
    );
};

export default EditGroupModal;