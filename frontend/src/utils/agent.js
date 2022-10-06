import axios from "axios";

export const getAgentById = async (id) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/agents/" + id);
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAgents = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/agents/");
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
