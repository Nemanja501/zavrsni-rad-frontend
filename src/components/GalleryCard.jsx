import React from 'react'
import { Link } from 'react-router-dom';

function GalleryCard({gallery}) {
    const date = new Date(gallery.created_at);
  return (
    <div className="card" style={{width: '18rem'}}>
        <img src={gallery.pictures[0] ? gallery.pictures[0] : gallery.pictures} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{gallery.title}</h5>
            <p className="card-text">by: 
            <Link to={`/authors/${gallery.user.id}`} style={{ textDecoration: 'none', color: 'white' }}>{gallery.user.first_name} {gallery.user.last_name}</Link>
            <br/> created at: {date.getDate() +  '/' + date.getMonth() + '/' + date.getFullYear()}</p>
            <Link to={`/galleries/${gallery.id}`} className="btn btn-primary">View Gallery</Link>
        </div>
    </div>
  )
}

export default GalleryCard