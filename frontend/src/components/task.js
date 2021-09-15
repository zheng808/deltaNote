import React, {useState, useEffect } from 'react';
import {BrowserRouter, useHistory} from 'react-router-dom';
import axios from 'axios';
import HomeButton from './hombutton';
import BackButton from './backbutton';

function Task({match}){
   const [tasks, setTasks] = useState([]);

   const history = useHistory();
   const handleRowClick = (task) => {
       history.push(`/notes/${task.id}`);
   }  

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
        <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-primary">
            <th scope="col">TaskID</th>
            <th scope="col">Label</th>
          </tr>
        </thead>
        <tbody>
        {
          tasks.map((task, index) => (
            <tr key={task.id} onClick={()=>handleRowClick(task)}>
            <td>{index}</td>
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