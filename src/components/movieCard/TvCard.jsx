import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import Img from "../lazyLoadImage/Img";

const TvCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="tvCard"
      onClick={() => navigate("/player/livetv/" + data.channel_id)}
    >
      <div className="posterBlock">
        <Img
          className="posterImg"
          src={
            data.channel_logo.includes("https://ltsk-cdn.s3")
              ? "https://mediaready.videoready.tv/tatasky-epg/image/fetch/f_auto,fl_lossy,q_auto,dpr_6.75,w_40/" +
                data.channel_logo
              : data.channel_logo
          }
        />
      </div>
      <div className="textBlock">
        <span className="title">{data.channel_name}</span>
      </div>
    </div>
  );
};

export default TvCard;
