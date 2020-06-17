import React, {Component} from 'react';
import {Button, Spinner} from "react-bootstrap";
import {Stepper, Step, StepLabel} from "@material-ui/core";
import questions from "./data/questions";
import QuestionGroupSection from "./view-sections/QuestionGroupSection";
import PageHeadingSection from "../../components/sections/PageHeadingSection";
import Section from "./view-sections/Section";
import ProgressBar from "./view-sections/ProgressBar";
import QuestionItem from "./view-sections/QuestionItem";
import PageHeadingButton from "../../components/snippets/PageHeadingButton";
import {Link} from "react-router-dom";
import axios from 'axios';

const Helpers = require('../../../helpers/Helpers');


class Questionnaire extends Component {
    state = {
        questionGroups: null,
        activeGroup: {name: null, index: 0},
        activeColor: null,
        completedGroups: [],
        activeSection: {name: null, index: 0},
        sections: [],
        loading: false,
        completedQuestions: [],
        progress: 0,
        activeQuestions: [],
        allquestions:[]

    };

   async componentDidMount() {
        await this.getQuestns()

        this.setState(
            {
                questionGroups: this.getQuestionGroupNames(),
                activeGroup: {name: this.getQuestionGroupNames()[0], index: 0},
                activeColor: this.getQuestionGroupNames()[0].color,
                sections: this.initialSections(),
                activeSection: {
                    name: this.initialSections()[0] && this.initialSections()[0] ,
                    index: 0,
                    questions: this.initialSections()[0] && this.initialSections()[0].questions 
                },
                activeQuestions: this.getNewQuestions(
                    this.getQuestionGroupNames()[0],
                    this.initialSections()[0]
                )
            }
        );
    }

    async getQuestns (){
        await  axios.get('https://tiltapp-api.herokuapp.com/test/get-questions').then( res => {
            // console.log(res.data)
                if(res.status){
                    console.log(res.data)
                    this.setState({loading:false})
                    this.setState({allquestions: res.data})

                }  else {
                this.setState({loading:false})
                alert("Could not retrieve questions, Please reload")
                }
    
           }).catch( err => {
            this.setState({loading:false})
                console.log(err);
                alert("Error loading questions")
           });
    }

    initialSections = () => { return this.getSectionsArray(this.getQuestionGroupNames()[0]) }

    getAllQuestionsCount () {
        let questionsCount = 0;
        this.getQuestionGroupNames().forEach(group => {
            let sections = this.getSections(group);
            for (let section in sections) {
                if (sections.hasOwnProperty(section)) {
                    // for (let question of sections[section]) {
                        questionsCount++;
                    }
                // }
            }
        });
        return questionsCount
    }

    //Update the list of answered questions!
    updateCompletedQuestions = (questionID, answer) => {
        const completedQuestions = this.state.completedQuestions
            .filter((question, index) => question.id !== questionID);
        completedQuestions.push({questionnaire_id: questionID, weight_point_id: answer});
        this.setState({completedQuestions: completedQuestions})
    };

    setProgress () {
        const totalAnswered = this.state.completedQuestions.length;
        const totalQuestions = this.getAllQuestionsCount();
        const progress = (totalAnswered/totalQuestions)*100;
        this.setState({progress: Math.round(progress)})
        console.log(this.state.progress)
    }

    setActiveSection (activeGroupName, newActiveSectionName) {
        let newSectionIndex = 0;
        if (this.state.activeSection.index < this.getSections(activeGroupName).length - 1) {
            newSectionIndex = this.state.activeSection.index + 1
        }
        console.log('question Index', newSectionIndex)
        this.setState({
            activeSection: {
                name: newActiveSectionName,
                index: newSectionIndex,
                questions: this.getSections(activeGroupName)[newSectionIndex].questions
            }
        });
    }

    setActiveGroup (activeGroupName) {
        this.setState({
            activeGroup: {
                name: activeGroupName,
                index: this.state.activeGroup.index + 1
            },
            activeColor: this.getQuestionGroup(this.state.activeGroup.index + 1).color
        });
    }

    setNewSections (activeGroup) {
        this.setState({
            sections: this.getSections(activeGroup)
        })
    }

    setActiveQuestions (activeGroupName, activeSectionName) {
        this.setState({activeQuestions: this.getNewQuestions(activeGroupName, activeSectionName)});
    }

    getNewQuestions (activeGroupName, activeSectionName) {
        // return this.getSections(activeGroupName)[activeSectionName]
        if(activeSectionName){
        const questions = activeSectionName.questions
        return questions
        }
    }

     getAllQuestions () {
        return this.state.allquestions;
      
    }

    getQuestionGroup (questionGroupName) {
        // console.log(questionGroupName)
        return this.getAllQuestions()[questionGroupName];
    }

    getQuestionGroupNames () {
        
        return this.getAllQuestions();
    }

    getSections (questionGroupName) {
        return questionGroupName.sections;
    }

    getSectionsArray (questionGroup) {
        return this.getSections(questionGroup)
    }

    buttonGroupColor = (questionGroup) => {
        
        if (this.state.activeGroup ){
            // || this.state.completedGroups.includes(questionGroup)) {
            if (
                this.state.activeGroup.name.name === questionGroup.name){
                // this.state.completedGroups.includes(questionGroup)) {
                return questionGroup.color
            }
        }
        return "gray-300"
    };

    handleNext = (e) => {
        e.preventDefault();
        // let actvSectionIndx = 0
        // if (this.state.sections.length === 0){
        //     this.setState({activeSection: {index: 0}})

        // }
        let activeGroupName = this.state.activeGroup.name;

        let activeSection = this.getSections(activeGroupName)[this.state.activeSection.index + 1];
        if (this.state.activeSection.index < this.getSections(activeGroupName).length - 1) {
            this.setActiveSection(activeGroupName, activeSection);
            this.setActiveQuestions(activeGroupName, activeSection);
        } else {
            const currentCompletedGroups = this.state.completedGroups;
            currentCompletedGroups.push(activeGroupName);
            this.setState({
                completedGroups: currentCompletedGroups
            });
            activeGroupName = this.state.questionGroups[this.state.activeGroup.index + 1];
            activeSection = this.getSectionsArray(activeGroupName)[this.state.activeSection.index + 1];
            console.log(activeGroupName, activeSection);
            this.setActiveGroup(activeGroupName);
            this.setActiveSection(activeGroupName, activeSection);
            this.setActiveQuestions(activeGroupName, activeSection);
        }
    };

    handleAnswer = async (questionID, answer) => {

        await this.updateCompletedQuestions(questionID, answer);
         this.setProgress();

    };

    renderQuestionGroups = () => {
        const questionGroups = this.state.questionGroups;
        return questionGroups.map((group, index) => {
            return (
                <Button
                    key={index}
                    variant={this.buttonGroupColor(group)}
                >
                    <span>
                        <i className={`far fa-3x fa-${group.icon} pl-2 pr-2`}> </i>
                    </span>
                    {group.name.toUpperCase()}
                </Button>
            )
        })
    };

    renderSections = () => {
        const grpSect = this.state.activeGroup.name;

        if(grpSect != null){ 
        return grpSect.sections.length >= 1 ?
            grpSect.sections.map((section, index) => (
                <Step key={section + index} >
                    <StepLabel >{Helpers.titleCase(section.name)}</StepLabel>
                </Step>
            )) : <span style={{fontSize:20,fontWeight:"700",color:"grey", justifySelf:"center"}}>No Section for this Group</span>
            }else return <span style={{fontSize:20,fontWeight:"700",color:"grey", justifySelf:"center"}}>No Section for this Group</span>
    };

    renderQuestions = () => {
        const activeGroupName = this.state.activeGroup.name;
        const activeSectionName = this.state.activeSection.name;
        console.log(activeSectionName)
        // console.log(activeGroupName, this.state.activeSection);
        if( activeSectionName != undefined && activeSectionName != null){
        if (activeGroupName && activeSectionName.questions.length >= 1) {
            
            const activeQuestion = this.state.activeSection.name.questions
                // this.getNewQuestions(activeGroupName, activeSectionName);
            return activeQuestion.map((questionObject, index) => (
                <QuestionItem
                    key={index}
                    question={questionObject.question}
                    weight_points={questionObject.weight_points}
                    color={this.state.activeColor}
                    onAnswer={(value) => this.handleAnswer(questionObject.questionnaire_id, value)}
                />
            ))
        } else {
            return <span style={{fontSize:20,fontWeight:"700",color:"grey",marginLeft:20, justifySelf:"center"}}>No Questions in this section</span>
        }
    }else {
        return <span style={{fontSize:20,fontWeight:"700",color:"grey",marginLeft:20, justifySelf:"center"}}>No Questions in this section</span>
    }
    };

    showSpinner = (size = "lg", color = "primary") => (
        <Spinner
            animation="grow"
            size={size}
            aria-hidden="true"
            variant={color}
        />
    );

    render () {
        console.log(this.state.completedQuestions);
        return (
            <main>
                <PageHeadingSection
                    pageTitle={"TILT TEST"}
                    pageTitleColor={"gray"}
                    pt={0}
                    pb={7}
                >
                    <div className="alert alert-tertiary">
                        <h4 className="text-bold text-white m-0">Please answer every question honestly</h4>
                    </div>

                </PageHeadingSection>
                <QuestionGroupSection>
                    {
                        this.state.questionGroups ?
                            this.renderQuestionGroups() :
                            this.showSpinner("lg")
                    }
                </QuestionGroupSection>

                <ProgressBar
                    progress={this.state.progress}
                    color={this.state.activeColor}
                />

                <Section>
                    <div className="w-100" >
                        <Stepper
                            activeStep={this.state.activeSection && this.state.activeSection.index}
                            alternativeLabel
                        >
                            {this.renderSections()}
                        </Stepper>
                    </div>
                </Section>
                {this.state.loading ? this.showSpinner("lg") :
                <div className="mb-10 mt-5">
                    <Section>
                        {this.renderQuestions()}
                        <div className="container d-flex justify-content-center">
                            <PageHeadingButton
                                icon={"fa-arrow-right"}
                                text={"Next"}
                                color={this.state.activeColor}
                                onClick={(e) => this.handleNext(e)}
                            />
                        </div>
                        <div className="container d-flex justify-content-center mt-8">
                            <Link to={"/test/summary-result"} className={"lead"}>Get Result</Link>
                        </div>
                    </Section>
                </div>}
            </main>
        );
    }
}

export default Questionnaire;
