import React from 'react'
import './styles/App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";


// Components
import Header from "./shared/header/header";
import Trend from "./pages/trend/trend";
import Movie from "./pages/movie/movie";
import Page404 from "./pages/page404/page404";
import Search from "./pages/search/search";
import Saved from "./pages/saved/saved";

function App() {

    return (
        <Router>
            <div className="app">
                <Header/>
                <Route path="/" exact>
                    <Trend/>
                </Route>
                <Route path="/trending/:page?">
                    <Trend/>
                </Route>
                <Route path="/movie/:id?">
                    <Movie/>
                </Route>
                <Route path="/search">
                    <Search/>
                </Route>
                <Route path="/saved">
                    <Saved/>
                </Route>
                <Route path="/404">
                    <Page404/>
                </Route>

            </div>
        </Router>
    );
}

export default App;
