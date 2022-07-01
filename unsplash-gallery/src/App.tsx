import React, {useState, useEffect, FormEvent} from 'react';
import {FaSearch} from "react-icons/fa"
import './App.css';
import Photo from "./photo/Photo";
import {PhotoInterface} from "./interface/photo.interface";

const clientID = `?client_id=NjBOl5Kk4UEbWnHsaSv_1ME0NNfXyQ9dW17AOxGaqCo`
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const App = () => {
    // loading
    const [loading, setLoading] = useState(false)
    // photos
    const [photos, setPhotos] = useState<Array<PhotoInterface>>([])
    // page
    const [page, setPage] = useState(1)
    // query
    const [query, setQuery] = useState("")

    const [prevY, setPrevY] = useState(0);

    const fetchImages = async () => {
        setLoading(true)
        let url;
        const urlPage = `&page=${page}`;
        const urlQuery = `&query=${query}`

        if(query){
            url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
        }else{
            url = `${mainUrl}${clientID}${urlPage}`
        }

        try{
            const response = await fetch(url);
            const data = await response.json();
            setPhotos((oldPhotos) => {
                if(query && page === 1){
                    return [...data.results];
                }else if(query){
                    return [...oldPhotos, ...data.results];
                }else{
                    return [...oldPhotos, ...data]
                }
            })
            setLoading(false)
        }catch (e) {
            setLoading(false)
            console.log(e);
        }
    }

    const scrollEventListener = () => {
        const newPosition = prevY + window.innerHeight + window.scrollY;
        if(!loading && newPosition >= document.body.scrollHeight - 2)
        {
            setPage((state) =>{return state + 1});
        }
        setPrevY(newPosition)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPage(1);
        fetchImages();
    }

    useEffect(() => {
            fetchImages();
        }, [page]
    )

    useEffect(() => {
        const event = window.addEventListener("scroll", scrollEventListener);
    }, [])

  return (
    <main>
      <section className="search">
        <form className="search-form" onSubmit={handleSubmit}>
          <input type="text" name="" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="form-input"/>
          <button type="submit" className="submit-btn">
              <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
            {photos.map((photo, index) => {
               return <Photo key={index} urls={photo.urls} alt_description={photo.alt_description} likes={photo.likes}
                 user={photo.user} />
            })}
        </div>
      </section>
    </main>
  );
}

export default App;
