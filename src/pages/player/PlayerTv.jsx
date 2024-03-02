import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import oridata from "../../assets/keys.json";
import "shaka-player/dist/controls.css";
import shaka from "shaka-player/dist/shaka-player.ui.js";

const PlayerTv = () => {
  const videoComponent = useRef(null);
  const videoContainer = useRef(null);
  const { id } = useParams();
  const data = oridata.find((item) => item.channel_id == id);

  const onErrorEvent = (event) => {
    onError(event.detail);
  };

  const onError = (error) => {
    console.error("Error code", error.code, "object", error);
  };

  useEffect(() => {
    const manifestUri = data.channel_url;

    const video = videoComponent.current;
    const container = videoContainer.current;
    const player = new shaka.Player(video);
    const keys = data.key[0].split(":");
    const clearKeysObject = {};
    clearKeysObject[keys[0]] = keys[1];

    player.configure({
      drm: {
        clearKeys: clearKeysObject,
      },
    });

    const uiConfig = {
      enableTooltips: true,
      controlPanelElements: [
        "play_pause",
        "mute",
        "volume",
        "fullscreen",
        "overflow_menu",
        "captions",
      ],
    };

    const ui = new shaka.ui.Overlay(player, container, video);
    ui.configure(uiConfig);
    ui.getControls();

    player.addEventListener("error", onErrorEvent);

    player
      .load(manifestUri)
      .then(() => {
        console.log("The video has now been loaded!");
      })
      .catch(onError);

    return () => {
      player.removeEventListener("error", onErrorEvent);
      player.destroy();
    };
  }, []);

  return (
    <div id="player1">
      <div className="video-container" id="ddplayer" ref={videoContainer}>
        <video
          autoPlay
          className="shaka-video"
          ref={videoComponent}
          poster={
            data.channel_logo.includes("https://ltsk-cdn.s3")
              ? "https://mediaready.videoready.tv/tatasky-epg/image/fetch/f_auto,fl_lossy,q_auto,dpr_6.75,w_80/" +
                data.channel_logo
              : data.channel_logo
          }
        />
      </div>
    </div>
  );
};

export default PlayerTv;
