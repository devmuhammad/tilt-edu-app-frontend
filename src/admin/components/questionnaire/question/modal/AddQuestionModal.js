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
// import { Alert, AlertTitle } from '@material-ui/lab';
import {SectContext} from '../../Questionnaire'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    form:{
        width:'100%',
        display:'block',
        // margin: theme.spacing(2)
        padding:'1rem',
        paddingLeft:10,
        paddingRight:10
    },
  }));

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const AddQuestionModal = (props) => {

    const classes = useStyles();
    const [questObj,setQuestObj] = React.useContext(QstContext);

    const [loading, setLoading] = useState(false)
    const [sectionList,setSectionList] = useContext(SectContext);
    const [sectionId, setSectionId] = useState()
    const [question, setQuestion] = useState('');
    const [score, setScore] = useState(20)
    const [remark, setRemark] = useState("")
    const [weight_point, setWeightPoint] = useState([
        {"weight_point" : 20, "remark" : "Poor  result"},
		{"weight_point" : 40, "remark" : "Fairly good result"},
		{"weight_point" : 60, "remark" : "Good result"},
		{"weight_point" : 80, "remark" : "Excellent result"},
		{"weight_point" : 100, "remark" : "Perfect result"}
    ])
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = React.useState(false);


    const validate = () => {
        const errors = {};
        if (question === '') errors.question = 'Question can not be empty' ;
        return errors;
    };
    useEffect(() => {
        // console.log(questObj.selectedSection)
        setSectionId(props.sect)
        const point = 20
        const pointObj =  weight_point.find(o => o.weight_point == point)
        if (pointObj){
        setRemark(pointObj.remark)
    }else setRemark("")
    },[questObj.selectedSection]);


    const data = {
       
        section_id:sectionId,
        question: question,
        weight_point: weight_point
	
}

    const handleChange = (event) => {
        setSectionId(event.target.value);
      };
      const handleRemarkChange = (event) => {
        setRemark(event.target.value)
       };
     const handleQuestionChange = (event) => {
        setQuestion(event.target.value)
       };
    const handleScoreChange = (event) => {
        setScore(event.target.value)
        
        const point = event.target.value
        const pointObj = weight_point.find(o => o.weight_point == point)
        if (pointObj){
            setRemark(pointObj.remark)
        }else setRemark("")
        
    }
    const handleRemarkAdd = () => {
        if (remark !== ""){
            let wt_point = {}
            wt_point.weight_point = parseInt(score)
            wt_point.remark = remark
            
            const index = weight_point.findIndex(x => x.weight_point == wt_point.weight_point)
            weight_point[index].remark = wt_point.remark

            // setWeightPoint(weight_point => [...weight_point, wt_point])
            handleClick()
        }else alert("Enter a remark to add this score")
    }

    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const getUpdatedQuestion = () => {
        axios.get('https://tiltapp-api.herokuapp.com/sections/'+sectionId+'/questionnaires').then(res => {
            if (res.status){

                setQuestObj({...questObj, questionList:res.data })

            }
            // props.handleToggleClose()
        }).catch( err => {
            console.log(err);
        });
     }

     const clearData = () => {
        setScore()
        setRemark("")
        setQuestion("")
        // setWeightPoint([])
     }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const  errors = validate();
        if(sectionId == undefined || sectionId == 0){
        return alert("Kindly reselect a section to update questions")

        // return(<Alert severity="error">Select a section to add question !</Alert>)
            // return;
        }
        if (Object.keys(errors).length === 0){
            setLoading(true)
            axios.post('https://tiltapp-api.herokuapp.com/questionnaire',data).then(async res => {
                if (res.status){
                    handleClick()
                    clearData()
                  await getUpdatedQuestion()
                  setLoading(false)
                  
                    props.handleRemoveModal();
                    }else {
                    setLoading(false)
                        alert("Could not add question")
                //       return (<Alert severity="error">
                //     <AlertTitle>Error</AlertTitle>
                //     Could not add Question— <strong> {res.message}</strong>
                //   </Alert>)
                    }
                
            }).then( err => {
            setLoading(false)

                console.log(err);
            } );
        }else{
            setErrors(errors)
        }
    };

    // const updateName = e =>{
    //     setName(e.target.value);
    // };



    return (
        <Fragment>
                <Dialog open={!!props.clickedForm}  aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add New Question</DialogTitle>
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                    Success ! Remark Added
                    </Alert>
                    </Snackbar>
                    <DialogContent>
                    {
                        (loading) ? 'Loading...':

                        <form  noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                        <FormControl variant="outlined"  style={{marginLeft:10}} className={classes.formControl}>
                            <InputLabel id="select-section-label">Section</InputLabel>
                            <Select
                            labelId="select-section-label"
                            id="select-section"
                            value={sectionId}
                            onChange={handleChange}
                            label="Section"
                            disabled
                            >
                            {sectionList.map((section,index) => 
                            <MenuItem key={index} value={section.id}>{section.name}</MenuItem>
                            )}
                            </Select>
                        </FormControl>
                        
                                 
                        <div  className={ classes.form} >
                        <TextField
                            fullWidth
                            id="outlined-multiline-question"
                            label="Question"
                            multiline
                            rows={3}
                            value={question}
                            onChange={handleQuestionChange}
                            // defaultValue="Default Value"
                            variant="outlined"
                            />
                                           
                                      
                        </div>
                        <div className={classes.root}>
                        <TextField
                            id="select-section"
                            select
                            label="Select score"
                            value={score}
                            onChange={handleScoreChange}
                            helperText="Please select score"
                            variant="outlined"
                            >
                             <MenuItem  value="20">20%</MenuItem>
                             <MenuItem  value="40">40%</MenuItem>
                             <MenuItem  value="60">60%</MenuItem>
                             <MenuItem  value="80">80%</MenuItem>
                             <MenuItem  value="100">100%</MenuItem>
                            
                            </TextField>
                            <TextField
                                id="outlined-multiline-flexible"
                                label={"Remark"}
                                multiline
                                rowsMax={4}
                                helperText={score}
                                value={remark}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="add remark"
                                            onClick={handleRemarkAdd}
                                            ><i className="fa fa-send text-primary" color="primary"></i>
                                            </IconButton>
                                    </InputAdornment>
                                  }}
                                onChange={handleRemarkChange}
                                variant="outlined"
                                />

       
                                    </div>

                       
                            
                            <DialogActions>
                                <button disabled={loading} className={"btn btn-sm btn-success"}>Submit</button>

                                <Button onClick={props.handleRemoveModal} color="secondary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </form>
                            }
                    </DialogContent>

                </Dialog>
        </Fragment>


    );
};


export default AddQuestionModal;