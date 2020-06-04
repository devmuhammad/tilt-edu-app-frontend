import React, {useState,useEffect, createContext} from 'react';
import axios from "axios";
export const GroupContext = createContext();

export const GroupProvider = (props) => {
    const [groups, setGroups] = useState([]);
    useEffect( () => {
        axios.get('https://tiltapp-api.herokuapp.com/groups').then(res => {
            setGroups(res.data);
        }).catch( err => {
            console.log(err);
        });
    },[]);

    return (
        <GroupContext.Provider value={[groups,setGroups]}>{props.children}</GroupContext.Provider>
    );
};