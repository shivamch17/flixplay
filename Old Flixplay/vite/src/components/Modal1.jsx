import { Modal } from "antd";

const Modal1 = ({ data, handleOk, handleCancel, isModalOpen }) => {
  const {
    genres,
    id,
    imdb_id,
    title,
    runtime,
    overview,
    poster_path,
    release_date,
    vote_average,
    name,
    episode_run_time,
    first_air_date,
  } = data;

  return (
    <Modal
      title={title || name}
      width={""}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {/* <h1
        className="modal-title"
        id="exampleModalToggleLabel"
        style={{ color: "var(--bs-white)" }}
      >
        {title || name}
      </h1> */}
      <div className="cmodalbody">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w200${poster_path}`}
            className="cmodal-img"
            alt={title || name}
          />
        </div>
        <div className="info">
          <div>
            <b>
              <i>TMDB/IMDB ID: </i>
            </b>
            {id}/{imdb_id}
          </div>
          <div>
            <b>
              <i>Plot Summary: </i>
            </b>
            {overview}
          </div>
          <div>
            <b>
              <i>Genre: </i>
            </b>
            {genres?.[0]?.name} , {genres?.[1]?.name}
          </div>
          <div>
            <b>
              <i>Rating: </i>
            </b>
            {vote_average}
          </div>
          <div>
            <b>
              <i>Runtime: </i>
            </b>
            {runtime || episode_run_time}m
          </div>
          <div>
            <b>
              <i>Release Date: </i>
            </b>
            {release_date || first_air_date}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Modal1;
