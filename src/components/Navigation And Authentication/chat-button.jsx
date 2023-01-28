import React from "react";

export const ChatButton = (props) => {
  let opposite = !props.chatOpen;
  const handleChatClick = () => {
    console.log('clicked', opposite);
    props.setChatOpen(opposite);
  }
  return (
    <button className="button__chat" onClick={handleChatClick}>
      Chat
    </button>
  );
};