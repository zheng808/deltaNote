import React from 'react';
import {Link} from 'react-router-dom';

function HomeButton(){
    return (
    <Link to="/workorder"><i className="fas fa-home home-icon"></i></Link>
    );
}

export default HomeButton;