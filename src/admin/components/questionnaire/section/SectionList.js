import React,{useContext,useState,Fragment} from 'react';
import {SectionContext, SectionProvider} from './SectionContext';
import EditSectionModal from "./modal/EditSectionModal";
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import {SectContext} from '../Questionnaire'
import {QstContext} from '../Questionnaire'
import Loader from 'react-loader-spinner'
import { Alert, AlertTitle } from '@material-ui/lab';


const SectionList = () =>{
    // const [sectList] = useContext(SectContext);
    const [sectionList, setSectionList] = useContext(SectContext);
    const [questObj,setQuestObj] = React.useContext(QstContext);
    const [sectionId,setSectionId] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [selSection, setSelSection] = useState({})
    // const [selectedSection, setSelectedSection] = useContext(QstContext)
    const [selectedIndex, setSelectedIndex] = useState()
    const [name, setName] = useState({});
    const [loading, setLoading] = useState(false)

    

    const handleToggleClose = () => {
      setIsOpen(false);
    };
    const deleteSection = (id) => {
        // let  id = e.target.getAttribute('sectionid');
        console.log(id);
        if ( id !== 0){
            window.confirm('Are you sure?') &&
            axios.delete('https://tiltapp-api.herokuapp.com/sections/'+id).then( res => {
                // axios.get('https://tiltapp-api.herokuapp.com/sections').then(res => {
                //     setSections(res.data);
                // }).catch( err => {
                //     console.log(err);
                // });
            } ).catch(err => console.log(err));
        }
    };

    const handleListItemClick = (sectionid, index) => {
        setQuestObj({...questObj, selectedSection : sectionid})
        setLoading(true)
        setSelectedIndex(index)

        axios.get('https://tiltapp-api.herokuapp.com/sections/'+sectionid+'/questionnaires').then( res => {
            // console.log(res.data)
                if(res.status){
                    setQuestObj({...questObj, questionList:res.data })
                setLoading(false)
                }  else {
                setLoading(false)
                return (<Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Could not retrieve Questionnaires— <strong> {res.message}</strong>
              </Alert>)
                }
    
           }).catch( err => {
            setLoading(false)
                console.log(err);
        return(<Alert severity="error">Error retrieving questionnaires !</Alert>)

           });
    }


     const DisplayItems = (props) => {

        const handleToggleOpen = (e) =>{
            props.setSelSection(e)
            setIsOpen(true);
            // console.log(e)
            
            //setSectionId(e.target.getAttribute('sectionId'))
        };

        return (
            <List >
       {sectionList.map((section,index) => {
            return <ListItem button key={index} id={section.id} 
            className="pt-3 pb-3" selected={selectedIndex === index}
            onClick={() => handleListItemClick(section.id, index)}>
        
            <ListItemText primary={section.name} />
            {loading && selectedIndex === index ? <ListItemSecondaryAction>
            <Loader edge="end"
                    type="Rings"
                    color="gray"
                    height={35}
                    width={35}
                    //  timeout={3000} //3 secs
                    />
            </ListItemSecondaryAction>
            : <ListItemSecondaryAction> 
            <IconButton edge="end" onClick={() => handleToggleOpen(section)}>
            <i className="fa fa-edit" style={{fontSize:15}}></i>
            </IconButton>
            <IconButton edge="end" onClick={() => deleteSection(section.id)}>
            <i className="fa fa-trash " style={{color:"#FC8181",fontSize:15}}></i>   
                </IconButton>
                </ListItemSecondaryAction>}
                </ListItem>

            
            })
            }
            </List>
        )
    }

    return (
        
            <Fragment>
                    <EditSectionModal
                        isOpen={isOpen}
                        handleToggleClose={handleToggleClose}
                        section={selSection}

                    />
                    
                     {sectionList.length > 0 ?  <DisplayItems setSelSection={setSelSection}>

                     </DisplayItems> : <ListItemText className="mt-3 d-flex text-gray justify-content-center" primary={"Select a group"} />}
            </Fragment>
        
    );
};

export default SectionList;