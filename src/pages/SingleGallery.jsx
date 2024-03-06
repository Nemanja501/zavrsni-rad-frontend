import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import GalleriesService from '../services/galleries.sevice';
import AddComment from '../components/AddComment';
import { userContext } from '../contexts/userContext';
import CommentService from '../services/comment.service';


function SingleGallery() {
  const {id} = useParams();
  const [gallery, setGallery] = useState({});
  const galleryDate = formatDate(gallery.created_at);
  const {loggedInUser, setLoggedInUser} = useContext(userContext);
  const navigate = useNavigate();
  

  useEffect(()=>{
    fetchSingleGallery();
  }, [])
  
  async function fetchSingleGallery(){
    try{
      const data = await GalleriesService.getById(id);
      if(data){
        setGallery(data.data);
      }
    }catch(err){  
      console.log(err);
    }
  }

  function formatDate(dateString){
    const date = new Date(dateString);
    return date.getDate() +  '/' + date.getMonth() + '/' + date.getFullYear();
  }

  async function deleteComment(id){
    try{
      if(window.confirm("Do you want to delete this comment?")){
        const data = await CommentService.deleteComment(id);
        if(data) window.location.reload();
      }
    }catch(err){
      console.log(err)
    }
  }

  async function deleteGallery(id){
    try{
      if(window.confirm("Do you want to delete this gallery?")){
        const data = await GalleriesService.delete(id);
        if(data) navigate("/my-galleries");
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <h1>{gallery.title}</h1>
      <h4>Author: <Link to={`/authors/${gallery?.user?.id}`} style={{ textDecoration: 'none', color: 'white' }}>{gallery?.user?.first_name} {gallery?.user?.last_name}</Link></h4>
      <h5>Created at: {galleryDate}</h5>
      <p>{gallery.description}</p>
      {loggedInUser.id === gallery?.user?.id && <button type="button" className="btn btn-danger" onClick={() => deleteGallery(id)}>Delete gallery</button>}
      <div id="carousel" className="carousel slide">
        <div className="carousel-inner">
          {gallery.pictures && <div className="carousel-item active">
            <img src={gallery?.pictures[0]} className="d-block w-100" alt="..." />
          </div>}
          {gallery?.pictures?.slice(1).map((picture, index)=>{
            return <div className="carousel-item" key={index}>
              <img src={picture} className="d-block w-100" alt="..." />
            </div>
          })}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {loggedInUser && <AddComment galleryId={id}/>}
      <h3>Comments:</h3>
      <ul className="list-group list-group-flush">
        {gallery?.comments?.map((comment)=>{
          return <li key={comment.id} className="list-group-item">{comment.content} | by: {comment?.user?.first_name + ' ' + comment?.user?.last_name} | created at: {formatDate(comment.created_at)}
          {loggedInUser.id === comment.user.id && <button type="button" className="btn btn-danger" onClick={() => deleteComment(comment.id)}>Delete</button>}
          </li>
        })}
    </ul>
    </div>
  )
}

export default SingleGallery