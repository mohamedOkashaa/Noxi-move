import { createContext } from "react";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export let TrendingContext = createContext(0);
export default function TrendingContextProvider(props) {

    let baseImgUrl = "https://image.tmdb.org/t/p/original";

    let [pageNumber, setPageNumber] = useState(1);
    let [totalPages, setTotalPages] = useState(0);

    let [trendingMovies, setTrendingMovies] = useState([]);
    let [trendingTvshowes, setTrendingTvshowes] = useState([]);
    let [trendingPerson, setTrendingPerson] = useState([]);

    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    async function getTrendingItems(mediaType, callBack) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/popular?api_key=7e39592fe943c405a2a189534dc726d0&page=${pageNumber}`);
        let filtered = data.results.filter(item =>
            !item.genre_ids?.includes(18) && // Drama
            !item.genre_ids?.includes(99)    // Documentary
        );

        callBack(filtered);
        setTotalPages(Math.min(data.total_pages, 100));
    }

    useEffect(() => {
        setLoading(true);
        async function featchAll() {
            try {
                await Promise.all([
                    getTrendingItems("movie", setTrendingMovies),
                    getTrendingItems('tv', setTrendingTvshowes),
                    getTrendingItems('person', setTrendingPerson)
                ]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        featchAll();
        // eslint-disable-next-line
    }, [pageNumber]);

    let navigate = useNavigate();

    function goToDetails(id, media) {
        navigate({
            pathname: '/Details',
            search: `?id=${id}&mediaType=${media}`
        }, []);
    }

    return (
        <TrendingContext.Provider value={{ trendingMovies, trendingTvshowes, trendingPerson, loading, error, baseImgUrl, goToDetails, setPageNumber, pageNumber, totalPages }}>
            {props.children}
        </TrendingContext.Provider>
    )
}