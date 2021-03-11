import React, {Component} from 'react';
import MovieService from "../../services/movie-service";
import MovieItem from "../../shared/movie-item/movie-item";
import Spinner from "../../shared/spinner/spinner";
import {Redirect} from 'react-router-dom'

class Search extends Component {

    state = {
        query: '',
        movies: [],
        loaded: true,
        searched: false,
        error: false
    }

    movieService = new MovieService()

    onText = (e) => {
        this.setState({query: e.target.value})
    }

    onSearch = (e) => {
        e.preventDefault()
        this.setState({loaded: false, searched: true})
        this.movieService.findMovie(this.state.query, '')
            .then(movies => this.setState({movies, query: '', loaded: true}))
            .catch(() => this.setState({error: true}))
    }

    render() {
        const {loaded, searched, query, movies, error} = this.state

        const renderedMovies = loaded && searched && movies.results.length > 0
            ?
            movies.results.map(movie => <MovieItem movieInfo={movie} key={movie.id}/>)
            :
            loaded && searched ? <div className="search__clear">По вашему запросу фильмов не найдено</div>
            :
            searched ? <Spinner/> : <div className="search__clear">Поиск по фильмам</div>

        if (error) return <Redirect to="/404"/>

        return (
            <div className="search container">
                <form className="search__form">
                    <input className="form-control"
                           type="search"
                           placeholder="Введите название фильма"
                           value={query}
                           onChange={this.onText}/>
                    <button className="btn btn-secondary"
                            onClick={this.onSearch}>Искать
                    </button>
                </form>
                <div className="search__inner">
                    {renderedMovies}
                </div>
            </div>
        );
    }
}

export default Search;