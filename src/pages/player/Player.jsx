import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import Img from "../../components/lazyLoadImage/Img";

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
  let backdrop_path = localStorage.getItem("current_backdrop_path");
  const storedSeasonsInfo = localStorage.getItem("current_seasons_info");
  const seasonsDataTemp = storedSeasonsInfo
    ? JSON.parse(storedSeasonsInfo)
    : [];
  const seasonsData = seasonsDataTemp?.filter(
    (season) => season?.name !== "Specials"
  );
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const { mediaType, id } = useParams();
  const [selectedSourceIndex, setSelectedSourceIndex] = useState(6);
  const [selectedSource, setSelectedSource] = useState("");

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
            `${id}&season=${epi}&episode=${epi}`
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
  };

  const handleEpisodeClick = (episodeNumber) => {
    setSelectedEpisode(episodeNumber);
  };

  const handleButtonClick = (index) => {
    setSelectedSourceIndex(index);
  };

  useEffect(() => {
    makeSource();
  }, [selectedSourceIndex, selectedEpisode, selectedSeason]);

  return (
    <div className="player">
      <>
        <div className="backdrop1-img">
          <Img src={backdrop_path} />
        </div>
        <iframe
          id="dd"
          src={selectedSource}
          width="90%"
          frameBorder="0"
          scrolling="yes"
          allowFullScreen
        ></iframe>
        <div className="source-buttons">
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
        {mediaType == "tv" && (
          <div id="seasons">
            <select
              id="seasonsDropdown"
              onChange={handleSeasonChange}
              value={selectedSeason || ""}
            >
              {seasonsData.map((season) => (
                <option className="season-option" key={season.id} value={season.season_number}>
                  {season.name}
                </option>
              ))}
            </select>
            {selectedSeason !== null && (
              <div>
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
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default Player;
