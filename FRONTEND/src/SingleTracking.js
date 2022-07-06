import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

function SingleTracking() {
    const [deviceId, setDeviceId] = useState("");
    const [message, setMessage] = useState("");
    const {deviceID} = useParams();
    //set device id to the obtained params device ID
    // join into the device ID room
    useEffect(() => {
        setDeviceId(deviceID);
        if (deviceId !== "") {
            socket.emit("joined_deviceID_room", deviceId);
        }
    }, [deviceID,deviceId]);
    //receive welcome message from server
    //receive live vehicle lat,lon updates from server
     useEffect(() => {
        socket.on("receive_welcome", (data) => {
          setMessage(data.message);
        });
      }, []);

    return (
        <div>
            <Link to='/'>Back to HomePage</Link>
            <h5>The Device Id</h5>
            {deviceID}
            <h6>Welcome Message from the server</h6>
            {message ? message : "No message from server!"}
        </div>
    )
}

export default SingleTracking;