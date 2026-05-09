import React from 'react'
import Style from './About.module.css'

export default function About() {
    return (
        <div className={Style.about}>

            <div className={Style.hero}>
                <div className={Style.badge}>est. 2024</div>
                <div className={Style.logo}>no<span>x</span>e</div>
                <p>A clean, fast, and cinematic experience for discovering the movies, shows, and people that define entertainment.</p>
                <div className={Style.line}></div>
            </div>

            <div className={Style.features}>
                <div className={Style.feat}>
                    <div className={Style.featNum}>01</div>
                    <div className={Style.featIcon}><i className="ti ti-movie"></i></div>
                    <div className={Style.featTitle}>Movies</div>
                    <div className={Style.featDesc}>Thousands of trending and popular films from every genre, updated daily.</div>
                </div>
                <div className={Style.feat}>
                    <div className={Style.featNum}>02</div>
                    <div className={Style.featIcon}><i className="ti ti-device-tv"></i></div>
                    <div className={Style.featTitle}>TV Shows</div>
                    <div className={Style.featDesc}>The latest and most-watched series from around the world, all in one place.</div>
                </div>
                <div className={Style.feat}>
                    <div className={Style.featNum}>03</div>
                    <div className={Style.featIcon}><i className="ti ti-users"></i></div>
                    <div className={Style.featTitle}>People</div>
                    <div className={Style.featDesc}>Actors, directors, and the creative talent behind every great production.</div>
                </div>
                <div className={Style.feat}>
                    <div className={Style.featNum}>04</div>
                    <div className={Style.featIcon}><i className="ti ti-search"></i></div>
                    <div className={Style.featTitle}>Smart Search</div>
                    <div className={Style.featDesc}>Find anything instantly — movies, shows, or people — as you type.</div>
                </div>
            </div>

            <div className={Style.stats}>
                <div className={Style.stat}>
                    <div className={Style.statNum}>500+</div>
                    <div className={Style.statLabel}>Pages of content</div>
                </div>
                <div className={Style.stat}>
                    <div className={Style.statNum}>3</div>
                    <div className={Style.statLabel}>Content categories</div>
                </div>
                <div className={Style.stat}>
                    <div className={Style.statNum}>∞</div>
                    <div className={Style.statLabel}>Hours of discovery</div>
                </div>
            </div>

            <div className={Style.bottom}>
                <div className={Style.bottomText}>
                    <h3>Powered by TMDB</h3>
                    <p>All data is sourced from The Movie Database API</p>
                </div>
                <button className={Style.tmdb}>TMDB API</button>
            </div>

        </div>
    )
}