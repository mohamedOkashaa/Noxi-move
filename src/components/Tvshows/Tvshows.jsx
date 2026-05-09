import React, { useContext, useEffect } from 'react'
import { TrendingContext } from '../store'
import Loading from "./../Loading/Loading";
import Pagination from "./../Pagination/Pagination";
import errorImg from "../../assets/images/error.png"


export default function Tvshows() {
    let { trendingTvshowes, loading, error, baseImgUrl, goToDetails  , setPageNumber} = useContext(TrendingContext)
        useEffect(() => {
        setPageNumber(1);
          // eslint-disable-next-line
    }, []);
    if (loading) return <Loading />;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
    return (
        <>
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

        {trendingTvshowes.map((tv, index) =>
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

<Pagination/>

        </>
    )
}
