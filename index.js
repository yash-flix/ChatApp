const http = require("http");
const express = require("express");
const app = express();
const path = require("path");

//  HTTP server
const server = http.createServer(app);

// Setup Socket.io
const { Server } = require("socket.io");
const io = new Server(server);

// Socket.io logic
io.on("connection", (socket) => {
    console.log("A new user connected");

    socket.on("user-message", (message) => {
        console.log("A new user message:", message);
        io.emit("server-message", message); 
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});


app.use(express.static(path.resolve("./public")));


server.listen(9000, () => {
    console.log("✅ Server is running on http://localhost:9000");
});
