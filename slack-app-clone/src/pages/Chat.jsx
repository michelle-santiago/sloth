import React from 'react'
import useProfile from '../hooks/useProfile';
const Chat = () => {
    const { user } = useProfile();
    console.log("chat",user);
  return (
    <div>Chat</div>
  )
}

export default Chat