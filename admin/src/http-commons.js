import axios from 'axios';
//URL PRODUCTION
const baseURL = "/api/v1/";
//URL DESARROLLO

let token = "";
if(sessionStorage.getItem("vue-session-key")){
    token = JSON.parse(sessionStorage.getItem("vue-session-key")).jwt
}
/*export const HTTP = {
    url_user:getAxios("http://localhost:5001/"),
    url_product:getAxios("http://localhost:5002/"),
    url_venta:getAxios("http://localhost:5003/"),
    url_detalle:getAxios("http://localhost:5004/")
};*/

export const HTTP = {
    url_user:getAxios(`${baseURL}user/`),
    url_product:getAxios(`${baseURL}product/`),
    url_venta:getAxios(`${baseURL}venta/`),
    url_detalle:getAxios(`${baseURL}detalle/`)
};

function getAxios(url){
    return axios.create({
        baseURL: url,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}