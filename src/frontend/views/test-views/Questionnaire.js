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
const Helpers = require('../../../helpers/Helpers');

class Questionnaire extends Component {
    state = {
        questionGroups: null,
        activeGroup: {name: null, index: 0},
        activeColor: null,
        completedGroups: [],
        activeSection: {name: null, index: 0},
        sections: [],
        completedQuestions: [],
        progress: 0,
        activeQuestions: [],
    };

    componentDidMount() {
        this.setState(
            {
                questionGroups: this.getQuestionGroupNames(),
                activeGroup: {name: this.getQuestionGroupNames()[0], index: 0},
                activeColor: this.getQuestionGroup(this.getQuestionGroupNames()[0]).color,
                sections: this.initialSections(),
                activeSection: {
                    name: this.initialSections()[0],
                    index: 0
                },
                activeQuestions: this.getNewQuestions(
                    this.getQuestionGroupNames()[0],
                    this.initialSections()[0]
                )
            }
        );
    }

    initialSections = () => this.getSectionsArray(this.getQuestionGroupNames()[0]);

    getAllQuestionsCount () {
        let questionsCount = 0;
        this.getQuestionGroupNames().forEach(group => {
            let sections = this.getSections(group);
            for (let section in sections) {
                if (sections.hasOwnProperty(section)) {
                    for (let question of sections[section]) {
                        questionsCount++;
                    }
                }
            }
        });
        return questionsCount
    }

    //Update the list of answered questions!
    updateCompletedQuestions = (questionID, answer) => {
        const completedQuestions = this.state.completedQuestions
            .filter((question, index) => question.id !== questionID);
        completedQuestions.push({id: questionID, answer: answer});
        this.setState({completedQuestions: completedQuestions})
    };

    setProgress () {
        const totalAnswered = this.state.completedQuestions.length;
        const totalQuestions = this.getAllQuestionsCount();
        const progress = (totalAnswered/totalQuestions)*100;
        this.setState({progress: Math.round(progress)})
    }

    setActiveSection (activeGroupName, newActiveSectionName) {
        let newSectionIndex = 0;
        if (this.state.activeSection.index < this.state.sections.length - 1) {
            newSectionIndex = this.state.activeSection.index + 1
        }
        this.setState({
            activeSection: {
                name: newActiveSectionName,
                index: newSectionIndex
            }
        });
    }

    setActiveGroup (activeGroupName) {
        this.setState({
            activeGroup: {
                name: activeGroupName,
                index: this.state.activeGroup.index + 1
            },
            activeColor: this.getQuestionGroup(activeGroupName).color
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
        return this.getSections(activeGroupName)[activeSectionName]
    }

    getAllQuestions () {
        return questions;
    }

    getQuestionGroup (questionGroupName) {
        return this.getAllQuestions()[questionGroupName];
    }

    getQuestionGroupNames () {
        return Object.keys(this.getAllQuestions());
    }

    getSections (questionGroupName) {
        return this.getQuestionGroup(questionGroupName).sections;
    }

    getSectionsArray (questionGroup) {
        return Object.keys(this.getSections(questionGroup))
    }

    buttonGroupColor = (questionGroup) => {
        if (this.state.activeGroup || this.state.completedGroups.includes(questionGroup)) {
            if (
                this.state.activeGroup.name === questionGroup ||
                this.state.completedGroups.includes(questionGroup)) {
                return this.getAllQuestions()[questionGroup].color
            }
        }
        return "gray-300"
    };

    handleNext = (e) => {
        e.preventDefault();
        let activeSection = this.state.sections[this.state.activeSection.index + 1];
        let activeGroupName = this.state.activeGroup.name;
        if (this.state.activeSection.index < this.state.sections.length - 1) {
            this.setActiveSection(activeGroupName, activeSection);
            this.setActiveQuestions(activeGroupName, activeSection);
        } else {
            const currentCompletedGroups = this.state.completedGroups;
            currentCompletedGroups.push(activeGroupName);
            this.setState({
                completedGroups: currentCompletedGroups
            });
            activeGroupName = this.state.questionGroups[this.state.activeGroup.index + 1];
            activeSection = this.getSectionsArray(activeGroupName)[0];
            console.log(activeGroupName, activeSection);
            this.setActiveGroup(activeGroupName);
            this.setActiveSection(activeGroupName, activeSection);
            this.setActiveQuestions(activeGroupName, activeSection);
        }
    };

    handleAnswer = (questionID, answer) => {
        this.updateCompletedQuestions(questionID, answer);
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
                        <i className={`far fa-3x fa-${this.getQuestionGroup(group).icon} pl-2 pr-2`}> </i>
                    </span>
                    {group.toUpperCase()}
                </Button>
            )
        })
    };

    renderSections = () => {
        return this.state.sections ?
            this.state.sections.map((section, index) => (
                <Step key={section + index}>
                    <StepLabel>{Helpers.titleCase(section)}</StepLabel>
                </Step>
            )) :
            this.showSpinner("lg")
    };

    renderQuestions = () => {
        const activeGroupName = this.state.activeGroup.name;
        const activeSectionName = this.state.activeSection.name;
        console.log(activeGroupName, this.state.activeSection);
        if (activeGroupName && activeSectionName) {
            const activeQuestion =
                this.getNewQuestions(activeGroupName, activeSectionName);
            return activeQuestion.map((questionObject, index) => (
                <QuestionItem
                    key={index}
                    question={questionObject.question}
                    color={this.state.activeColor}
                    onAnswer={(value) => this.handleAnswer(questionObject.id, value)}
                />
            ))
        } else {
            return this.showSpinner()
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
                            activeStep={this.state.activeSection.index}
                            alternativeLabel
                        >
                            {this.renderSections()}
                        </Stepper>
                    </div>
                </Section>

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
                </div>
            </main>
        );
    }
}

export default Questionnaire;
