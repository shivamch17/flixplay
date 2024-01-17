import React from "react";

const Loader = ({loaderRef}) => {
  return (
    <div className="d-flex w-100 items-align-center justify-content-center my-4">
      <div className="loader" ref={loaderRef}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
