
import noteContext from '../context/notes/noteContext';
import React, { useContext,useState } from 'react'
import Alert from './Alert';

const AddNote = ({ showAlert }) => {
    const context = useContext(noteContext); 
    const { notes, addNote} = context;
    
    const[note,setNote] = useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        showAlert("Note added successfully", "success");
    }
    
    const onChange=(e)=>{
        setNote({...note,[e.target.name] : e.target.value})
    }
  return (
    <div>
         <div className="container my-3">
      <h1 className="my-3">Welcome to iNotebook</h1>
      <h1>Add Notes</h1>
        <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title}  onChange={onChange}  minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="description"  name="description" value={note.description} onChange={onChange}  minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="tag"  name="tag" value={note.tag} onChange={onChange}  minLength={5} required/>
            </div>
           
            <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
        </div>
      
    </div>
  )
}

export default AddNote
