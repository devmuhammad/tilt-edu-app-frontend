import React, {useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {SectionContext} from '../SectionContext';
import axios from 'axios';




 const  EditSectionModal = (props) => {
     const [section,setSection] = useState({});
     const [loading,setLoading] = useState(false);
     const [sections,setSections] = useContext(SectionContext);

     const [name, setName] = useState('');
     const [errors, setErrors] = useState([]);

    //  console.log(props.section.sectionId)

     useEffect(() => {
        //  if (props.sectionId !== 0) {
        //      getData();
        //  }
        setName(props.section.name)
    },[props]);

     async function getData() {
        await axios.get('https://tiltapp-api.herokuapp.com/sections/'+props.section.id)
            .then(  res => {
            setLoading(false);
            setSection(res.data[0]);
            setName(res.data[0].name)
         }).catch( err => {
             console.log(err);
         });
     }

     const validate = () => {
         const errors = {};
         if (name === '') errors.name = 'Section name can not be empty' ;
         return errors;
     };

     const data = {
         name,
     };


     const handleUpdate = (event) => {
         event.preventDefault();
         const  errors = validate();
         if (Object.keys(errors).length === 0){
             axios.put('https://tiltapp-api.herokuapp.com/sections/'+props.section.id,data).then( res => {
                 axios.get('https://tiltapp-api.herokuapp.com/sections').then(res => {
                     setSections(res.data);
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


    return (
        <div>
            <Dialog open={props.isOpen}  aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Section</DialogTitle>
                <DialogContent>
                    {
                        (loading)?'Loading...':

                            <React.Fragment>
                            <form   onSubmit={handleUpdate} noValidate autoComplete="off">
                                <div>
                                    <TextField  name="name"  value={name} margin="dense"  label="Name" variant="outlined" onChange={updateName}/>
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

export default EditSectionModal;