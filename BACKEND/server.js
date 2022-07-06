const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
//allowing cors middleware in the nodejs app
app.use(cors());
//allowing node to serve static content
app.use(express.static(path.join(__dirname, 'public')));

//initializing a socket io server
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
});
let main_room;
//automate io functions
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (room) => {
      socket.join(room);
      io.to(room).emit("user-joined", socket.id);
      main_room=room;
    });

    socket.on("joined_deviceID_room", (device_room) => {
        socket.join(device_room);
        console.log(`Device Connected: ${socket.id} to room ${device_room}`);
        io.to(device_room).emit("receive_welcome",{message: `Welcome to Device Room ${device_room}!!!`});
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on('disconnect', (reason) => {
        if (reason === "io server disconnect"){
            setTimeout(() => {
                socket.connect();
            }, 5000);
        }
        console.log("Socket Disconnected: "+socket.id);
    });

    socket.on("connect_error", () => {
        console.log("Wait as the socket establishes a new connection!")
        setTimeout(() => {
            socket.connect();
        }, 5000);
    });

    socket.on("reconnect_error", (error) => {
        console.log("Socket failed to reconnect: "+error);
    });

    socket.on("reconnect_failed", () => {
        console.log("Reconnecting to the server failed!");
    });

});



server.listen(5000, () => {
console.log("SOCKET SERVER IS RUNNING");
});


