import React, { Component, useEffect, useRef, useState } from "react";
import "./HomePage.css";
import { images } from "../Helper/ImageHelper";
import NavBar from "../Components/NavBar";
import axios from "axios";
import isLoggedIn from "../Helper/isLoggedIn";
import Contact from "../Components/Contact";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const child1 = useRef();
  const navigate = useNavigate();
  const checkLogIn = () => {
    axios
      .get("https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/authenticate", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("AccessToken"),
        },
      })
      .then(() => setLoggedIn(true))
      .catch(setLoggedIn(false));
  };

  const [loggedIn, setLoggedIn] = useState(async () => {
    axios
      .get("https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/avatar", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("AccessToken"),
        },
      })
      .then((res) => setLoggedIn(res.data))
      .catch((err) => {
        console.log(err.response.data);
        setLoggedIn(false);
      });
  });

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (current == images.length) setCurrent(0);
    else setTimeout(() => setCurrent(current + 1), 7000);
  }, [current]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.length != 5) alert("Please input a valid zip code");
    else
      navigate(
        `/search/1?location=${e.target[0].value}&type=&coat=&color=&gender=`
      );
  };
  const showSearch = () => {
    $("#searchForm").slideToggle();
  };
  return (
    <div>
      <NavBar isLoggedIn={loggedIn} />
      <div className="body">
        {/* {images.map((element, index) => {
          return (
            <div className={current == index ? "slide active" : "slide"}>
              {current == index && <img src={element.link}></img>}
            </div>
          );
        })} */}
        <img id="dog" src={require("../Assets/dog.png")}></img>
        <div className="content">
          <h1>
            Every animal
            <br /> deserves an opportunity
            <br />
            and a home.
          </h1>
          <p>Join us today and help find a shelter for the lovely animals. </p>
          <button id="getStarted" onClick={showSearch}>
            FIND A PET
          </button>
          <button id="learnMore">LEARN MORE</button>
          <form ref={child1} id="searchForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Zip Code..."></input>
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className="data">
        <h3>Did You Know?</h3>
          <div>
            <img src={require('../Assets/doggy.png')}></img>
            <h2>6.5 Millions +</h2>
            <p>
              The amount of companion animals are transferred to shelters each
              year in the US
            </p>
          </div>
          <div>
          <img src={require('../Assets/catty.png')}></img>
            <h2>50%</h2>
            <p>Approximately half of them are adopted into a household</p>
          </div>
          <div>
          <img src={require('../Assets/hamster.png')}></img>
            <h2>12</h2>
            <p>
              On average, there are 12 animals that are transfered to shelters
              per minute in the US
            </p>
          </div>
        </div>
      <section className="page2">
        
        <div className="animal">
          {/* <div className="img-container">
            <img src={require("../Assets/cat.jpg")}></img>
            <img src={require("../Assets/bird.jpg")}></img>
            <img src={require("../Assets/rabbit.jpg")}></img>
            <img src={require("../Assets/dogcat.jpg")}></img>
            <img src={require("../Assets/fish.jpg")}></img>
          </div> */}
          <div className="left">
          <div>
          <img src={require("../Assets/animalcare.png")}></img>
          <div>
            <h4>Dedicated to save animals</h4>
            <p>
              A space where we love the animals and so can you, scroll through a
              variety of pets and pick one of your favorites{" "}
            </p>
          </div>
        </div>
        <div>
          <img src={require("../Assets/heartpaw.png")}></img>
          <div>
            <h4>Accurate and live data</h4>
            <p>Our data is updated every hour</p>
          </div>
        </div>
        <div>
          <img src={require("../Assets/free.png")}></img>
          <div>
            <h4>Cost-free, quick and easy to use</h4>
            <p>
              No credit card or subscription required. However, there will be
              adoption fees that vary from shelter to shelter
            </p>
          </div>
        </div>
        <div>
          <img src={require("../Assets/security-shield.png")}></img>
          <div>
            <h4>Trust-worthy and safe</h4>
            <p>
              Our data is collected through a trust-worthy network of animal
              shelters across the United States
            </p>
          </div>
        </div>
          </div>
          <div>
            <h1>Why choose us?</h1>
            <p>
              AdoptMe is a non-profit service based in San Diego and run by a
              college student. We guarantee to provide accurate and up-to-date
              data from accross the country and it is our mission to help the
              animals in needs get a better home. This service acts as an
              intermediary connection between our clients and animal shelters.
            </p>
            <Link to="/search/1?location=&#38;type=&#38;coat=&#38;color=&#38;gender=">            
            <span>Get Started Now</span>
            <img src={require('../Assets/right-arrow.png')}></img>
            </Link>
          </div>
        </div>
      </section>
      {/* <section className="page3">
        <div>
          <img src={require("../Assets/animalcare.png")}></img>
          <div>
            <h4>Dedicated to save animals</h4>
            <p>
              A space where we love the animals and so can you, scroll through a
              variety of pets and pick one of your favorites{" "}
            </p>
          </div>
        </div>
        <div>
          <img src={require("../Assets/heartpaw.png")}></img>
          <div>
            <h4>Accurate and live data</h4>
            <p>Our data is updated every hour</p>
          </div>
        </div>
        <div>
          <img src={require("../Assets/free.png")}></img>
          <div>
            <h4>Cost-free, quick and easy to use</h4>
            <p>
              No credit card or subscription required. However, there will be
              adoption fees that vary from shelter to shelter
            </p>
          </div>
        </div>
        <div>
          <img src={require("../Assets/security-shield.png")}></img>
          <div>
            <h4>Trust-worthy and safe</h4>
            <p>
              Our data is collected through a trust-worthy network of animal
              shelters across the United States
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default HomePage;
  