import React, {Component} from 'react';
import PageHeadingSection from "../../components/sections/PageHeadingSection";
import CelebrationImage from "../../assets/images/illustrations/result-celebration.svg";
import SummaryCardsSection from "./view-sections/SummaryCardsSection";
import SummaryResultCard from "./view-sections/SummaryResultCard";
import summaryResults from "./data/summaryResults";
import PageHeadingButton from "../../components/snippets/PageHeadingButton";
import SocialIconButton from "../../components/snippets/SocialIconButton";
const Helpers = require('../../../helpers/Helpers')


class Result extends Component {

    getSectionsNamesArray (questionGroupName) {
        return Object.keys(summaryResults[questionGroupName].sections);
    }

    getQuestionGroupNamesArray () {
        return Object.keys(summaryResults);
    }

    getQuestionGroup (questionGroupName) {
        return summaryResults[questionGroupName];
    }

    renderSummaryResultCards = () => {
        return this.getQuestionGroupNamesArray()
            .map((groupName, index) => {
                return (
                    <SummaryResultCard
                        key={groupName}
                        group={Helpers.titleCase(groupName)}
                        sections={this.getSectionsNamesArray(groupName)}
                        icon={this.getQuestionGroup(groupName).icon}
                        color={this.getQuestionGroup(groupName).color}
                        score={this.getQuestionGroup(groupName).score}
                    />
                )
            })
    };

    render() {
        return (
           <main>
               <PageHeadingSection
                   headingImage={CelebrationImage}
                   pageTitle={"Congratulations!"}
                   pageTitleColor={"secondary"}
                   pb={8}
               >
                   <p className="lead">You completed the test. Let’s see the result.</p>

                   <h3 className="font-weight-bolder mt-4 mt-lg-7">Here is a summary of your result</h3>

               </PageHeadingSection>
               <SummaryCardsSection>
                   {this.renderSummaryResultCards()}
               </SummaryCardsSection>
               <div className="text-center container mb-7">
                   <h5 className="font-weight-light">Our analysis shows that you are an Extroverted Learner.</h5>
                   <h4 className="font-weight-bold text-gray-800">Find out why</h4>
                   <PageHeadingButton
                       text={"Get Complete Result"}
                       color={"secondary"}
                       href={"#"}
                   />
               </div>
               <div  style={{backgroundColor: "#E5F3FF"}}>
                   <div
                       className="text-center container mb-7 pt-3 pb-3"
                   >
                       <div className="d-flex justify-content-center">
                           <span className="mr-3">
                               <i className="fas fa-share-alt fa-2x"> </i>
                           </span>
                           <p className="lead text-secondary">Share your result with friends</p>
                       </div>
                       <div className="d-flex justify-content-center">
                           <ul className="list-inline mb-0">
                               <SocialIconButton
                                   type={"facebook"}
                                   size={"sm"}
                                   title={"Like us on Facebook"}
                                   link={"#"}
                               />
                               <SocialIconButton
                                   type={"twitter"}
                                   size={"sm"}
                                   title={"Follow us on Twitter"}
                                   link={"#"}
                               />
                               <SocialIconButton
                                   type={"instagram"}
                                   size={"sm"}
                                   title={"Follow us on Instagram"}
                                   link={"#"}
                               />
                           </ul>
                       </div>
                   </div>
               </div>
           </main>
        );
    }
}

export default Result;
