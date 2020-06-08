import React,{useState,useEffect, useContext,Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from 'react-modal';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import {QstContext} from '../../../questionnaire/Questionnaire';
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

const AddSectionModal = (props) => {

    const classes = useStyles();
    const [groups,setGroups] = useContext(GroupContext);
    const [loading, setLoading] = useState(false)
    const [sectionList,setSectionList] = useContext(SectContext);
    const [groupId, setGroupId] = useState()
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    const validate = () => {
        const errors = {};
        if (name === '') errors.name = 'Section name can not be empty' ;
        return errors;
    };

    const data = {
        name,
        group_id:groupId
    };

    const handleChange = (event) => {
        setGroupId(event.target.value);
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

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const  errors = validate();
        if(groupId == undefined){
        alert("Select a group to add section")

        return(<Alert severity="error">Select a group to add section !</Alert>)
        }
        if (Object.keys(errors).length === 0){
            setLoading(true)
            // data.group_id = groupId
            axios.post('https://tiltapp-api.herokuapp.com/sections',data).then(async res => {
                if (res.status){
                  await getUpdatedSection()
                  setLoading(false)

                    props.handleRemoveModal();
                    }else {
                    setLoading(false)

                      return (<Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Could not add Section— <strong> {res.message}</strong>
                  </Alert>)
                    }
                
            }).then( err => {
            setLoading(false)

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
        <Fragment>
                <Dialog open={!!props.clickedForm}  aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add New Section</DialogTitle>
                    <DialogContent>
                        <form  noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                        <FormControl variant="outlined" fullWidth style={{margin:0,display:"flex"}} className={classes.formControl}>
                            <InputLabel id="select-group-label">Group</InputLabel>
                            <Select
                            labelId="select-group-label"
                            id="select-group"
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
                                <TextField  name="name"  margin="dense"  label="Name" variant="outlined" onChange={ updateName }/>
                            </div>
                            <DialogActions>
                                <button disabled={loading} className={"btn btn-sm btn-success"}>Submit</button>

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






// class SectionModal extends Component {
//
//
//     state = {
//         data:{
//             name:"",
//             color:"",
//             icon:""
//         },
//         errors:[]
//     };
//
//     componentWillMount() {
//         Modal.setAppElement('body');
//     }
//
//     handleChange = (event) => {
//         this.setState({
//             data:{
//                 ...this.state.data,
//                 [event.target.name]: event.target.value
//             }
//         });
//     };
//
//     handleFormSubmit = (event) => {
//         event.preventDefault();
//         const {data} = this.state;
//         const  errors = this.validate();
//         if (Object.keys(errors).length === 0){
//             axios.post('https://tiltapp-api.herokuapp.com/sections',this.state.data).then( res => {
//                 setSections(previousSections => [...previousSections,res.data]);
//             }).then( err => {
//                 console.log(err);
//             } );
//
//         }else{
//             this.setState({errors})
//         }
//     };
//
//     validate = () => {
//         const {data} = this.state;
//         const errors = {};
//         if (data.name === '') errors.name = 'Section name can not be empty' ;
//         if (data.icon === '') errors.icon = 'Icon field  can not be empty' ;
//         if (data.color === '') errors.color = 'Color can not be empty' ;
//        return errors;
//     };
//
//     render() {
//         const {data,errors} = this.state;
//         return (
//             <Modal
//                 isOpen={!!this.props.clickedForm}
//                 contentLabel="Example Modal"
//                 style={customStyles}
//             >
//                 <div>
//                     <button onClick={this.props.handleRemoveModal}>Close</button>
//                     <div>Create Section</div>
//                     <form onSubmit={this.handleFormSubmit}>
//                         <div className="form-section">
//                             <label htmlFor="name">Name</label>
//                             <input type="text" name="name"  id={"name"} className={"form-control"} onChange={this.handleChange}/>
//                             <small>{errors.name ? errors.name:''}</small>
//                         </div>
//
//                         <div className="form-section">
//                             <label htmlFor="icon">Font Icon</label>
//                             <input type="text" name="icon" id={"icon"} className={"form-control"} onChange={this.handleChange}/>
//                         </div>
//
//                         <div className="form-section">
//                             <label htmlFor="color">Colour</label>
//                             <input type="text" name="color" id={"color"} className={"form-control"} onChange={this.handleChange}/>
//                         </div>
//
//                         <div className="form-section">
//                             <button className={"btn btn-success"}>Submit</button>
//                         </div>
//                     </form>
//                 </div>
//             </Modal>
//         );
//     }
// }

export default AddSectionModal;