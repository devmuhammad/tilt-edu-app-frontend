import React,{useState,useEffect, useContext,Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from 'react-modal';
import axios from 'axios';
import {SectionContext} from '../SectionContext';




const AddSectionModal = (props) => {

    const [sections,setSections] = useContext(SectionContext);

    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    const validate = () => {
        const errors = {};
        if (name === '') errors.name = 'Section name can not be empty' ;
        return errors;
    };

    const data = {
        name
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const  errors = validate();
        if (Object.keys(errors).length === 0){
            axios.post('https://tiltapp-api.herokuapp.com/sections',data).then( res => {
                axios.get('https://tiltapp-api.herokuapp.com/sections').then(res => {
                    setSections(res.data);
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



    return (
        <Fragment>
                <Dialog open={!!props.clickedForm}  aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add New Section</DialogTitle>
                    <DialogContent>
                        <form  noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                            <div>
                                <TextField  name="name"  margin="dense"  label="Name" variant="outlined" onChange={ updateName }/>
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