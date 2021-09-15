import React, {useState, useEffect} from 'react';
import axios from 'axios';
import HomeButton from './hombutton';
import BackButton from './backbutton';


function Notes({match}){
    const [notes, setNotes] = useState([]);
    const [new_note, saveNotes] = useState("");
    const [file, setImage] = useState('');
    const [uploadedFile, setUploadedFile] = useState({});

    const handleChange =  e => {
        const value = e.target.value;
        saveNotes(value);
    }

    //file load
    const handleFileChange = e =>{
        setImage(e.target.files[0]);
    }

    const upload = async() =>{
        const formData = new FormData();
        let task_id = match.params.id;
        formData.append('file', file);
        try {
        await axios.post('/api/notes/uploadImage', formData,{
        }).then((res)=>{
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
        }).catch((err) => console.log(err))
        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    const handleUpload = async e =>{
        e.preventDefault();
        upload();
    };

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
               if(result.status!==200){
                   console.log('bad request');
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
            <div className="row">
                <form onSubmit={handleUpload}>
                    <input type="file" name="file" onChange={handleFileChange}></input>
                    <button type="submit" className="btn btn-primary">Upload Image</button>
                </form>
            </div>
            {uploadedFile ? (
                <div className='row mt-5'>
                <div className='col-md-6 m-auto'>
                    <h3 className='text-center'>{uploadedFile.fileName}</h3>
                    <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                </div>
                </div>
            ) : null}
            <div className="row">
            <form  onSubmit={handleSubmit} className="write-note-section"> 
            <div className="form-group col-sm-12" >
                <textarea className="form-control" id="notes-editor" name="notes" onChange={handleChange}></textarea>
                <div className="save-button-wrapper">
                <button type="submit" className="btn btn-primary save_note">Save Note</button>
                </div>
            </div>
            </form>
            </div>
            <div className="row">
            <div className="notes-section">
            {   
          
                notes.map(note =>(
                <div key={note.id} className="detail-section col-sm-12">
                 <p >{new Date(note.date_created).toLocaleString()} created by {note.owner}</p>
                <textarea disabled defaultValue={note.text} className="note-textarea " row={3}></textarea>
                </div>
                ))
            }
            </div>
            </div>
        </div>
    );
}

export default Notes;