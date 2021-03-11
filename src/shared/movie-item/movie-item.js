import React from 'react';
import {IMG_URL} from "../../services/consts";
import StarRatings from "react-star-ratings";
import {Link} from 'react-router-dom'
import PosterPlaceholder from './../../img/poster-placeholder.png'

const MovieItem = ({movieInfo}) => {

    const poster = movieInfo.poster_path ? `${IMG_URL}${movieInfo.poster_path}` : PosterPlaceholder

    return (
        <Link className="film-item" to={`/movie/${movieInfo.id}`}>
            <img className="film-item__img"
                 src={poster}
                 alt={movieInfo.title}/>
            <h5 className="film-item__title">{movieInfo.title}</h5>
            <StarRatings rating={movieInfo.vote_average / 2}
                         starRatedColor='yellow'
                         starDimension="18px"/>
        </Link>
    );
};

export default MovieItem;
