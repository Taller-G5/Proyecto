import axios from 'axios';
const baseURL = "/api/v1/";
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