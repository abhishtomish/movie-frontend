import React, { Component } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import MovieForm from './components/MovieForm';
import { withCookies } from 'react-cookie'
var FontAwesome = require('react-fontawesome')


class App extends Component {

  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get('mr-token')
  }

  componentDidMount() {

    if(this.state.token) {
      fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.state.token}`
      }
    })
    .then(response => response.json())
    .then(response => this.setState({
      movies: response
    }))
    .catch(error => console.log(error))
    }else {
      window.location.href = "/"
    }
  }

  loadMovie = movie => {
    this.setState({
      selectedMovie: movie,
      editedMovie: null
    })
  }

  movieDeleted = selmovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selmovie.id)
    this.setState({
      movies: movies,
      selectedMovie: null
    })
  }

  editClicked = selmovie => {
    this.setState({
      editedMovie: selmovie
    })
  }

  newMovie = selmovie => {
    this.setState({
      editedMovie: {
        title: "",
        description: ""
      }
    })
  }

  cancelForm = selmovie => {
    this.setState({
      editedMovie: null
    })
  }

  addMovie = movie => {
    this.setState({
      movies: [...this.state.movies, movie]
    })
  }

  render() {

    return (
      <div className="App">
        <h1>
			<FontAwesome name="film"/>
			<span>Movie Rater</span>
		</h1>
        <div className="layout" >
          <MovieList
              movies={this.state.movies}
              movieClicked={this.loadMovie}
              movieDeleted={this.movieDeleted}
              editClicked={this.editClicked}
              newMovie={this.newMovie}
              token={this.state.token}
          />
          <div>
               { this.state.editedMovie ? 
               <MovieForm 
                  movie={this.state.editedMovie} 
                  cancelForm={this.cancelForm}
                  newMovie={this.addMovie}
                  editedMovie={this.loadMovie}
                  token={this.state.token}
               /> :
               <MovieDetail
                  movie={this.state.selectedMovie}
                  updateMovie={this.loadMovie}
                  token={this.state.token}
                />}
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(App);
