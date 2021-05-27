import React, {useState, useEffect } from 'react';
import axios from 'axios';

function Task({match}){
   const [tasks, setTasks] = useState([]);
   useEffect(()=>{
    fetchTasks(); 
    }, []);

   const fetchTasks = async () =>{   
        try{
           let params = match.params;
           let id = params.id;
           let response = await axios.post(`/api/task/${id}`, {
              workId: id
            }).then((response)=>{
               return response;
            },(error) =>{
              console.log(error);
            })
          let tasks = await response.data;
          console.log(tasks);
          setTasks(tasks);
          
      }catch(err){
          console.log(err);
      }
   };

    return (
      <div className="container">
        <div className="task-header">
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
            <td>{task.id}</td>
            <td>{task.label}</td>
         </tr>
         ))
        }

       </tbody>
        </table>
      </div>
      
    );
}

export default Task;