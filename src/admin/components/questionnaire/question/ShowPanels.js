import React, { Fragment,useState } from 'react'


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Loader from 'react-loader-spinner'

import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import {QstContext} from '../../questionnaire/Questionnaire';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


   const ShowPanels = (props) =>{

    const classes = useStyles();
    const [score, setScore] = useState(20)
    const [remark, setRemark] = useState("")
    const [weight_point, setWeightPoint] = useState([])
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const [question, setQuestion] = useState('');
    const [questObj,setQuestObj] = React.useContext(QstContext);
    const [expanded, setExpanded] = React.useState(false);
    const [sectId, setSectId] = useState()
    const [qstId, setQstId] = useState()

    const {qst, sectionId, index} = props


    React.useEffect (() => {

     setWeightPoint(weight_point => weight_point = qst.weight_points)
     
        // setDetails()
    },[props,weight_point])

    const setDetails = async () => {
        setQstId(qst.id)
        
        setSectId(qst.section_id)
        setQuestion(qst.question)
        if(qst.weight_points){
        const point = 20
        const pointObj = await weight_point.find(o => o.weight_point == point)
    if (pointObj){
        setRemark(pointObj.remark)
    }else setRemark("")
        }
    }

    const data = {

        section_id:sectId,
        question: question,
        weight_point: weight_point
    
}

    // const handleChange = (event) => {
    //     setSectionid(event.target.value);
    //   };
      const handleRemarkChange = (event) => {
        setRemark(event.target.value)
       };
     const handleQuestionChange = (event) => {
        setQuestion(event.target.value)
       };
    const handleScoreChange = async (event) => {
        setScore(event.target.value)

        const point = event.target.value
        
        // weight_point.forEach
        const pointObj = await weight_point.find(o => o.weight_point == point)
        
        if (pointObj){
            setRemark(pointObj.remark)
        }else setRemark("")
        
    }
    const handleRemarkAdd = () => {
        if (remark !== ""){
            let wt_point = {}
            wt_point.questionnaire_id = qstId
            wt_point.weight_point = parseInt(score)
            wt_point.remark = remark

            const index = weight_point.findIndex(x => x.weight_point == wt_point.weight_point)
            weight_point[index].remark = wt_point.remark
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

      const deleteQuestion = (id) => {
        setLoading(true)
        if ( id !== 0){
            window.confirm('Are you sure?') &&
            axios.delete('https://tiltapp-api.herokuapp.com/questionnaire/'+id).then(async res => {
                if (res.status){
                    handleClick()

                    await getUpdatedQuestion()
                    setLoading(false)
                      }else {
                      setLoading(false)
                          alert("Could not add question")
                      }
            } ).catch(err => console.log(err));
        }
    };

      const getUpdatedQuestion = () => {
        axios.get('https://tiltapp-api.herokuapp.com/sections/'+sectId+'/questionnaires').then(res => {
            if (res.status){

                setQuestObj(questObj => ({...questObj, questionList:res.data }))

            }
            // props.handleToggleClose()
        }).catch( err => {
            console.log(err);
        });
     }

    const handleFormSubmit = (event) => {
        
        if(sectId == undefined || sectId == 0){
           return alert("Kindly reselect a section to update questions")
      
            }
        if (Object.keys(errors).length === 0){
            setLoading(true)
            axios.put('https://tiltapp-api.herokuapp.com/questionnaire/'+qstId,data).then(async res => {
                if (res.status){
                  await getUpdatedQuestion()
                  setLoading(false)
                  handleClick()
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

    const handleExpChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    

   return ( <Fragment> 
                <ExpansionPanel TransitionProps={{ unmountOnExit: true }} expanded={expanded === index+1} onChange={handleExpChange(index+1)}>
                
                        <ExpansionPanelSummary
                            onClick = {setDetails}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                            <div className={classes.topExp}>
                            <Typography className={classes.heading}>{qst.question}</Typography>

                            {expanded && <IconButton edge="end" onClick={() => deleteQuestion(qstId)}>
                            <i className="fa fa-trash fa-sm" style={{color:"#FC8181",fontSize:15}}></i>   
                                </IconButton>}
                            </div>
                            
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                        
                       <form  noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                       
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                            Success ! Remark Added
                            </Alert>
                            </Snackbar>
                <div  className={classes.form} >
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
                        <button disabled={loading} className={"btn btn-sm btn-success"}>
                            {loading ? <Loader edge="end"
                                            type="Rings"
                                            color="white"
                                            height={20}
                                            width={20}/>
                            : <span> Submit </span> }
                            </button>

                        
                    </DialogActions>
                </form>
                        </ExpansionPanelDetails>

                        
                    </ExpansionPanel> 
                    </Fragment>
    )


}

const useStyles = makeStyles((theme) => ({
    main:{
        
        width: '100%',
    },
    root: {
        // width: '100%',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          },
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold,
    },
    waiting: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold,
        color:"gray"
    },
    form:{
        width:'100%',
        display:'flex',
        padding:10,
        // paddingLeft:10,
        // paddingRight:10,

    },
    selectBtn:{
        padding: '0.5rem 1.2rem',

    },
    topExp:{
        flex:1,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    }
}));

export default ShowPanels

