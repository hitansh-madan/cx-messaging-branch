import axios from "axios";
var API_URL = import.meta.env.VITE_API_URL;

export const getChatById = async (id) => {
  try {
    const response = await axios.get(API_URL+"/chats/" + id);
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllChats = async () => {
  // get username
  try {
    const response = await axios.get(API_URL+"/chats/");
    console.log("response  ", response);
    return Promise.all(
      response.data.map(async (el, ind) => {
        el.name = (await axios.get(API_URL+"/users/" + el.id)).data.name;
        return el;
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const getAllMessagesById = async (id) => {
  try {
    const response = await axios.get(API_URL+"/chats/" + id + "/messages");
    console.log("response  ", response);

    return Promise.all(
      response.data.map(async (el, ind) => {
        el.name = (await axios.get(API_URL+"/" + (el.senderType + "s/") + el.senderId)).data.name;
        return el;
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (senderType, senderId, chatId, message) => {
  try {
    const response = await axios
      .post(API_URL+"/chats/" + chatId + "/messages", {
        senderType: senderType,
        senderId: senderId,
        chatId: chatId,
        message: message,
      })
      .then(function (response) {
        return response.data;
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
      .post(API_URL+"/chats/update/" + id, reqObj)
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
