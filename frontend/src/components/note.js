import React, {useState, useEffect} from 'react';
import axios from 'axios';
import HomeButton from './hombutton';
import BackButton from './backbutton';


function Notes({match}){
    const [notes, setNotes] = useState([]);
    const [new_note, saveNotes] = useState("");
    
    const handleChange =  e => {
        const value = e.target.value;
        saveNotes(value);
    }

    const saveNote = async () =>{
        try{
            let task_id = match.params.id;
            let useName = sessionStorage.getItem('userName');
            let newDate = new Date().toISOString().slice(0, 19).replace('Z','').replace('T', ' ');
            
            await axios.post("/api/notes/saveNotes", {
                text: new_note,
                created_time: newDate,
                owner: useName,
                task_id: task_id
            })
            .then((result)=>{
               console.log(result);
               if(result.status!==200){
                   console.log('bad request')
               }
               setNotes([...result.data]);
               
            }).catch((err) => console.log(err))
        }catch(e) {
            alert(e.message);
        }  
    }

    const handleSubmit = async e => {
        e.preventDefault(); 
        saveNote();
    }
    
    useEffect(()=>{
        const fetchNotes = async () =>{   
            try{
                 let id = match.params.id;
                 let response = await axios.post(`/api/notes/${id}`,{
                    task_id:id
                 }).then((response)=>{
                     return response;
                  },(error) =>{
                    console.log(error);
                  })
                
                let notes = await response.data;
                setNotes(notes);
            }catch(err){
                console.log(err);
            }
          };
          fetchNotes();
    }, [match.params.id]);
    
    return (
        <div className="container">
            <div className="container-header">
                <HomeButton/>
                <BackButton/>
            </div>
            <form onSubmit={handleSubmit} className="write-note-section"> 
            <div className="form-group">
                <textarea className="form-control" id="notes-editor" name="notes" onChange={handleChange}></textarea>
                <div className="save-button-wrapper">
                <button type="submit" className="btn btn-primary save_note">Save Note</button>
                </div>
            </div>
            </form>

            <div className="notes-section">
            {   
          
                notes.map(note =>(
                <div key={note.id} className="detail-section">
                 <p >{new Date(note.date_created).toLocaleString()} created by {note.owner}</p>
                <textarea disabled defaultValue={note.text} className="note-textarea"></textarea>
                </div>
                ))
            }
            </div>
        </div>
    );
}

export default Notes;