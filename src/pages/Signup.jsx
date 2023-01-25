import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import {Button, Form, Container} from 'react-bootstrap';
import './pages.css';

export default function SignUp(props) {
  const [email, setEmail] = useState({email: ''});
  const [password, setPassword] = useState({password: ''});

  function submit () {
      axios.post('/signup', {email, password})
      .then(response => {
        console.log(response)
        alert("Now please log in")
      })
      .catch(err => {
        console.log(err);
      })
  }


  return(
    <>
    <Container>
    <Navigation />
    {/* <Container className="signupContainer"> */}
      {/* <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" className="email"/>
        </Form.Group>
      </Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" className="password"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Please Confirm Your Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" className="rePassword"/>
      </Form.Group>
      <Button variant="dark" type="submit" className="signupButton">
        Create 
      </Button> */}
    
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
        <label className="signuplabel">
          Repeat Password:
          <input type="password" onChange={(e)=>{setPassword(e.target.value)}}className="password" placeholder="Repeat Password" required/>
        </label>
        <button onClick={submit} className="signupButton">Create</button>
      </form>
      
      </div>
      

     </Container> 
      

    </>
  );

}