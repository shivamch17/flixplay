import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Card from "./Card";
import { useInView } from "react-intersection-observer";
import Modal1 from "./Modal1";
import { Button } from "antd";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [page, setPage] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const { ref, inView } = useInView();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClick = async (id) => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_MOVIE_BY_ID_URL +
          id +
          "?&api_key=" +
          import.meta.env.VITE_API_KEY +
          "&language=en-US"
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setShowDetails(true);
      showModal(true);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response = await axios.get(
          import.meta.env.VITE_MOVIES_URL + "&page=" + page
        );
        setMovies([...movies, ...response.data.results]);
        setPage(page + 1);
        response = await axios.get(
          import.meta.env.VITE_MOVIES_URL + "&page=" + page
        );
        setMovies([...movies, ...response.data.results]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
      }
    };
    fetchMovies();
    if (inView) {
      fetchMovies();
      setPage(page + 1);
    }
  }, [inView]);

  return (
    <div>
      <section className="header">
        <span
          style={{
            lineHeight: "41px",
            fontSize: "22px",
            textAlign: "center",
            color: "var(--bs-light)",
          }}
        >
          MOVIES
        </span>
      </section>

      <section>
        <div className="main">
          {movies.map((movie, index) => (
            <Card
              key={movie.id}
              item={movie}
              index={index}
              handleClick={handleClick}
            />
          ))}
        </div>
      </section>
      {showDetails && (
        <Modal1
          data={movieDetails}
          handleOk={handleOk}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
        />
      )}
      <Loader loaderRef={ref} />
    </div>
  );
};

export default Movies;
