import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const BACKEND_LINK="http://localhost:3001"
const socket = io(BACKEND_LINK);

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [roomName,setRoomName]=useState("")

  useEffect(() => {
    const fetchUserRooms = async () => {
      try {
        const name = localStorage.getItem("username");
        setName(name);
        const response = await axios.post("http://localhost:3001/getUserRooms", { name });
        setUserRooms(response.data.userRooms);
      } catch (error) {
        console.error('Error fetching user rooms:', error);
      }
    };

    fetchUserRooms();
  }, []);

  useEffect(() => {
    socket.on("recievedMessage", (messagesFromBackend) => {
      setMessages(messagesFromBackend);
    });
  }, [setMessages]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { message, name, roomId }, () => {
      setMessage("");
    });
  };

  const copyRoomIdToClipboard = (roomId) => {
    navigator.clipboard.writeText(roomId)
      .then(() => {
        alert(`Room ID ${roomId} copied to clipboard`);
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  const changeRoomData = async (roomId,roomname) => {
    socket.emit("join", roomId);
    setRoomId(roomId);
    setRoomName(roomname)
    const response = await axios.post("http://localhost:3001/getChatMessages", { roomId });
    setMessages(response.data.messagesBackend);
  };

  return (
    <div className="flex">
      <div className="w-1/4 h-screen border-r-black border-2 overflow-y-scroll">
        <div className="bg-blue-400 text-black px-2 py-2">
          <h1>Chats <span className="flex ml-auto text-white">({name})</span></h1>
        </div>
        {userRooms.map((room, index) => (
          <div key={index} className="border-b-black border-2 px-1 py-1 bg-white justify-center">
            <div>
              <button className="text-black font-bold px-2 py-2" onClick={
                () =>{
                  changeRoomData(room.roomId,room.roomname)
                  } }>{room.roomname}</button>
              <span className="text-xs ml-auto text-purple-500">{room.role}</span>
            </div>
            <div className="ml-auto">
              <button className="bg-blue-500 text-white px-1 py-1 rounded-lg" onClick={() => copyRoomIdToClipboard(room.roomId)}>
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-3/4 h-screen flex flex-col">
        {roomId ? (
          <>
            <div className="bg-gray-200 flex-1 overflow-y-scroll">
              <div className="px-2 py-3 bg-white w-full font-serif "><h1 className="ml-6 text-blue-500 font-serif font-bold text-xl">{roomName}</h1></div>
              <div className="px-4 py-2">
                {messages.map((message, index) => (
                  <div key={index}>
                    <div className={message.email === name ? ("flex items-center mb-2 justify-end") : ("flex items-center mb-2")}>
                      <div className={message.email === name ? "bg-blue-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm" : "bg-white rounded-lg p-2 shadow mb-2 max-w-sm"}>
                        {message.message}
                      </div>
                      <img className="w-8 h-8 rounded-full mr-2" src="https://picsum.photos/50/50" alt="User Avatar" />
                      {message.email !== name ? (<div className="font-medium">{message.email}</div>) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 px-4 py-2">
              <div className="flex items-center">
                <input
                  className="w-full border rounded-full py-2 px-4 mr-2"
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center h-screen items-center"><h1 className="text-3xl font-serif font-bold">Select a Room</h1></div>
        )}
      </div>
    </div>
  );
}

export default Chat;
