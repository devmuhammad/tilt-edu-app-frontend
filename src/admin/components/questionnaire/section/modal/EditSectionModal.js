import React, {useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import {SectionContext} from '../SectionContext';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import {GroupContext} from '../../../questionnaire/Questionnaire';
import { Alert, AlertTitle } from '@material-ui/lab';
import {SectContext} from '../../Questionnaire'


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

 const  EditSectionModal = (props) => {
    const classes = useStyles();
    //  const [section,setSection] = useState({});
    const [sectionList,setSectionList] = useContext(SectContext);

     const [loading,setLoading] = useState(false);
     const [groups,setGroups] = useContext(GroupContext);
     const [groupId, setGroupId] = useState()
     const [name, setName] = useState('');
     const [errors, setErrors] = useState([]);

    //  console.log(props.section.sectionId)

     useEffect(() => {
        //  if (props.sectionId !== 0) {
        //      getData();
        //  }
        setName(props.section.name)
        setGroupId(props.section.group_id)
    },[props]);

    //  async function getData() {
    //     await axios.get('https://tiltapp-api.herokuapp.com/sections/'+props.section.id)
    //         .then(  res => {
    //         setLoading(false);
    //         setSection(res.data[0]);
    //         setName(res.data[0].name)
    //      }).catch( err => {
    //          console.log(err);
    //      });
    //  }

     const handleChange = (event) => {
        setGroupId(event.target.value);
      }; 

     const validate = () => {
         const errors = {};
         if (name === '') errors.name = 'Section name can not be empty' ;
         return errors;
     };

     const data = {
         name,
         group_id:groupId
     };

     const getUpdatedSection = () => {
        axios.get('https://tiltapp-api.herokuapp.com/groups/'+groupId+'/sections').then(res => {
            if (res.status){
                setSectionList(sectionList => sectionList = res.data) 
            }
            // props.handleToggleClose()
        }).catch( err => {
            console.log(err);
        });
     }


     const handleUpdate = (event) => {
         event.preventDefault();
         const  errors = validate();
         if (Object.keys(errors).length === 0){
            setLoading(true)

             axios.put('https://tiltapp-api.herokuapp.com/sections/'+props.section.id,data).then(async res => {
                if (res.status){

                    await getUpdatedSection()
                    setLoading(false)

                    props.handleToggleClose();
                }else {
                    
                    setLoading(false)

                    return(<Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Could not update Section— <strong> {res.message}</strong>
                  </Alert>)
                    }
             }).then( err => {
                setLoading(false)
                 console.log(err);
        return(<Alert severity="error">Error retrieving questionnaires !</Alert>)

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
                            <FormControl variant="outlined" fullWidth style={{margin:0,display:"flex"}} className={classes.formControl}>
                            <InputLabel id="select-group-label">Group</InputLabel>
                            <Select
                            labelId="select-group-label"
                            id="select-group"
                            disabled
                            value={groupId}
                            onChange={handleChange}
                            label="Group"
                            >
                            {groups.map((group,index) => 
                            <MenuItem key={index} value={group.id}>{group.name}</MenuItem>
                            )}
                            </Select>
                            </FormControl>
                                <div>
                                    <TextField  name="name"  value={name} margin="dense"  label="Name" variant="outlined" onChange={updateName}/>
                                </div>

                                <DialogActions>
                                    <div>
                                        <button disabled={loading} className={"btn btn-sm btn-success"} type={"submit"} color="primary">
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