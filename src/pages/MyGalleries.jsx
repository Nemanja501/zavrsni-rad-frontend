import React, { useEffect, useState } from 'react'
import GalleriesService from '../services/galleries.sevice';
import GalleryCard from '../components/GalleryCard';

function MyGalleries() {
  const [galleries, setGalleries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [filter, setFilter] = useState('');
  const [filterMode, setFilterMode] = useState(false);

  useEffect(()=>{
    if(currentPage === 1){
      initalFetch();
    }else{
      fetchMoreGalleries();
    }
  },[currentPage]);


  async function initalFetch(){
    try{
      const data = await GalleriesService.myGalleries();
      if(data){
        setGalleries(data.data);
        setMetadata(data.meta);
      }
    }catch(err){
      console.log(err);
    }
  }

  async function fetchMoreGalleries(){
    try{
      const data = await GalleriesService.myGalleries(currentPage);
      if(data){
        setGalleries([...galleries, ...data.data]);
        setMetadata(data.meta);
        setFilterMode(false);
      }
    }catch(err){
      console.log(err);
    }
  }

  async function fetchFiltered(){
    if(filter.length > 0){
      const data = await GalleriesService.myGalleries(1, filter);
      setFilteredGalleries(data.data);
      setFilterMode(true);
      console.log('filter true', data.data);
    }else{
      setFilterMode(false);
      setCurrentPage(1);
    }
  }

  return (
    <div>
      <h1>My galleries</h1>
      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" type="button" onClick={() =>{fetchFiltered();}}>Filter</button>
        <input type="text" className="form-control" placeholder=""  onChange={(e) => setFilter(e.target.value)}/>
      </div>
      {filterMode ? filteredGalleries.map((gallery)=>{
        return <GalleryCard key={gallery.id} gallery={gallery}/>
      }) : <> {galleries.map((gallery) =>{
        return <GalleryCard key={gallery.id} gallery={gallery}/>
      })}
      {galleries.length < metadata.total && <button type="button" className="btn btn-secondary mt-3" onClick={()=>{ setCurrentPage(page => page + 1);}}>Load more</button>}
      </>}
    </div>
  )
}

export default MyGalleries