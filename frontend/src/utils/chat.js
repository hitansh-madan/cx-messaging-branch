import axios from "axios";
var API_URL = import.meta.env.VITE_API_URL;

export const getChatById = async (id) => {
  try {
    const response = await axios.get(API_URL + "/chats/" + id);
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllChats = async () => {
  try {
    const response = await axios.get(API_URL + "/chats/");
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMessagesById = async (id) => {
  try {
    const response = await axios.get(API_URL + "/chats/" + id + "/messages");
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (senderType, senderId, name, chatId, message) => {
  try {
    axios
      .post(API_URL + "/chats/" + chatId + "/messages", {
        senderType: senderType,
        senderId: senderId,
        name: name,
        chatId: chatId,
        message: message,
      })
      .then(function (response) {
        console.log(response);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateChatById = async (id, active, assigned, assignedTo, priority) => {
  try {
    const reqObj = {
      id: id,
      active: active,
      assigned: assigned,
      assignedTo: assignedTo,
      priority: "low",
    };
    if (typeof priority === "string") {
      reqObj.priority = priority;
    }
    const response = await axios
      .post(API_URL + "/chats/update/" + id, reqObj)
      .then(function (response) {
        console.log(response);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
