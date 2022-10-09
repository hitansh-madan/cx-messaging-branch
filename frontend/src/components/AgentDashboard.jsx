import { useEffect, useState } from "react";
import { sendMessage, getAllMessagesById, getAllChats, updateChatById } from "../utils/chat";
import io from "socket.io-client";

var API_URL = import.meta.env.VITE_API_URL;
var socket;

function AgentDashboard(props) {
  const [currentChatId, setCurrentChatId] = useState("");
  useEffect(() => {}, [currentChatId]);
  return (
    <div className="flex flex-row px-24 py-6 space-x-2">
      <AgentChatList
        className="grow"
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        user={props.user}
        userType={props.userType}
        setUser={props.setUser}
        setUserType={props.setUserType}
      />
      <AgentChat
        className="grow"
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        user={props.user}
        userType={props.userType}
        setUser={props.setUser}
        setUserType={props.setUserType}
      />
    </div>
  );
}

function AgentChatList(props) {
  const [chats, setChats] = useState([]);
  const [chatType, setChatType] = useState("mychats");

  useEffect(() => {
    getChats();
  }, []);

  async function getChats() {
    var chatArray = await getAllChats(props.user.id);
    console.log(chatArray);
    setChats(chatArray);
  }

  return (
    <div className="h-[90vh] w-1/3">
      <div className="mx-auto h-full my-3 flex flex-col border-2 bg-white text-black shadow-xl">
        <div className="px-8 pt-6 h-18 flex flex-row justify-start">
          <div className="flex flex-row justify-start">
            <div className="w-3 mr-2 bg-[#1CFEBA]"></div>
            <div className="font-sans text-xl font-bold flex flex-col justify-center">
              <div className=" font-sans text-xl font-bold">Chats</div>
            </div>
          </div>
        </div>

        <div className=" my-3 flex flex-row justify-start">
          <button
            onClick={() => {
              setChatType("mychats");
            }}
            className={`px-4 py-3 text-center font-sans text-md font-bold grow  ${
              chatType === "mychats" ? "border-b-4 border-[#1CFEBA]" : "border-b border-[#1CFEBA]"
            }`}
          >
            <h1>My Chats</h1>
          </button>
          <button
            onClick={() => {
              setChatType("unassigned");
            }}
            className={`px-4 py-3 text-center font-sans text-md font-bold grow  ${
              chatType === "unassigned" ? "border-b-4 border-[#1CFEBA]" : "border-b border-[#1CFEBA]"
            }`}
          >
            <h1>Unassigned</h1>
          </button>
          <button
            onClick={() => {
              setChatType("assigned");
            }}
            className={`px-4 py-3 text-center font-sans text-md font-bold grow  ${
              chatType === "assigned" ? "border-b-4 border-[#1CFEBA]" : "border-b border-[#1CFEBA]"
            }`}
          >
            <h1>Assigned</h1>
          </button>
        </div>
        {/* --------------------------------------  ---------------------------------  */}
        <div className="grow px-4 pt-4 overflow-auto">
          <div className=" h-full border flex flex-col overflow-auto">
            {chats
              .filter((e) => {
                if (chatType === "mychats") return e.assignedTo === props.user.id;
                else if (chatType === "unassigned") return !(e.assigned && e.assigned === true);
                else return e.assigned && e.assignedTo !== props.user.id;
              })
              .map((chatObj, index) => {
                return (
                  <ChatTile
                    user={props.user}
                    currentChatId={props.currentChatId}
                    setCurrentChatId={props.setCurrentChatId}
                    key={index}
                    chatObj={chatObj}
                  />
                );
              })}
          </div>
        </div>
        {/* ------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
}

function AgentChat(props) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    socketIO();
  }, []);

  useEffect(() => {
    getMessages();
    changeChat();
  }, [props]);

  async function socketIO() {
    socket = io(API_URL);
    socket.on("connect", () => {
      console.log("socket connected", socket.id);
    });
    socket.on("new_message", (message) => {
      setReceivedMessage(message);
    });
  }

  function changeChat() {
    if (socket) socket.emit("change_chat", props.currentChatId);
  }

  useEffect(() => {
    setMessages([...messages, receivedMessage]);
  }, [receivedMessage]);

  async function getMessages() {
    console.log(props.currentChatId);
    var messageArray = await getAllMessagesById(props.currentChatId);
    console.log(messageArray);
    setMessages(messageArray);
  }

  return (
    props.currentChatId === "" || (
      <div className="h-[90vh] grow w-1/3 ">
        <div className="mx-auto h-full my-3 flex flex-col border-2 bg-white text-black shadow-xl">
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
            <div className=" h-full bg-slate-100 p-4 flex flex-col-reverse content-end overflow-auto">
              {messages === undefined ||
                messages
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
                sendMessage(props.userType, props.user.id, props.currentChatId, newMessage);
                setNewMessage("");
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )
  );
}

function Message(props) {
  let msg = props.messageObj;
  return (
    <div className={`flex flex-col  max-w-[80%] ${msg.senderType === "agent" ? "self-end items-end" : ""}`}>
      <div className="text-[0.7rem] text-gray-500">{msg.name}</div>
      <div
        className={`w-fit px-2 py-1 m-0.5 border bg ${msg.senderType === "agent" ? "bg-[#1CFEBA]" : "bg-white"}  ${
          msg.senderType === "agent" ? "bg-[#1CFEBA]" : "bg-white"
        }`}
      >
        {msg.message}
      </div>
    </div>
  );
}

function ChatTile(props) {
  let chat = props.chatObj;
  return (
    <a
      href="#"
      onClick={() => {
        props.setCurrentChatId(chat.id);
      }}
      className="w-full border flex flex-row p-4 space-x-1"
    >
      <div className="grow text-left font-bold">{chat.name}</div>
      {chat.priority !== undefined && (
        <div
          className={`${
            chat.priority === "low"
              ? "border-amber-200"
              : chat.priority === "medium"
              ? "border-orange-500"
              : "border-red-500"
          } border-2 rounded-md px-2`}
        >
          {chat.priority}
        </div>
      )}
      {(!chat.assigned || chat.assignedTo !== props.user.id) && (
        <button
          className="border-green-500 border-2 rounded px-2 bg-green-300"
          onClick={async () => {
            updateChatById(chat.id, true, true, props.user.id, chat.priority);
          }}
        >
          Assign to Self
        </button>
      )}
    </a>
  );
}

export default AgentDashboard;
