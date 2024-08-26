import axios from "axios";

const request = axios.create({
    baseURL:"https://shogly.vercel.app"
});

export default request;
