// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/tvshows" element={<Series/>}/>
        <Route exact path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
};

export default App;
