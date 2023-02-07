import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalComponent from './modal.jsx';


export default function EditProfileButton(props) {
  return (
    <div>
      <ModalComponent selfProfile={props.selfProfile} changeImage={props.changeImage} changeFirstName={props.changeFirstName} changeLastName={props.changeLastName} changeName={props.changeName}/>
    </div>
  )
}