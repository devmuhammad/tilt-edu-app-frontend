import React, { Fragment } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold,
    },
    form:{
        width:'100%',
        display:'block',
        padding:'1rem'
    },
    selectBtn:{
        padding: '0.5rem 1.2rem',

    },
}));


const Question = () => {
    const classes = useStyles();

    return (
        <div className="mail-view question-container d-none d-md-block col-md-9 col-lg-7 bg-white">
            <div className="row">
                <div className="col-md-12 question-button-container">
                    <div className="btn-toolbar">
                        <button className="btn question-button btn-success">Questions
                                        <i className="mdi mdi-plus-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="message-body">
                <div className="message-content">
                    <div className="mt-4">
                        <div className={classes.root}>
                        <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>I practice and study with my most challenging subject(s) for 7 hours a week</Typography>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                                <select className={classes.selectBtn}>
                                    <option>Score</option>
                                    <option>20%</option>
                                    <option>40%</option>
                                    <option>60%</option>
                                    <option>80%</option>
                                    <option>100%</option>
                                </select>
                                </ExpansionPanelDetails>

                                <ExpansionPanelDetails>
                                    <div className={classes.form}>
                                       <form >
                                            <h6><strong>Edit this question</strong></h6>
                                            <div className={"form-group"}>
                                                <textarea className={"form-control"} rows={8} cols={80}></textarea>
                                            </div> 
                                        </form> 
                                    </div>

                                    <div>
                                        <form >
                                            <h6><strong>Comments per score</strong></h6>
                                            <div className={"form-group"}>
                                                <textarea className={"form-control"} rows={8} cols={80}></textarea>
                                            </div> 
                                        </form>  
                                    </div>
                                
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>I practice and study with my most challenging subject(s) for 7 hours a week</Typography>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                                <select className={classes.selectBtn}>
                                <option>Score</option>
                                    <option>20%</option>
                                    <option>40%</option>
                                    <option>60%</option>
                                    <option>80%</option>
                                    <option>100%</option>
                                </select>
                                </ExpansionPanelDetails>

                                <ExpansionPanelDetails>
                                    <div className={classes.form}>
                                       <form >
                                            <h6><strong>Edit this question</strong></h6>
                                            <div className={"form-group"}>
                                                <textarea className={"form-control"} rows={8} cols={80}></textarea>
                                            </div> 
                                        </form> 
                                    </div>

                                    <div>
                                        <form >
                                            <h6><strong>Comments per score</strong></h6>
                                            <div className={"form-group"}>
                                                <textarea className={"form-control"} rows={8} cols={80}></textarea>
                                            </div> 
                                        </form>  
                                    </div>
                                
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>

                    </div>

                </div>

            </div>
        </div>

    )
}


export default Question;
