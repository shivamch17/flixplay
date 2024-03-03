import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import Img from "../../components/lazyLoadImage/Img";

const PlayerAnime = () => {
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [episodeCount, setEpisodeCount] = useState(null);
  let backdrop_path = localStorage.getItem("current_backdrop_path");
  const { id } = useParams();
  const [selectedSourceIndex, setSelectedSourceIndex] = useState(0);
  const [selectedSource, setSelectedSource] = useState("");
  const [sources, setSources] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEpisodeClick = (episodeNumber) => {
    setSelectedEpisode(episodeNumber);
  };

  const handleButtonClick = (index) => {
    setSelectedSourceIndex(index);
    setSelectedSource(sources[index].url);
  };

  useEffect(() => {
    const fetchAnimeData = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://proxymaster-1-q6640207.deta.app/fetch/https://api.anix.cc/movies/detail/${id}`,
        headers: {
          authority: "api.anix.cc",
          accept: "application/json",
          "accept-language": "en-US,en;q=0.5",
          "cache-control": "no-cache",
          "content-type": "application/json",
          origin: "https://www.anix.cc",
          pragma: "no-cache",
          referer: "https://www.anix.cc/",
          "sec-ch-ua":
            '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        },
      };

      try {
        const response = await axios.request(config);
        setEpisodeCount(response.data.data.latest_episode.episode);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnimeData();
  }, [id]);

  useEffect(() => {
    let slug = id + "-episode-" + selectedEpisode;
    const getLinks = async () => {
      try {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `https://proxymaster-1-q6640207.deta.app/fetch/https://api.anix.cc/episodes/detail/${slug}`,
          headers: {
            authority: "api.anix.cc",
            accept: "application/json",
            "accept-language": "en-US,en;q=0.5",
            "cache-control": "no-cache",
            "content-type": "application/json",
            origin: "https://www.anix.cc",
            pragma: "no-cache",
            referer: "https://www.anix.cc/",
            "sec-ch-ua":
              '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "sec-gpc": "1",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          },
        };
        const response = await axios.request(config);
        setSources(response.data.data.links);
        const links = response.data.data.links;
        const fileLionsIndex = links.findIndex(
          (link) => link.type === "FILELIONS"
        );
        if (fileLionsIndex !== -1) {
          setSelectedSourceIndex(fileLionsIndex);
          setSelectedSource(links[fileLionsIndex].url);
        } else {
          setSelectedSource(links[0].url);
          setSelectedSourceIndex(0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLinks(id);
  }, [selectedEpisode]);

  return (
    <div className="player">
      <>
        <div className="backdrop1-img">
          <div style={{ position: "absolute" }}>
            {loading && <Spinner initial={true} />}
          </div>
          <Img src={backdrop_path} />
        </div>
        <iframe
          id="dd"
          src={selectedSource}
          width="90%"
          height="700px"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        ></iframe>
        <div className="source-buttons">
          {sources?.map((source, index) => (
            <div
              key={index}
              onClick={() => handleButtonClick(index)}
              className={
                selectedSourceIndex === index
                  ? "source-btn-active button-62"
                  : "button-62"
              }
            >
              {source.type}
            </div>
          ))}
        </div>
        <div>
          <div className="episode-container-anime">
            {Array.from({ length: episodeCount }, (_, index) => index + 1).map(
              (episodeNumber) => (
                <div
                  className={
                    selectedEpisode === episodeNumber
                      ? "episode-div-active episode-div"
                      : "episode-div"
                  }
                  key={episodeNumber}
                  onClick={() => handleEpisodeClick(episodeNumber)}
                >
                  E{episodeNumber}
                </div>
              )
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default PlayerAnime;
