import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import isLoggedIn from "../Helper/isLoggedIn";
import "./Card.css";
import { useEffect } from "react";
import axios from "axios";
import { data, escapeSelector } from "jquery";
function Card(props) {
  const [loggedIn, setLoggedIn] = useState(props.loggedIn);
  const [internalSave, setInternalSave] = useState(false);

  // const [loggedIn,setLoggedIn]=useState(null);
  // useEffect(() => {
  //     isLoggedIn()
  //       .then(() => setLoggedIn(true))
  //       .catch(() => setLoggedIn(false));
  //   }, []);
  const save = () => {
    if (!loggedIn) return props.handleShowRequest();
    console.log("user want to save");
    props.save(props.data);
  };
  const unsave = () => {
    props.unsave(props.data);
  };
  return (
    <div className="card">
      {props.fromUser ? (
        <Link
          to={{
            pathname: "/pet/profile",
            search: "?id=" + props.data.id,
          }}
          state={{ data: 'fetchNew '+props.data.id }}
        >
          <img
            src={
              props.image != null
                ? props.image
                : require("../Assets/noImage.png")
            }
          ></img>
        </Link>
      ) : (
        <Link
          to={{
            pathname: "/pet/profile",
            search: "?id=" + props.data.id,
          }}
          state={{ data: props.data }}
        >
          <img
            src={
              props.image != null
                ? props.image
                : require("../Assets/noImage.png")
            }
          ></img>
        </Link>
      )}

      <div className="name-holder">
        <div>
          <h3>{props.data.name}</h3>
          {props.data.gender == "Male" ? (
            <img src={require("../Assets/male.png")}></img>
          ) : props.data.gender == "Female" ? (
            <img src={require("../Assets/female.png")}></img>
          ) : null}
        </div>
        <h5>{props.breed}</h5>
        <h5>{props.location}</h5>
        <img
          className={props.isSaved ? "heart active" : "heart"}
          src={
            props.isSaved
              ? require("../Assets/heart1.png")
              : require("../Assets/heart.png")
          }
          onClick={props.isSaved ? unsave : save}
        ></img>
      </div>
    </div>
  );
}
export default Card;
