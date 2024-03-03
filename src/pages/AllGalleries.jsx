import React, { useEffect, useState } from 'react'
import GalleriesService from '../services/galleries.sevice';
import GalleryCard from '../components/GalleryCard';

function AllGalleries() {
  const [galleries, setGalleries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    fetchGalleries();
  }, [currentPage])

  async function fetchGalleries(){
    try{
      const data = await GalleriesService.getAll(currentPage);
      if(data){
        console.log(data);
        setGalleries([...galleries, ...data.data]);
        
      }
    }catch(err){
      console.log(err.message)
    }
  }

  return (
    <div>
      <h1>All galleries</h1>
      {galleries.length > 0 ? galleries.map(gallery =>{
        return <GalleryCard key={gallery.id} gallery={gallery}/>
      }) : 'No galleries have been created'}
      <button type="button" className="btn btn-secondary mt-3" onClick={()=> setCurrentPage(page => page + 1)}>Load more</button>
    </div>
  )
}

export default AllGalleries