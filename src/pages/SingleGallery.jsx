import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import GalleriesService from '../services/galleries.sevice';


function SingleGallery() {
  const {id} = useParams();
  const [gallery, setGallery] = useState({});
  const date = new Date(gallery.created_at);

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

  return (
    <div>
      <h1>{gallery.title}</h1>
      <h4>Author: <Link to={`/authors/${gallery?.user?.id}`} style={{ textDecoration: 'none', color: 'white' }}>{gallery?.user?.first_name} {gallery?.user?.last_name}</Link></h4>
      <h5>Created at: {date.getDate() +  '/' + date.getMonth() + '/' + date.getFullYear()}</h5>
      <p>{gallery.description}</p>
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
    </div>
  )
}

export default SingleGallery