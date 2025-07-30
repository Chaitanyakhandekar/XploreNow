import axios from "axios";

export const api = axios.create({
    baseURL:"https://xplorenow.onrender.com/api/v1",
    withCredentials: true  // Uncomment this line
})