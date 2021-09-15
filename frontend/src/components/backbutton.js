import React from 'react';
import {useHistory} from "react-router-dom";

function BackButton(){
    const history = useHistory();
    return (
        <i className="fas fa-arrow-circle-left left-button" onClick={() => history.goBack()}></i>
    ); 
}

export default BackButton;