import { useEffect, useState } from "react";
import { sendMessage, getAllMessagesById, getAllChats } from "../utils/chat";

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
        </div>
        {/* --------------------------------------  ---------------------------------  */}
        <div className="grow px-4 pt-4 overflow-auto">
          <div className=" h-full border flex flex-col overflow-auto">
            {chats
              .filter((e) => {
                if (chatType === "mychats") return e.assignedTo === props.user.id;
                else return !(e.assigned && e.assigned === true);
              })
              .map((chatObj, index) => {
                return (
                  <ChatTile
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

  useEffect(() => {
    getMessages();
  }, [props]);

  async function getMessages() {
    console.log(props.currentChatId);
    var messageArray = await getAllMessagesById(props.currentChatId);
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
    <div
      className={`max-w-[80%] w-fit p-1.5 m-0.5 border bg ${
        msg.senderType === "agent" ? "bg-[#1CFEBA]" : "bg-white"
      }  ${msg.senderType === "agent" ? "bg-[#1CFEBA] self-end" : "bg-white"}`}
    >
      {" "}
      {msg.message}{" "}
    </div>
  );
}

function ChatTile(props) {
  let chat = props.chatObj;
  return (
    <button
      onClick={() => {
        props.setCurrentChatId(chat.id);
      }}
      className="w-full border flex flex-row p-4"
    >
      <div className="grow text-left">{chat.id}</div>
      <div className="border-2 rounded-md px-2">{chat.priority}</div>
      <div></div>
    </button>
  );
}

export default AgentDashboard;
