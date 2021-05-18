import React, { useState } from 'react';
import {Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import WorkOrder from './components/workorder';
import Task from './components/task';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  if(!sessionStorage.getItem('token')){
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  } 
  
}

const App = () => {
     
  const token = getToken();
   if(!token) {
    return ( <div className="App">
    <header className="App-header">
      <Switch>
      <Route path="/login" setToken={setToken} component={Login}/>
      </Switch>
    </header>
    </div>)
  }
    return (
    <BrowserRouter>
    <div className="App">
          <header className="App-header">
            <Switch>
            <Route path="/login" setToken={setToken} component={Login}/>
            <Route path="/"  component={WorkOrder}/>
            </Switch>
          </header>
          </div>
    </BrowserRouter>    
      )
  }
    /*
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
          <Switch>
            <Route path="/workorder">
              <WorkOrder />
            </Route>
            <Route path="/task">
              <Task />
            </Route>
          </Switch>
        </BrowserRouter>
        </header>
      </div>
      */
    //)


export default App;
