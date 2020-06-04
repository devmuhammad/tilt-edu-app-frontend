import React, {useState,useEffect, createContext} from 'react';
import axios from "axios";
export const SectionContext = createContext();

export const SectionProvider = (props) => {
    const [sections, setSections] = useState([]);
    useEffect( () => {
        axios.get('https://tiltapp-api.herokuapp.com/sections').then(res => {
            setSections(res.data);
            
        }).catch( err => {
            console.log(err);
        });
    },[]);

    return (
        <SectionContext.Provider value={[sections,setSections]}>{props.children}</SectionContext.Provider>
    );
};