import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-fsd-mse2-ik72.onrender.com/api"
});

export default API;