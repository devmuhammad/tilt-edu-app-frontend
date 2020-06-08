import React, { Fragment,useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddQuestionModal from './modal/AddQuestionModal' 
import MuiAlert from '@material-ui/lab/Alert';
import {QstContext} from '../../questionnaire/Questionnaire';
import ShowPanels from './ShowPanels'


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
}));
   
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const Question = () => {
    const classes = useStyles();
    const [clickedForm, setClickedForm] = React.useState()
    const [selSect, setSelSect] = React.useState(true)
    const [questObj,setQuestObj] = React.useContext(QstContext);
    const [sectionId, setSectionid]= React.useState()
    
   



    React.useEffect (() => {

        if (questObj.selectedSection !== 0 ){
            setSelSect(false)
        }
        setSectionid(questObj.selectedSection)
        // setQuestion()
        // getUpdatedQuestion()
    },[questObj.selectedSection])


    const handleClickedForm = () =>{
        setClickedForm(1)
        };
    
        const handleRemoveModal = () => {
        setClickedForm(undefined)
        };

       
     


    return (
        <div className="mail-view question-container d-none d-md-block col-md-9 col-lg-7 bg-white">
             <AddQuestionModal
                    clickedForm={clickedForm}
                    handleRemoveModal={handleRemoveModal}
                    sect={sectionId}
                />
                 
            <div className="row">
                <div className="col-md-12 question-button-container">
                    <div className="btn-toolbar">
                        <button disabled={selSect} className="btn question-button" onClick={handleClickedForm}>Questions 
                                        <i className="mdi mdi-plus-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="message-body">
                <div className="message-content">
                    <div className="mt-4">
                        <div className={classes.main}>
                        {questObj.questionList.length >= 1 ? 
                        <Fragment>

                         {questObj.questionList.map((qst,index) => 
                        <ShowPanels key={index} qst={qst} index={index} sectionId={sectionId} ></ShowPanels>
                         )}
                        </Fragment> : <Typography className={classes.waiting}>Select a section to view questions</Typography>}
                           
                        </div>

                    </div>

                </div>

            </div>
        </div>

    )
}


export default Question;
