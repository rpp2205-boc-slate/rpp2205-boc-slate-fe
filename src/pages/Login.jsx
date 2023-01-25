import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import "./pages.css";


export default function Login(props) {
  function submit () {
    axios.get('/login', {email, password})
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    })
}

  return(
    <>
      <Navigation />
      <div className="signupContainer">
      <form className="signupForm">
      <h2>Welcome to GamerCity!</h2>
      <p>Please fill in this form to create an account.</p>
      <hr />
        <label className="signuplabel">
          Email:
          <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="email" placeholder="Enter Email" required/>
        </label>
        <label className="signuplabel">
          Password:
          <input type="password" onChange={(e)=>{setPassword(e.target.value)}}className="password" placeholder="Enter Password" required/>
        </label>
        <button onClick={submit} className="signupButton">Log In</button>
        <p>If you don't have account, you can</p>
      </form>
      
      </div>
    </>
  );

}