import React from "react";
import axios from 'axios';



const DeleteSection = (props) => {
    axios.delete('https://tiltapp-api.herokuapp.com/sections/'+props.id).then( res => console.log(res) ).catch(err => console.log(err));
};

export default DeleteSection;