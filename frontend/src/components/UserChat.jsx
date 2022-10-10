import { useEffect, useState } from "react";
import { sendMessage, getAllMessagesById } from "../utils/chat";
import io from "socket.io-client";

var API_URL = import.meta.env.VITE_API_URL;
var socket;

function UserChat(props) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    getMessages();
    socketIO();
  }, []);

  async function socketIO() {
    socket = io(API_URL);
    socket.on("connect", () => {
      console.log("socket connected", socket.id);
    });

    socket.emit("join_chat", props.user.id);

    socket.on("new_message", (message) => {
      setReceivedMessage(message);
    });
  }

  useEffect(() => {
    setMessages([...messages, receivedMessage]);
  }, [receivedMessage]);

  async function getMessages() {
    var messageArray = await getAllMessagesById(props.user.id);
    console.log(messageArray);
    setMessages(messageArray);
  }

  return (
    <div className="h-[90vh]">
      <div className="mx-auto h-full my-3 flex min-w-[450px] w-1/3 flex-col border-2 bg-white text-black shadow-xl">
        <div className="px-8 pt-6 h-18 flex flex-row justify-between">
          <div className="flex flex-row justify-start">
            <div className="w-3 mr-2 bg-[#1CFEBA]"></div>
            <div className="font-sans text-xl font-bold flex flex-col justify-center">
              <div className=" font-sans text-xl font-bold">Support</div>
            </div>
          </div>
          <button
            className="h-12 px-5 border bg-[#1CFEBA] font-sans font-bold"
            onClick={() => {
              window.sessionStorage.setItem("user", JSON.stringify({}));
              window.sessionStorage.setItem("userType", "");
              props.setUser({});
              props.setUserType("");
            }}
          >
            Logout
          </button>
        </div>
        {/* --------------------------------------  ---------------------------------  */}
        <div className="grow px-4 pt-4 overflow-auto">
          <div className=" h-full bg-slate-100 p-4 flex flex-col-reverse overflow-auto">
            {messages
              .slice(0)
              .reverse()
              .map((messageObj, index) => {
                return <Message key={index} messageObj={messageObj} />;
              })}
          </div>
        </div>
        {/* ------------------------------------------------------------------------------- */}
        <div className="h-20 px-4 py-4 flex flex-row">
          <input
            className="grow px-2 mr-2 border"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="h-12 px-5 border bg-[#1CFEBA] font-sans font-bold"
            onClick={() => {
              console.log(newMessage);
              sendMessage(props.userType, props.user.id, props.user.name, props.user.id, newMessage);
              setNewMessage("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function Message(props) {
  let msg = props.messageObj;
  return (
    <div
      className={`max-w-[80%] w-fit p-1.5 m-0.5 border bg ${msg.senderType === "user" ? "bg-[#1CFEBA]" : "bg-white"}  ${
        msg.senderType === "user" ? "bg-[#1CFEBA] self-end" : "bg-white"
      }`}
    >
      {" "}
      {msg.message}{" "}
    </div>
  );
}

export default UserChat;
