import React from "react";
import {BsFillChatQuoteFill} from 'react-icons/bs';

export const ChatButton = (props) => {
  let opposite = !props.chatOpen;
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