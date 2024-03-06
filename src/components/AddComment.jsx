import React, { useContext, useState } from 'react'
import { userContext } from '../contexts/userContext';
import CommentService from '../services/comment.service';

function AddComment({galleryId}) {
  const {loggedInUser, setLoggedInUser} = useContext(userContext);
  const [newComment, setNewComment] = useState({
    content: '',
    user_id: loggedInUser.id,
    gallery_id: galleryId

  });

  async function handleSubmit(){
    try{
      const data = await CommentService.addComment(newComment);
      if(data) window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
        <h3>Add comment:</h3>
        <div className="mb-3">
            <textarea className="form-control" onChange={(e) => setNewComment({...newComment, content: e.target.value})}/>
        </div>
        <button type='button' className='btn btn-primary' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddComment