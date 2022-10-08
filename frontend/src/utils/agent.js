import axios from "axios";
var API_URL = import.meta.env.VITE_API_URL;

export const getAgentById = async (id) => {
  try {
    const response = await axios.get(API_URL+"/agents/" + id);
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAgents = async () => {
  try {
    const response = await axios.get(API_URL+"/agents/");
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
