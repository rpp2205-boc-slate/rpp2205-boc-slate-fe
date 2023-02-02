import React, { useState } from 'react';

function FriendRequestList(props) {
  const [showRequests, setShowRequests] = useState(false);

  // if (props.isAuthenticated && props.user) {
    const friendRequests = props.user.received_req_from;
    console.log('friend requests', Array.isArray(friendRequests))
    if (Array.isArray(friendRequests) && props.chatOpen) {
      if (!friendRequests.length) {
        return (
          <div>
            <p>You have no pending friend requests...</p>
          </div>
        )
      } else {
        return (
        <div>
          <p>{friendRequests.length} Friends requests Pending</p>
            <ul>
              {friendRequests.map((request) => (
                <li key={request.name}>{request.name}</li>
              ))}
            </ul>
        </div>
        );
      }
    } else {
      return null;
    }
}

export default FriendRequestList;
