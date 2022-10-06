import axios from "axios";

export const getUserById = async (id) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/users/" + id);
    console.log("response  ", response);
    return response.data || {};
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/users/");
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
