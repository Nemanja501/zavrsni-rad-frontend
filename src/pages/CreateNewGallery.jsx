import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../contexts/userContext'
import GalleriesService from '../services/galleries.sevice';
import { useNavigate } from 'react-router-dom';

const defaultData = {
  title: '',
  description: '',
  pictures: ''
}
function CreateNewGallery() {
  const {loggedInUser, setLoggedInUser} = useContext(userContext);
  const [urlInputs, setUrlInputs] = useState(['']);
  const navigate = useNavigate();
  const [errors, setErrors] = useState(defaultData);
  const [newGallery, setNewGallery] = useState({
    title: '',
    description: '',
    pictures: [],
    user_id: loggedInUser.id
  })

  async function handleSubmit(){
    try{
      const data = await GalleriesService.create(newGallery);
      if(data){
        navigate("/my-galleries");
      }
    }catch(err){
      console.log(err.response.data.errors);
      const _errors = err.response.data.errors;
      if(_errors){
        setErrors({
          title: _errors?.title || '',
          description: _errors?.description || '',
          pictures: _errors?.pictures?.join(' ') || '',
        })
      }
    }
  }

  return (
    <div>
      <h1>Create new gallery</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={newGallery.title} onChange={(e) =>{ setNewGallery({...newGallery, title: e.target.value}); setErrors(defaultData) }}/>
          {errors.title && <div className="alert alert-danger" role="alert">{errors.title}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={newGallery.description} onChange={(e) =>{ setNewGallery({...newGallery, description: e.target.value}); setErrors(defaultData) }}/>
          {errors.description && <div className="alert alert-danger" role="alert">{errors.description}</div>}
        </div>
        {urlInputs.map((input, index)=>{
          return (<div className="mb-3" key={index}>
          <label className="form-label">Picture URL</label>
          <input type="text" className="form-control" onChange={(e) =>{ setNewGallery({...newGallery, pictures: [...newGallery.pictures, e.target.value]}); setErrors(defaultData) }}/>
        </div>);
        })}
        {errors.pictures && <div className="alert alert-danger" role="alert">{errors.pictures}</div>}
        <button type="button" className="btn btn-secondary" onClick={()=>{ setUrlInputs([...urlInputs, '']); setErrors(defaultData) }}>Add another url</button>
        <br/>
        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
    </form>
    </div>
  )
}

export default CreateNewGallery