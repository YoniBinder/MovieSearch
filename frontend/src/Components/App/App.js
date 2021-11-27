import "./App.css";
import MovieCard from "./MovieCard";
import { useState, useEffect,useRef } from "react";
import axios from "axios";

function App() {
  
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(false);

  const InputRef = useRef()

  function getMovies(currentPage,searchInput) {
    setMovies(false)
    setLoading(true);
    axios
      .get(`http://localhost:5000/movies/${searchInput}/${currentPage}`)
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify(res.data));
        setMovies(res.data);
        setLoading(false);
      });  
  }

  function previousPage() {
    if (movies.page > 1) {
      getMovies(movies.page-1,movies.searchInput);
    }
  }
 function nextPage() {
    if (Number(movies.totalResults) / 10 > movies.page) {
      getMovies(movies.page+1,movies.searchInput);
    }
  }

  function onSubmit() {
    let movieInput=InputRef.current.value
    getMovies(1,movieInput)
  }
  
  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      const initialMovies = JSON.parse(savedMovies);
      setMovies(initialMovies);
      return
    }
  }, []);

  return (
    <div className="App">
      <div className="jumbotron jumbotron-fluid mt-5 text-center">
        <div className="container">
          <h3 className="mb-3">
            Please choose a movie
          </h3>
         
            <input
              type="text"
              className="w-40"
              name="searchText"
              placeholder="Search here..."
              ref={InputRef}
            />
            <br/>
            <button type="submit" className="btn btn-dark btn-bg mt-3" onClick={()=>onSubmit()}>
              Search
            </button>
         
        </div>
      </div>
      <br />
      <div>
        <div className="row">
          {movies
            ? movies.Search.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))
            : loading && (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                </div>
              )}
        </div>

        {movies && (
          <div>
            <ul className="pagination mx-auto justify-content-center">
              {movies.page > 1 && (
                <li className="page-item">
                  <button onClick={() => previousPage()} className="page-link">
                    &lt;
                  </button>
                </li>
              )}

              <li className="page-item">
                <button className="page-link">{movies.page}</button>
              </li>
              {Number(movies.totalResults) / 10 > movies.page && (
                <li className="page-item">
                  <button onClick={() => nextPage()} className="page-link">
                    &gt;
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
