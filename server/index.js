import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { log } from "console";
import { chatmodel } from "./db.js";
import { roomModel } from "./messages.js";
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  //send message recieved back to frontend
  socket.on("sendMessage", async ({ message, name, roomId }) => {
    /* console.log('Message is', message);
        console.log("name is",name)
        console.log("RoomID is",roomId)
         */
    const existingRoom = await roomModel.findOne({ roomId });
    //console.log("Existing room is",typeof existingRoom)
    if (existingRoom) {
      existingRoom.messages.push({
        email: name,
        message: message,
      });
      existingRoom.save();
    } else {
      const newRoom = roomModel({
        roomId: roomId,
        messages: [{ email: name, message: message }],
      });
      await newRoom.save();
    }
    const roomdata = await roomModel.findOne({ roomId });
    //console.log("room data",roomdata.messages)
    const messagefromBackend=roomdata.messages
    socket.emit("recievedMessage",messagefromBackend) 

   //const messages=getMessageFromRoom(roomId)
   // socket.emit("recievedMessage",{newmessages:getMessageFromRoom(roomId)})
  });

  socket.on("disconnect", () => {
    log(`Socket Disconnected`);
  });
});

app.post("/getChatMessages", async (req, res) => {
    try {
      const roomId = req.body.roomId;
      let messageFromBackend = [];
  
      const roomData = await roomModel.findOne({ roomId });
  
      if (roomData && roomData.messages.length !== 0) {
        messageFromBackend = roomData.messages;
      } else {
        messageFromBackend = [];
      }
  
      res.json({ messagesBackend: messageFromBackend });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

app.post("/getUserRooms", async (req, res) => {
  const email = req.body.name;
  const user = await chatmodel.findOne({ email });
  //console.log("user is",user)
  const userRooms = user.rooms;
  //console.log("userrooms are", typeof userRooms);
  res.json({ userRooms: userRooms });
});

app.post("/create", async (req, res) => {
  try {
    const { name, room, role } = req.body;
    const existingUser = await chatmodel.findOne({ email: name });
    if (existingUser) {
      existingUser.rooms.push({
        roomId: room,
        role: role,
      });
      existingUser.save();
    } else {
      const newUser = chatmodel({
        email: name,
        rooms: [{ roomId: room, role: role }],
      });
      await newUser.save();
      //  console.log('New user created successfully:', newUser);
    }
  
    res.json({ message: "Room added" });
  } catch (error) {
    console.error("Error adding or updating user:", error);
  }
});

server.listen(3001, () => {
  log(`Server running on port 3001`);
});
