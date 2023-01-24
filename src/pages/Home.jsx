import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home(props) {

  return(
    <>
      <h1> placeholder for home page... </h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </>
  );

}