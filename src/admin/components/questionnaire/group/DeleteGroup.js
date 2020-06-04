import React from "react";
import axios from 'axios';



const DeleteGroup = (props) => {
    axios.delete('https://tiltapp-api.herokuapp.com/groups/'+props.id).then( res => console.log(res) ).catch(err => console.log(err));
};

export default DeleteGroup;