import axios from "axios";

export default class HttpService{
    static client = axios.create({
        baseURL: 'http://127.0.0.1:8000/api'
    })
}