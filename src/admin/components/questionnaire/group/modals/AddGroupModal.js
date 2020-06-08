import React,{useState,useEffect, useContext,Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {GroupContext} from '../../Questionnaire';




const AddGroupModal = (props) => {

    const [groups,setGroups] = useContext(GroupContext);

    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const [color, setColor] = useState('');
    const [errors, setErrors] = useState([]);

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

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const  errors = validate();
        if (Object.keys(errors).length === 0){
            axios.post('https://tiltapp-api.herokuapp.com/groups',data).then( res => {
                axios.get('https://tiltapp-api.herokuapp.com/groups').then(res => {
                    setGroups(res.data);
                    props.handleRemoveModal();
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

    const updateIcon = e =>{
        setIcon(e.target.value);
    };
    const updateColor = e =>{
        setColor(e.target.value);
    };


    return (
        <Fragment>
                <Dialog open={!!props.clickedForm}  aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add New Group</DialogTitle>
                    <DialogContent>
                        <form  noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                            <div>
                                <TextField  name="name"  margin="dense"  label="Name" variant="outlined" onChange={ updateName }/>
                            </div>

                            <div>
                                <TextField  name="icon"  margin="dense" label="Icon" variant="outlined" onChange={ updateIcon } />
                            </div>

                            <div>
                                <TextField  name="color"  label="Color"  margin="dense" onChange={ updateColor } variant="outlined"/>
                            </div>
                            <DialogActions>
                                <button className={"btn btn-sm btn-success"}>Submit</button>

                                <Button onClick={props.handleRemoveModal} color="secondary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>

                </Dialog>
        </Fragment>


    );
};

export default AddGroupModal;