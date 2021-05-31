import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import './App.css';
import Login from './components/login';
import WorkOrder from './components/workorder';
import Task from './components/task';
import useToken from './helper/useToken';
import Notes from './components/note';
import {UserContext} from './helper/UserContext';

const App = () => {
     
  const { token, setToken } = useToken();
   if(!token) {
    return ( <div className="App">
    <header className="App-header">
      <Login setToken={setToken}/>
    </header>
    </div>)
  }

    return (
    <BrowserRouter>
    <div className="App">
              <div className="container-fluid">
                <Switch>
                <Route path="/workorder">
                <WorkOrder />
                </Route>
                <UserContext.Provider>
                <Route path="/task/:id" component={Task}>
                </Route>
                <Route path="/notes/:id" component={Notes}>
                </Route>
                </UserContext.Provider>
                </Switch>
              </div>
          </div>
    </BrowserRouter>    
      )
  }


export default App;
