import React, { useState } from "react";
import {BsFillChatQuoteFill} from 'react-icons/bs';

export const ChatButton = (props) => {
  console.log('chatbutton props', props.setChatOpen)
  let opposite = !props.chatOpen;
  console.log('props', props.chatOpen);
  console.log('doubleProps', props.setChatOpen);
  const handleChatClick = () => {
    console.log('clicked', opposite);
    props.setChatOpen(opposite);
  }
  return (
    // <button className="button__chat" onClick={handleChatClick}>
    //   Chat
    // </button>
    <BsFillChatQuoteFill className="button__chat" onClick={handleChatClick}></BsFillChatQuoteFill>
  );
};