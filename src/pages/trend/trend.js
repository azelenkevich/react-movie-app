import React, {Component} from 'react';
import MovieService from "../../services/movie-service";
import MovieItem from "../../shared/movie-item/movie-item";
import Spinner from "../../shared/spinner/spinner";
import {withRouter, Redirect} from 'react-router-dom'
import ReactPaginate from 'react-paginate'

class Trend extends Component {

    _isMounted = false;

    state = {
        movies: [],
        loaded: false,
        error: false,
        page: +this.props.match.params.page
    }
    movieService = new MovieService();

    updateMovies = () => {
        this.movieService.getTrendMovies(this.state.page ? `&page=${this.state.page + 1}` : '')
            .then(movies => {
                if (this._isMounted) {
                    this.setState({movies: movies.results, loaded: true})
                }
            })
            .catch(() => {
                if (this._isMounted) {
                    this.setState({error: true, loaded: true})
                }
            })
    }

    changePage = (data) => {
        this.props.history.push(`/trending/${data.selected + 1}`)
        this.setState({page: data.selected, loaded: false})
    }

    componentDidMount() {
        this._isMounted = true;
        this.updateMovies();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.page !== this.state.page) {
            this.updateMovies();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        const renderedFilms = this.state.loaded ?
            this.state.movies.map(movie => <MovieItem key={movie.id} movieInfo={movie}/>) :
            <Spinner/>

        if (this.state.error) return <Redirect to="/404"/>

        return (
            <section className="trend container">
                <h2 className="trend__title display-4">Фильмы, популярные на этой неделе</h2>
                <div className="trend__inner">
                    {renderedFilms}
                </div>
                <div className="trend__nav">
                    <ReactPaginate previousLabel={'Prev'}
                                   nextLabel={'Next'}
                                   breakLabel={'...'}
                                   pageCount={1000}
                                   marginPagesDisplayed={1}
                                   pageRangeDisplayed={3}
                                   containerClassName={'pagination'}
                                   pageClassName={'page-item'}
                                   pageLinkClassName={'page-link'}
                                   previousClassName={'page-item'}
                                   previousLinkClassName={'page-link'}
                                   nextClassName={'page-item'}
                                   nextLinkClassName={'page-link'}
                                   breakClassName={'page-item'}
                                   breakLinkClassName={'page-link'}
                                   activeClassName={'active'}
                                   initialPage={this.state.page ? this.state.page - 1 : 0}
                                   onPageChange={this.changePage}/>
                </div>
            </section>
        );
    }
}

export default withRouter(Trend);