import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import Img from "../../components/lazyLoadImage/Img";
import useFetch from "../../hooks/useFetch";

const sources = [
  {
    embedcc: [
      "https://www.2embed.cc/embed/ID",
      "https://www.2embed.cc/embedtv/ID&s=sea&e=epi",
    ],
  },
  {
    smashstream: [
      "https://embed.smashystream.com/playere.php?tmdb=ID",
      "https://embed.smashystream.com/playere.php?tmdb=ID&season=sea&episode=epi",
    ],
  },
  {
    multiembed: [
      "https://multiembed.mov/?video_id=ID&tmdb=1",
      "https://multiembed.mov/?video_id=ID&tmdb=1&s=sea&e=epi",
    ],
  },
  {
    multiembedvip: [
      "https://multiembed.mov/directstream.php?video_id=ID&tmdb=1",
      "https://multiembed.mov/directstream.php?video_id=ID&tmdb=1&s=sea&e=epi",
    ],
  },
  {
    vidsrc: [
      "https://embed.su/embed/movie/ID",
      "https://embed.su/embed/tv/ID/sea/epi",
    ],
  },
  {
    moviesapi: [
      "https://moviesapi.club/movie/ID",
      "https://moviesapi.club/tv/ID-sea-epi",
    ],
  },
  {
    remotestream: [
      "https://vidlink.pro/movie/ID",
      "https://vidlink.pro/tv/ID/sea/epi",
    ],
  },
];

const Player = () => {
  const { mediaType, id, season: urlSeason, episode: urlEpisode } = useParams();
  const [selectedSeason, setSelectedSeason] = useState(urlSeason ? parseInt(urlSeason) : 1);
  const [selectedEpisode, setSelectedEpisode] = useState(urlEpisode ? parseInt(urlEpisode) : 1);
  const [selectedSourceIndex, setSelectedSourceIndex] = useState(6);
  const [selectedSource, setSelectedSource] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  // Fetch media details
  const { data: mediaDetails, loading } = useFetch(`/${mediaType}/${id}`);
  const backdrop_path = mediaDetails?.backdrop_path ? (url.backdrop + mediaDetails.backdrop_path) : "";
  const seasonsDataTemp = mediaDetails?.seasons || [];
  const seasonsData = seasonsDataTemp?.filter(
    (season) => season?.name !== "Specials"
  );

  const makeSource = () => {
    let selectedSource;
    let epi = selectedEpisode;
    let sea = selectedSeason;
    let index = selectedSourceIndex;

    if (mediaType == "tv") {
      switch (index || 0) {
        case 0:
          selectedSource = sources[0].embedcc[1].replace(
            "ID&s=sea&e=epi",
            `${id}&s=${sea}&e=${epi}`
          );
          break;
        case 1:
          selectedSource = sources[1].smashstream[1].replace(
            "ID&season=sea&episode=epi",
            `${id}&season=${sea}&episode=${epi}`
          );
          break;
        case 2:
          selectedSource = sources[2].multiembed[1].replace(
            "ID&tmdb=1&s=sea&e=epi",
            `${id}&tmdb=1&s=${sea}&e=${epi}`
          );
          break;
        case 3:
          selectedSource = sources[3].multiembedvip[1].replace(
            "ID&tmdb=1&s=sea&e=epi",
            `${id}&tmdb=1&s=${sea}&e=${epi}`
          );
          break;
        case 4:
          selectedSource = sources[4].vidsrc[1].replace(
            "ID/sea/epi",
            `${id}/${sea}/${epi}`
          );
          break;
        case 5:
          selectedSource = sources[5].moviesapi[1].replace(
            "ID-sea-epi",
            `${id}-${sea}-${epi}`
          );
          break;
        case 6:
          selectedSource = sources[6].remotestream[1].replace(
            "ID/sea/epi",
            `${id}/${sea}/${epi}`
          );
          break;
        default:
          selectedSource = sources[0].embedcc[1].replace(
            "ID&s=sea&e=epi",
            `${id}&s=${sea}&e=${epi}`
          );
          break;
      }
    } else {
      switch (index || 0) {
        case 0:
          selectedSource = sources[0].embedcc[0].replace("ID", id);
          break;
        case 1:
          selectedSource = sources[1].smashstream[0].replace("ID", id);
          break;
        case 2:
          selectedSource = sources[2].multiembed[0].replace("ID", id);
          break;
        case 3:
          selectedSource = sources[3].multiembedvip[0].replace("ID", id);
          break;
        case 4:
          selectedSource = sources[4].vidsrc[0].replace("ID", id);
          break;
        case 5:
          selectedSource = sources[5].moviesapi[0].replace("ID", id);
          break;
        case 6:
          selectedSource = sources[6].remotestream[0].replace("ID", id);
          break;
        default:
          selectedSource = sources[0].embedcc[0].replace("ID", id);
          break;
      }
    }
    setSelectedSource(selectedSource);
  };

  const handleSeasonChange = (event) => {
    const selectedSeasonNumber = parseInt(event.target.value, 10);
    setSelectedSeason(selectedSeasonNumber);
    setSelectedEpisode(1);
    if (mediaType === "tv") {
      navigate(`/player/${mediaType}/${id}/${selectedSeasonNumber}/1`);
    }
  };

  const handleEpisodeClick = (episodeNumber) => {
    setSelectedEpisode(episodeNumber);
    if (mediaType === "tv") {
      navigate(`/player/${mediaType}/${id}/${selectedSeason}/${episodeNumber}`);
    }
  };

  const handleButtonClick = (index) => {
    setSelectedSourceIndex(index);
  };

  useEffect(() => {
    makeSource();

    if (mediaDetails) {
      // Save current playback info to localStorage
      const playbackInfo = {
        id,
        mediaType,
        poster_path: mediaDetails.poster_path ? (url.backdrop?.replace('w1280','w400') + mediaDetails.poster_path) : "",
        backdrop_path,
        title: mediaDetails.name || mediaDetails.title,
        season: mediaType === "tv" ? selectedSeason : null,
        episode: mediaType === "tv" ? selectedEpisode : null,
        timestamp: new Date().getTime()
      };

      // Get existing continue watching list
      let continueWatching = JSON.parse(localStorage.getItem("continue_watching") || "[]");

      // Remove if already exists
      continueWatching = continueWatching.filter(item => !(item.id === id && item.mediaType === mediaType));

      // Add to beginning of array
      continueWatching.unshift(playbackInfo);

      // Keep only last 10 items
      if (continueWatching.length > 10) {
        continueWatching = continueWatching.slice(0, 10);
      }

      localStorage.setItem("continue_watching", JSON.stringify(continueWatching));
    }
  }, [selectedSourceIndex, selectedEpisode, selectedSeason, mediaDetails]);

  return (
    <div className="player">
      <div className="backdrop1-img">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <Img src={backdrop_path} />
        )}
      </div>

      {mediaType === "tv" ? (
        <div className="content-wrapper tv-layout">
          <div className="left-column">
            <iframe
              id="dd"
              src={selectedSource}
              frameBorder="0"
              scrolling="yes"
              allowFullScreen
            ></iframe>

            <div className="source-buttons">
              <select
                className="source-dropdown"
                onChange={(e) => handleButtonClick(parseInt(e.target.value))}
                value={selectedSourceIndex}
              >
                {sources.map((source, index) => (
                  <option key={index} value={index}>
                    Source {index + 1}
                  </option>
                ))}
              </select>

              <div className="source-grid">
                {sources.map((source, index) => (
                  <div
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    className={
                      selectedSourceIndex === index
                        ? "source-btn-active button-62"
                        : "button-62"
                    }
                  >
                    Source {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="right-column">
            <div id="seasons">
              <select
                id="seasonsDropdown"
                onChange={handleSeasonChange}
                value={selectedSeason || ""}
              >
                {seasonsData.map((season) => (
                  <option
                    className="season-option"
                    key={season.id}
                    value={season.season_number}
                  >
                    {season.name}
                  </option>
                ))}
              </select>

              {selectedSeason !== null && (
                <div className="episode-container-anime">
                  {Array.from(
                    { length: seasonsData[selectedSeason - 1]?.episode_count },
                    (_, index) => index + 1
                  ).map((episodeNumber) => (
                    <div
                      className={
                        selectedEpisode === episodeNumber
                          ? "episode-div-active episode-div"
                          : "episode-div"
                      }
                      key={episodeNumber}
                      onClick={() => handleEpisodeClick(episodeNumber)}
                    >
                      S{selectedSeason} E{episodeNumber}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="content-wrapper movie-layout">
          <iframe
            id="dd"
            src={selectedSource}
            frameBorder="0"
            scrolling="yes"
            allowFullScreen
          ></iframe>

          <div className="source-buttons">
            <select
              className="source-dropdown"
              onChange={(e) => handleButtonClick(parseInt(e.target.value))}
              value={selectedSourceIndex}
            >
              {sources.map((source, index) => (
                <option key={index} value={index}>
                  Source {index + 1}
                </option>
              ))}
            </select>

            <div className="source-grid">
              {sources.map((source, index) => (
                <div
                  key={index}
                  onClick={() => handleButtonClick(index)}
                  className={
                    selectedSourceIndex === index
                      ? "source-btn-active button-62"
                      : "button-62"
                  }
                >
                  Source {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
