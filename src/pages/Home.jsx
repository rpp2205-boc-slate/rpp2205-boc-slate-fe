import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";

export default function Home(props) {

  return(
    <>
      <h1> placeholder for home page... </h1>
      <Navigation />
      {/* <Link to="/login">Login</Link>
      <Link to="/signup">SignUp</Link> */}
    </>
  );

}