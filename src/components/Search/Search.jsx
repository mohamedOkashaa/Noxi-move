import { useSearchParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import errorImg from "../../assets/images/error.png"
import { TrendingContext } from '../store' // ✅ ضيف

export default function Search() {
    let { goToDetails } = useContext(TrendingContext); // ✅ ضيف
    let [searchParams] = useSearchParams();
    let query = searchParams.get('query');
    let [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            axios.get(`https://api.themoviedb.org/3/search/multi?api_key=7e39592fe943c405a2a189534dc726d0&query=${query}`)
                .then(({ data }) => setResults(data.results));
        }
    }, [query]);

return (
    <div className="row">
        {results.map((item) =>
            <div
                key={item.id}
                className="col-md-2 col-sm-6 g-3 text-center"
                onClick={() => goToDetails(item.id, item.media_type)}
            >
                <div className="movie-card">
                    <img
                        src={item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : errorImg}
                        alt="poster"
                        className='mb-2 rounded-1 w-100'
                    />
                    <div className="overlay">
                        <span>⭐ {item.vote_average?.toFixed(1)}</span>
                    </div>
                </div>
                <h2 className='h6'>{item.title || item.name}</h2>
            </div>
        )}
    </div>
)
}