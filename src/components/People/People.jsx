import React, { useContext, useEffect } from 'react'
import { TrendingContext } from '../store'
import Loading from "./../Loading/Loading";
import errorImg from "../../assets/images/error.png"
import Pagination from "./../Pagination/Pagination";



export default function Pepole() {
  let { trendingPerson, goToDetails, baseImgUrl, loading, error, setPageNumber } = useContext(TrendingContext)
  useEffect(() => {
    setPageNumber(1);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  return (
    <>

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

        {trendingPerson.map((person, index) =>
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



