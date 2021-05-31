import React, {useState, useEffect } from 'react';
import {Link, BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import HomeButton from './hombutton';
import BackButton from './backbutton';

function Task({match}){
   const [tasks, setTasks] = useState([]);
   useEffect(()=>{
    const fetchTasks = async () =>{   
      try{
           let id = match.params.id;
           let response = await axios.post(`/api/task/${id}`, {
              workId: id
            }).then((response)=>{
               return response;
            },(error) =>{
              console.log(error);
            })
          let tasks = await response.data;
          setTasks(tasks);
          
      }catch(err){
          console.log(err);
      }
    };
    fetchTasks(); 
    }, [match.params.id]);

   

    return (
      <BrowserRouter forceRefresh={true}>
      <div className="container">
        <div className="container-header">
          <HomeButton/>
          <BackButton/>
        </div>
        <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">TaskID</th>
            <th scope="col">Label</th>
          </tr>
        </thead>
        <tbody>
        {
          tasks.map(task => (
            <tr key={task.id}>
            <td><Link to={`/notes/${task.id}`}>{task.id}</Link></td>
            <td>{task.label}</td>
         </tr>
         ))
        }

       </tbody>
        </table>
      </div>
      </BrowserRouter>
    );
}

export default Task;