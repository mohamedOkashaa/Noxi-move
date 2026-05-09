import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import errorImg from "../../assets/images/error.png";
import Loading from "./../Loading/Loading";
import { TrendingContext } from '../store';



export default function Details() {

    let { baseImgUrl }=useContext(TrendingContext)
  

  // Get id and media type from URL (example: ?id=123&mediaType=movie)
  let [searchParams] = useSearchParams();
  let currntId = searchParams.get('id');
  let media = searchParams.get('mediaType');

  // movie/tv/person details
  let [details, setDetails] = useState({});
  // list of genres
  let [genres, setGenres] = useState([]);
  // show loading spinner
  let [loading, setLoading] = useState(true);
  // show error message if any
  let [error, setError] = useState(null);

  // Fetch data from API
  async function getItemDetails() {
    try {
      let { data } = await axios.get(`https://api.themoviedb.org/3/${media}/${currntId}?api_key=7e39592fe943c405a2a189534dc726d0`);
      setDetails(data);
      setGenres(data.genres?.map(g => g.name) || ['Actor'])
    } catch (err) {
      setError("Failed to load data!");
    } finally {
      setLoading(false);
    }
  }
  
  // Run on id or mediaType change
  useEffect(() => {
    getItemDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currntId, media]);



  if (loading) return <Loading />;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="details">
            <img
              src={
                media === 'person'
                  ? (details.profile_path ? baseImgUrl + details.profile_path : errorImg)
                  : (details.poster_path ? baseImgUrl + details.poster_path : errorImg)
              }
              alt="poster"
              className='w-100 mb-2 rounded-1'
              onError={(e) => {
                e.target.onerror = null; // منع infinite loop
                e.target.src = errorImg;
              }}
            />
          </div>
        </div>

        <div className="col-md-8">
          <div className="details mt-5">
            <h2>{media === 'movie' ? details.title : details.name}</h2>

            {/* Tagline for movie/tv - Biography for person */}
            {media === 'person' ? (
              <p >{details.biography?.slice(0, 200)}...</p>
            ) : (
              <p >{details.tagline}</p>
            )}

            {/* Genres */}
            <div className="mb-3">
              {genres.map((g, index) => (
                <span key={index} className='btn btn-info me-2 mt-3'>{g}</span>
              ))}
            </div>

            {/* All Details with consistent styling */}
            <div className="text-warning fw-bold mt-4">

              {/* Person Specific Details */}
              {media === 'person' && (
                <>
                  <p className="my-2 ">
                    <i className="fas fa-chart-line me-2"></i>
                    Popularity: {details.popularity?.toFixed(1) || 'N/A'}
                  </p>
                  <p className="mb-2">
                    <i className="fas fa-birthday-cake me-2"></i>
                    Birthday: {details.birthday
                      ? new Date(details.birthday).toLocaleDateString('us')
                      : 'N/A'}
                  </p>
                  <p className="mb-2">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    Place of Birth: {details.place_of_birth || 'N/A'}
                  </p>
                </>
              )}

              {/* Movie & TV Specific Details */}
              {media !== 'person' && (
                <>
                  <p className="my-3">
                    <i className="fas fa-star me-2"></i>
                    Rating: {details.vote_average?.toFixed(1) || 'N/A'} / 10
                  </p>
                  <p className="my-3">
                    <i className="fas fa-users me-2"></i>
                    Vote Count: {details.vote_count?.toLocaleString() || 'N/A'}
                  </p>
                  <p className="my-3">
                    <i className="fas fa-chart-line me-2"></i>
                    Popularity: {details.popularity?.toFixed(1) || 'N/A'}
                  </p>

                  {media === 'movie' && (
                    <p className="my-3">
                      <i className="fas fa-calendar-alt me-2"></i>
                      Release Date: {details.release_date || 'N/A'}
                    </p>
                  )}

                  {media === 'tv' && (
                    <p className=" my-3">
                      <i className="fas fa-calendar-alt me-2"></i>
                      First Air Date: {details.first_air_date || 'N/A'}
                    </p>
                  )}
                </>
              )}
            </div>
            {/*overview  */}
            <div>
              {media !== 'person' && <p className='lh-lg'>{details.overview}</p>}
            </div>
          </div>
        </div>
      </div >




    </>
  )
}
