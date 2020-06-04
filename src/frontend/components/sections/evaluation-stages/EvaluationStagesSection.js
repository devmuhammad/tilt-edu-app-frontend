import React from 'react';
import EvaluationStagesCard from "./EvaluationStagesCard";
import surveys from "../../../assets/images/illustrations/survey.svg"
import result from "../../../assets/images/illustrations/result.svg"
import recommendations from "../../../assets/images/illustrations/recommendations.svg"

const EvaluationStagesSection = () => {
    return (
        <div className="section-header py-0 pt-8 pt-lg-5">
            <div className="container">
                <div className="row mt-n9">
                    <EvaluationStagesCard
                        badgeColor={"secondary"}
                        badgeText={"Survey"}
                        heading={"Complete our Questionnaire"}
                        info={"Answer the questions on the TILT online testing platform"}
                        image={surveys}
                    />
                    <EvaluationStagesCard
                        badgeColor={"primary"}
                        badgeText={"Result"}
                        heading={"Get the result of the Test"}
                        info={"Download the analysis from the platform based on your answers"}
                        image={result}
                    />
                    <EvaluationStagesCard
                        badgeColor={"tertiary"}
                        badgeText={"Recommendations"}
                        heading={"Follow our expert Recommendations"}
                        info={"Start making adjustments based on the recommendations you find in the result."}
                        image={recommendations}
                    />
                </div>
            </div>
        </div>
    );
};

export default EvaluationStagesSection;
