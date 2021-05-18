import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { Redirect, Route } from "react-router";

async function loginUser(credentials) {
    return fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(function(response){
       if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
        }
        response.json().then(function(data) {
            
        });
    });
   }

   
export default function Login ({ setToken, props }){
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

 const handleSubmit = async e => {
    e.preventDefault();
    const { history } = this.props;
    try{
        const token = await loginUser({
            username,
            password
          });
          setToken(token);
    }catch (e) {
        alert(e.message);
      }  
  }
        return(
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={handleSubmit} className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="username" name="user" onChange={e => setUserName(e.target.value)}/>
                        </div>
                        <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="password" name="password" onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className="login-button">
                            <input type="submit" value="Login" className="btn-login" />
                        </div>
                    </form>
                </div>
            </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
