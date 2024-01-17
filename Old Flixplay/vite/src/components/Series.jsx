import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Card from "./Card";
import { useInView } from "react-intersection-observer";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERIES_URL + "&page=" + page
        );
        setSeries([...series, ...response.data.results]);
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
      }
    };
    if (inView) {
      fetchSeries();
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
          TV SHOWS
        </span>
      </section>

      <section>
        <div id="movie-container" className="main">
          {series.map((serie,index) => (
            <Card key={serie.id} item={serie} index={index}/>
          ))}
        </div>
      </section>
      <Loader loaderRef={ref} />
    </div>
  );
};

export default Series;
