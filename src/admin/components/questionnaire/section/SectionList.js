import React,{useContext,useState,Fragment} from 'react';
import {SectionContext, SectionProvider} from './SectionContext';
import EditSectionModal from "./modal/EditSectionModal";
import axios from 'axios';

const SectionList = () =>{
    const [sections,setSections] = useContext(SectionContext);
    const [sectionId,setSectionId] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [selSection, setSelSection] = useState({})

    const [name, setName] = useState({});

    

    const handleToggleClose = () => {
      setIsOpen(false);
    };
    const deleteSection = (id) => {
        // let  id = e.target.getAttribute('sectionid');
        console.log(id);
        if ( id !== 0){
            window.confirm('Are you sure?') &&
            axios.delete('https://tiltapp-api.herokuapp.com/sections/'+id).then( res => {
                axios.get('https://tiltapp-api.herokuapp.com/sections').then(res => {
                    setSections(res.data);
                }).catch( err => {
                    console.log(err);
                });
            } ).catch(err => console.log(err));
        }
    };


     const DisplayItems = (props) => {

        const handleToggleOpen = (e) =>{
            props.setSelSection(e)
            setIsOpen(true);
            // console.log(e)
            
            //setSectionId(e.target.getAttribute('sectionId'))
        };

        return (
        sections.map((section,index) => {
            return <li key={index}  className="mail-list">
                <div className="content">
                    <p className="sender-name"> {section.name} </p>
                </div>
                <div className="details">
                    <span   onClick={() => handleToggleOpen(section)} ><i className="fa fa-edit pr-1"></i></span>
                <span onClick={() => deleteSection(section.id)} className=" text-red"><i className="fa fa-trash  pl-1"></i></span>       
                </div>
            </li>
            
            })
        )
    }

    return (
        
            <Fragment>
                    <EditSectionModal
                        isOpen={isOpen}
                        handleToggleClose={handleToggleClose}
                        section={selSection}

                    />
                <ul className="menu-items">
                        <DisplayItems setSelSection={setSelSection}></DisplayItems>
                </ul>
            </Fragment>
        
    );
};

export default SectionList;