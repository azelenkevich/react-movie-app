import {BASE_URL, API_KEY} from "./consts";

class MovieService {


    getTrendMovies = (page) => {
        const trendMovies = fetch(`${BASE_URL}trending/movie/week${API_KEY}&language=ru-RU${page}`)
            .then(data => {
                if (!data.ok) throw new Error('404')
                return data.json()
            })
        return trendMovies;
    }

    getMovie = (id) => {
        const movie = fetch(`${BASE_URL}movie/${id}${API_KEY}&language=ru-RU`)
            .then(data => {
                if (!data.ok) throw new Error('404')
                return data.json()
            })
        return movie;
    }

    findMovie = (query, page) => {
        const foundMovie = fetch(`${BASE_URL}search/movie${API_KEY}&query=${query}${page}&language=ru-RU`)
            .then(data => data.json())
        return foundMovie;
    }


}

export default MovieService;