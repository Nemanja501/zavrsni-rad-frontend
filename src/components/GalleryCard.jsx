import React from 'react'

function GalleryCard({gallery}) {
    const date = new Date(gallery.created_at);
  return (
    <div className="card" style={{width: '18rem'}}>
        <img src={gallery.pictures} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{gallery.title}</h5>
            <p className="card-text">by: {gallery.user.first_name} {gallery.user.last_name} | created at: {date.getDate() +  '/' + date.getMonth() + '/' + date.getFullYear()}</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  )
}

export default GalleryCard