import React, {Fragment} from 'react';
import Group from './group/Group';
import Section from './section/Section';
import Question from './question/Question';
import axios from "axios";



 const Questionnaire = (props) =>{
    const [sectionList, setSectionList] = React.useState([])
    const [questObj, setQuestObj] = React.useState({
        questionList:[],
        selectedSection:0
    })
    const [questionList, setQuestionList] = React.useState([])
    const [groups, setGroups] = React.useState([]);
    const [selectedSection, setSelectedSection] = React.useState(0)


    React.useEffect( () => {
        axios.get('https://tiltapp-api.herokuapp.com/groups').then(res => {
            setGroups(res.data);
        }).catch( err => {
            console.log(err);
        });
    },[]);

    const providerValues = React.useMemo(() => ([
        questionList, setQuestionList,

        selectedSection, setSelectedSection,
    ]), [questionList, selectedSection]);
    

    return (
        <Fragment>
            <div className="content-wrapper">
                <div className="email-wrapper wrapper">
                <QstContext.Provider value={ [questObj,setQuestObj]}>
                <SectContext.Provider value={[ sectionList,setSectionList]}>
                <GroupContext.Provider value={[ groups,setGroups]}>
                {props.children}
                    <div className="row align-items-stretch">
                        <div className="mail-sidebar d-none d-lg-block col-md-2 p-0 bg-white">
                            <Group/>
                        </div>
                        <Section />
                        <Question />
                    </div>
                    </GroupContext.Provider>
                    </SectContext.Provider>
                    </QstContext.Provider>
                </div>
            </div>
        </Fragment>
    );

};

 export default Questionnaire;
 export const QstContext = React.createContext();
 export const SectContext = React.createContext();
 export const GroupContext = React.createContext();
