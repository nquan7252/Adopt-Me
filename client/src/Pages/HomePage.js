import React, { Component, useEffect, useState } from "react";
import "./HomePage.css";
import { images } from "../Helper/ImageHelper";
import NavBar from "../Components/NavBar";
function HomePage() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (current == images.length) setCurrent(0);
    else setTimeout(() => setCurrent(current + 1), 7000);
  }, [current]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.length != 5) alert("Please input a valid zip code");
    else window.location.href = "https://miwa.sbs/";
  };
  return (
    <div>
      <NavBar/>
      <div className="body">
        {images.map((element, index) => {
          return (
            <div className={current == index ? "slide active" : "slide"}>
              {current == index && <img src={element.link}></img>}
            </div>
          );
        })}
        <div className="content">
          <h3>Every animal deserves an opportunity</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Zip Code..."></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <footer></footer>
    </div>
  );
}

export default HomePage;
