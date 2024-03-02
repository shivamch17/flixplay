import React from "react";
import { useSelector } from "react-redux";
import { FaClosedCaptioning } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";

import "./style.scss";

const Genres = ({ data, type }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <>
      {type === "anime" ? (
        <div className="genres">
          <div className="genre">{data.type_sub}</div>
          <div className="genre" style={{ background: "black", alignItems:"center", display:"flex" , gap:"4px"}}>
            {data.type_sub === "SUB" ? (
              <FaClosedCaptioning />
            ) : (
              <FaMicrophone/>
            )}
            {" "}
            {data.latest_episode.episode}
          </div>
        </div>
      ) : (
        <div className="genres">
          {data?.map((g) => {
            if (!genres[g]?.name) return;
            return (
              <div key={g} className="genre">
                {genres[g]?.name}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Genres;
