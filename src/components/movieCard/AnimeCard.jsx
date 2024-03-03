import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const AnimeCard = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div
            className="movieCard"
            onClick={() =>{
                localStorage.setItem("current_backdrop_path",data?.thumb)
                navigate(`/player/anime/${data?.slug}`)}
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={(data?.thumb==="" || data?.thumb==null) ? PosterFallback: data?.thumb } />
                {(
                    <React.Fragment>
                        <Genres data={data} type={"anime"}/>
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data?.name}</span>
                <span className="date">
                    {data?.released_year} | (Anime)
                </span>
            </div>
        </div>
    );
};

export default AnimeCard;
