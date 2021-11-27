import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function MovieCard({ movie }) {
  const [show, setShow] = useState(false);
  const [movieDetails, setMovieDetails] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (movieID) => {
    setShow(true);
    axios.get(`http://localhost:5000/getOneMovie/${movieID}`).then((res) => {
      setMovieDetails(res.data);
    });
  };

  return (
    <div className="col-md-3 mb-5">
      <div
        className="card card-body bg-dark h-100 "
        style={{ cursor: "pointer" }}
        onClick={() => handleShow(movie.imdbID)}
      >
        <img
          className="w-50 mb-2 d-block mx-auto "
          src={movie.Poster}
          alt="Movie Cover"
        />
        <h5 className="text-light text-center">{movie.Title}</h5>
        <div className="text-light">IMDB Rating: {movie.imdbRating}</div>
        <div className="text-warning">{movie.Plot}</div>
      </div>

      <Modal show={show} onHide={handleClose}>
        {movieDetails ? (
          <div className="bg-dark text-light">
            <Modal.Header closeButton closeVariant="white">
              <Modal.Title >
                
                  {movieDetails.Title}
                
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>Released: {movieDetails.Released}</div>
            <div>Director: {movieDetails.Director}</div>
            <div>Actors: {movieDetails.Actors}</div>
            <div>Language: {movieDetails.Language}</div> 
            <br/><p>{movieDetails.Plot}</p>     
            </Modal.Body>
          </div>
        ) : (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
