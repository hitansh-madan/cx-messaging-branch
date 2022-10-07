import axios from "axios";

export const getChatById = async (id) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/chats/" + id);
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllChats = async () => {
    // get username
  try {
    const response = await axios.get("http://127.0.0.1:5000/chats/");
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMessagesById = async (id) => {
    // get agent name
  try {
    const response = await axios.get("http://127.0.0.1:5000/chats/" + id + "/messages");
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (senderType, senderId, chatId, message) => {
  try {
    const response = await axios
      .post("http://127.0.0.1:5000/chats/" + chatId + "/messages", {
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
    };
    if (typeof priority === "string") {
      reqObj.priority = priority;
    }
    const response = await axios
      .post("http://127.0.0.1:5000/chats/" + id, reqObj)
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
