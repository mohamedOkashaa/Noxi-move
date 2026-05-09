import errorImg from "../../assets/images/error.png";
import Loading from "./../Loading/Loading";
import { useContext } from 'react';
import { TrendingContext } from '../store';
import Pagination from "../Pagination/Pagination"



export default function Home() {

  let { trendingMovies, trendingTvshowes, trendingPerson, loading, error, baseImgUrl, goToDetails } = useContext(TrendingContext)

  if (loading) return <Loading />;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <>

      <div className="row">

        <div className="col-md-4 d-flex align-items-center">
          <div className="welcome">
            <div className={`brdr w-25 mb-4`}></div>
            <h2>Trending</h2>
            <h2>Movies</h2>
            <h2>To Watch Now</h2>
            <p className="colorp">Most Watched Movies By Day</p>
            <div className={`brdr w-75 my-4`}></div>
          </div>
        </div>

        {trendingMovies.slice(0, 10).map((movie, index) =>
          <div onClick={() => goToDetails(movie.id, 'movie')} key={index} className="col-md-2 col-sm-6 g-3 text-center">

            <div className="movie-card">
              <img
                src={movie.poster_path ? baseImgUrl + movie.poster_path : errorImg}
                alt="poster"
                className='mb-2 rounded-1'
              />
              <div className="overlay">
                <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                <span>📅 {movie.release_date?.split('-')[0]}</span>
              </div>
            </div>

            <h2 className='h6'>{movie.title}</h2>
          </div>
        )}
      </div>


      <div className="row my-4">

        <div className="col-md-4 d-flex  align-items-center">
          <div className="welcome">
            <div className={`brdr w-25 mb-4`}></div>
            <h2>Trending</h2>
            <h2>Tv Shows</h2>
            <h2>To Watch Now</h2>
            <p className="colorp">Most Watched Tv Shows By Day</p>
            <div className={`brdr w-75 my-4`}></div>
          </div>
        </div>

        {trendingTvshowes.slice(0, 10).map((tv, index) =>
          <div onClick={() => goToDetails(tv.id, 'tv')} key={index} className="col-md-2 col-sm-6 g-3 text-center">

            <div className="movie-card">
              <img
                src={tv.poster_path ? baseImgUrl + tv.poster_path : errorImg}
                alt="poster"
                className='mb-2 rounded-1'
              />
              <div className="overlay">
                <span>⭐ {tv.vote_average?.toFixed(1)}</span>
                <span>📅 {tv.first_air_date?.split('-')[0]}</span>
              </div>
            </div>

            <h2 className='h6'>{tv.name}</h2>
          </div>
        )}

      </div>


      <div className="row">

        <div className="col-md-4 d-flex  align-items-center">
          <div className="welcome">
            <div className={`brdr w-25 mb-4`}></div>
            <h2>Trending</h2>
            <h2>persons</h2>
            <h2>To Watch Now</h2>
            <p className="colorp" >Most Watched Peoples By Day</p>
            <div className={`brdr w-75 my-4`}></div>
          </div>
        </div>

        {trendingPerson.slice(0, 10).map((person, index) =>
          <div onClick={() => goToDetails(person.id, 'person')} key={index} className="col-md-2 col-sm-6 g-3 text-center">
            <div className="movie-card">
              <img
                src={person.profile_path ? baseImgUrl + person.profile_path : errorImg}
                alt="poster"
                className='mb-2 rounded-1'
              />
              {/* hover */}
              <div className="overlay">
                <span>🎭 {person.known_for_department}</span>
                <span>🔥 {person.popularity?.toFixed(0)}</span>
              </div>

            </div>

            <h2 className='h6'>{person.name}</h2>
          </div>
        )}

      </div>

      <Pagination />
    </>

  )
}
