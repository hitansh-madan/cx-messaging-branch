import axios from "axios";
var API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL", API_URL);

export const getUserById = async (id) => {
  try {
    const response = await axios.get(API_URL+"/users/" + id);
    console.log("response  ", response);
    return response.data || {};
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL+"/users/");
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
