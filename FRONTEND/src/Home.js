import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:5000");

function Home() {
    const [room, setRoom] = useState("");

    // Messages States
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    //join room function
    const joinRoom = () => {
      if (room !== "") {
        socket.emit("join_room", room);
      }
    };
    //sending message function
    const sendMessage = () => {
      socket.emit("send_message", { message, room });
    };
    //received message
    useEffect(() => {
      socket.on("receive_message", (data) => {
        setMessageReceived(data.message);
      });
    }, []);
    //user joined notification
    useEffect(() => {
      socket.on("user-joined", (socketId) =>{
        setMessageReceived(socketId)
      })
    }, []);
    //user disconnected
    useEffect(() => {
      socket.on("user-disconnected", (socketId) =>{
        setMessageReceived(socketId)
      })
    }, []);
  
    return (
      <div className="App">
        <input
          placeholder="Room Number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}> Join Room</button>
        <input
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}> Send Message</button>
        <h1> Message:</h1>
        {messageReceived}
        <br />
      </div>
    );
}

export default Home