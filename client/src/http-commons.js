import axios from 'axios';
//URL PRODUCTION
const baseURL = "/api/v1/";
//URL DESARROLLO
//const baseURL = "http://localhost:5001/"
let token = "";
if(sessionStorage.getItem("vue-session-key")){
    token = JSON.parse(sessionStorage.getItem("vue-session-key")).jwt
}
export const HTTP = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`
        }
});