// import React,{useState,useEffect, useContext,Fragment} from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Modal from 'react-modal';
// import axios from 'axios';
// import {QuestionContext} from '../QuestionContext';




// const AddQuestionModal = (props) => {
//     const [questions,setQuestions] = useContext(Context);

//     const [name, setName] = useState('');
//     const [errors, setErrors] = useState([]);

//     const validate = () => {
//         const errors = {};
//         if (name === '') errors.name = 'Section name can not be empty' ;
//         return errors;
//     };

//     const data = {
//         name
//     };

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         const  errors = validate();
//         if (Object.keys(errors).length === 0){
//             axios.post('https://tiltapp-api.herokuapp.com/sections',data).then( res => {
//                 axios.get('https://tiltapp-api.herokuapp.com/sections').then(res => {
//                     setSections(res.data);
//                     console.log(res.data);
//                 }).catch( err => {
//                     console.log(err);
//                 });
//             }).then( err => {
//                 console.log(err);
//             } );
//         }else{
//             setErrors(errors)
//         }
//     };

//     const updateName = e =>{
//         setName(e.target.value);
//     };



//     return (
//         <Fragment>
//                 <Dialog open={!!props.clickedForm}  aria-labelledby="form-dialog-title">
//                     <DialogTitle id="form-dialog-title">Add New Section</DialogTitle>
//                     <DialogContent>
//                         <form  noValidate autoComplete="off" onSubmit={handleFormSubmit}>
//                             <div>
//                                 <TextField  name="name"  margin="dense"  label="Name" variant="outlined" onChange={ updateName }/>
//                             </div>
//                             <DialogActions>
//                                 <button className={"btn btn-sm btn-success"}>Submit</button>

//                                 <Button onClick={props.handleRemoveModal} color="secondary">
//                                     Cancel
//                                 </Button>
//                             </DialogActions>
//                         </form>
//                     </DialogContent>

//                 </Dialog>
//         </Fragment>


//     );
// };


// export default AddSectionModal;