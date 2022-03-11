import React, { Component, useEffect, useRef, useState } from "react";
import "./HomePage.css";
import { images } from "../Helper/ImageHelper";
import NavBar from "../Components/NavBar";
import axios from "axios";
import isLoggedIn from "../Helper/isLoggedIn";
import Contact from "../Components/Contact";
function HomePage() {
  const child1=useRef();
  const checkLogIn = () => {
    axios
      .get("http://localhost:3001/authenticate", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("AccessToken"),
        },
      })
      .then(() => setLoggedIn(true))
      .catch(setLoggedIn(false));
  };

  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    isLoggedIn()
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  }, []);

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
  const showSearch=()=>{
    child1.current.style.display="flex";
  }
  return (
    <div>
      <NavBar isLoggedIn={loggedIn}/>
      <div className="body">
        {/* {images.map((element, index) => {
          return (
            <div className={current == index ? "slide active" : "slide"}>
              {current == index && <img src={element.link}></img>}
            </div>
          );
        })} */}
        <img id='dog' src={require('../Assets/dog.png')}></img>
        <div className="content">
          <h1>Every animal<br/> deserves an opportunity<br/>and a home.</h1>
          <p>Join us today and help find a shelter for the lovely animals. </p>
          <button id='getStarted' onClick={showSearch}>FIND A PET</button>
          <button id='learnMore'>LEARN MORE</button>
          <form ref={child1} id='searchForm' onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Zip Code..."></input>
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <section className="page2">
          <div className="data">
              <div>
                <h2>6.5 Millions +</h2>
                <p>The amount of companion animals are transferred to shelters each year in the US</p>
              </div>
              <div>
                <h2>50%</h2>
                <p>Approximately half of them are adopted into a household</p>
              </div><div>
                <h2>12</h2>
                <p>On average, there are 12 animals that are transfered to shelters per minute in the US</p>
              </div>
          </div>
          <div className="animal">
            <div className="img-container">
          <img src={require('../Assets/cat.jpg')}></img>
          <img src={require('../Assets/bird.jpg')}></img>
          <img src={require('../Assets/rabbit.jpg')}></img>
          <img src={require('../Assets/dogcat.jpg')}></img>
          <img src={require('../Assets/fish.jpg')}></img>
          </div>
            <div>
                <h1>Why choose us?</h1>
              <p>
                AdoptMe is a non-profit service based in San Diego and run by a college student. We guarantee to provide accurate and up-to-date data from accross the country 
                and it is our mission to help the animals in needs get a better home. This service acts as an intermediary connection between our clients and animal shelters.
              </p>
            </div>
          </div>
      </section>
  
    </div>
  );
}

export default HomePage;
