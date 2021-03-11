import React, {Component} from 'react';
import MovieItem from "../../shared/movie-item/movie-item";

class Saved extends Component {

    state = {
        savedMovies: []
    }

    componentDidMount() {
        this.setState({
            savedMovies: JSON.parse(localStorage.getItem('savedMovies')) || []
        })
    }

    render() {

        const renderedMovies = this.state.savedMovies.length > 0
            ?
            this.state.savedMovies
                .map(movie => <MovieItem movieInfo={movie} key={movie.id}/>)
                .sort((a, b) => {
                    return (a.savedAt < b.savedAt) ? -1 : ((a.savedAt > b.savedAt) ? 1 : 0);
                })
            :
            <p className="display-6">Вы пока ничего не сохранили</p>

        return (
            <div className="saved container">
                <h2 className="saved__title display-4">Сохраненные фильмы</h2>
                <div className="saved__inner">
                    {renderedMovies}
                </div>
            </div>
        );
    }
}

export default Saved;