import React, {Component} from 'react';
import MovieService from "../../services/movie-service";
import Spinner from "../../shared/spinner/spinner";
import {IMG_URL} from "../../services/consts";
import dayjs from "dayjs";
import {withRouter, Redirect} from 'react-router-dom'

class Movie extends Component {

    state = {
        movie: null,
        savedMovies: [],
        loaded: false,
        error: false,
        isSaved: false
    }
    id = this.props.match.params.id;
    movieService = new MovieService();

    componentDidMount() {
        this.movieService.getMovie(this.id)
            .then(movie => this.setState({movie, loaded: true}))
            .catch(() => this.setState({error: true, loaded: true}))
        let savedList = JSON.parse(localStorage.getItem('savedMovies')) || [];
        this.setState({savedMovies: savedList})
    }

    setToLSandState = (arr) => {
        this.setState({savedMovies: arr})
        localStorage.setItem('savedMovies', JSON.stringify(this.state.savedMovies))
    }

    onSave = (e) => {
        e.preventDefault()
        let newSaved = this.state.savedMovies
        newSaved.push({
            id: this.id,
            title: this.state.movie.title,
            poster_path: this.state.movie.poster_path,
            vote_average: this.state.movie.vote_average,
            savedAt: new Date().toISOString()
        })
        this.setToLSandState(newSaved)
    }

    onRemove = (e) => {
        e.preventDefault()
        let newSaved = this.state.savedMovies
        let index = newSaved.findIndex(movie => movie.id === this.id)
        newSaved.splice(index, 1)
        this.setToLSandState(newSaved)
    }


    render() {
        const {movie, loaded} = this.state;
        const saveBtn = <button className="btn btn-primary movie__save"
                                onClick={this.onSave}>Сохранить</button>;
        const removeBtn = <button className="btn btn-danger movie__save"
                                  onClick={this.onRemove}>Удалить из сохраненных</button>;

        const saveToggleBtn = this.state.savedMovies.find(movie => movie.id === this.id) ? removeBtn : saveBtn

        if (!loaded) return <Spinner/>
        if (this.state.error) return <Redirect to="/404"/>
        return (
            <div className="movie container bg-primary">
                <img src={`${IMG_URL}${movie.poster_path}`}
                     className="movie__poster"
                     alt={movie.title}/>
                <div className="movie__first">
                    <h2 className="display-4">{movie.title}</h2>
                    <div className="movie__genres">
                        {movie.genres.map(genre => <span key={genre.id}
                                                         className="movie__genre">{genre.name}</span>)}
                    </div>
                    <span>{movie.overview}</span>
                    <div className="movie__properties">
                        <span>Оригинальное название: {movie.original_title}</span>
                        <span>Оригинальный язык: {movie.original_language}</span>
                        <span>Дата релиза: {dayjs(movie.release).format('DD/MM/YYYY')}</span>
                        <span>Количество оценок: {movie.vote_count}</span>
                        <span>Средняя оценка: {movie.vote_average}</span>
                    </div>
                    {saveToggleBtn}
                </div>
            </div>
        );
    }
}

export default withRouter(Movie);