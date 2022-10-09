import axios from "axios";
var API_URL = import.meta.env.VITE_API_URL;

export const getSearch = async (searchKey) => {
  try {
    const response = await axios.get(API_URL + "/search", { params: { q: searchKey } });
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
