import axios from "axios";

export default axios.create({
    baseURL: 'https://todo-server-beryl.vercel.app'  
})