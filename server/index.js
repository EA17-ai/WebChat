// Import necessary modules
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { log } from "console";
import { chatmodel } from "./db.js";
import { roomModel } from "./messages.js";

// Create Express app and set up necessary middleware
const app = express();
app.use(cors());
app.use(express.json());

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a new instance of the Socket.io server
const io = new Server(server, {
  cors: {
    origin: "https://webchat-6guy.onrender.com/",
    methods: ["GET", "POST"],
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  // Handle joining a room
  socket.on("join", (roomId) => {
    socket.join(roomId);
    console.log(`User with socket Id ${socket.id} joined room ${roomId}`);
  });

  // Handle sending a message
  socket.on("sendMessage", async ({ message, name, roomId }, callback) => {
    try {
      const existingRoom = await roomModel.findOne({ roomId });

      if (existingRoom) {
        existingRoom.messages.push({
          email: name,
          message: message,
        });
        await existingRoom.save();
      } else {
        const newRoom = roomModel({
          roomId: roomId,
          messages: [{ email: name, message: message }],
        });
        await newRoom.save();
      }

      const roomData = await roomModel.findOne({ roomId });
      const messagesFromBackend = roomData.messages;

      io.to(roomId).emit("recievedMessage", messagesFromBackend);
      callback();
    } catch (error) {
      console.error("Error handling sendMessage:", error);
      callback(error);
    }
  });

  // Handle disconnection
  socket.on("disconngetUserInformationect", () => {
    log(`Socket Disconnected`);
  });
});







app.get("/getUserInformation", async (req, res) => {
  try {
    const users = await chatmodel.find({}).exec();

    res.status(200).json({  users });
  } catch (error) {
    // Handle errors appropriately, e.g., send an error response
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});







// Handle fetching chat messages
app.post("/getChatMessages", async (req, res) => {
  try {
    const roomId = req.body.roomId;
    let messagesFromBackend = [];

    const roomData = await roomModel.findOne({ roomId });

    if (roomData && roomData.messages.length !== 0) {
      messagesFromBackend = roomData.messages;
    } else {
      messagesFromBackend = [];
    }

    res.json({ messagesBackend: messagesFromBackend });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle fetching user rooms
app.post("/getUserRooms", async (req, res) => {
  const email = req.body.name;
  const user = await chatmodel.findOne({ email });
  if(user){
    const userRooms = user.rooms;
    res.json({ userRooms: userRooms });
  }
  else{
    res.json({ userRooms: [] });
  }
  
});

// Handle creating or updating a user
app.post("/create", async (req, res) => {
  try {
    const { name, room,roomname, role } = req.body;
    console.log("roomname is",roomname)
    const existingUser = await chatmodel.findOne({ email: name });

    if (existingUser) {
      existingUser.rooms.push({
        roomId: room,
        role: role,
        roomname:roomname
      });
      existingUser.save();
    } else {
      const newUser = chatmodel({
        email: name,
        rooms: [{ roomId: room,roomname:roomname, role: role }],
      });
      await newUser.save();
    }

    res.json({ message: "Room added" });
  } catch (error) {
    console.error("Error adding or updating user:", error);
  }
});



// Start the server on port 3001
server.listen(3001, () => {
  log(`Server running on port 3001`);
});
