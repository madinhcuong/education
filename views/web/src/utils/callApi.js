import axios from "axios";
import * as url from "./url_api";
class API {
  callApiPost(api, data) {
    return axios({
      method: "POST",
      url: `${url.api_url}/${api}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    });
    // .catch(err => {
    //     swal("ERROR", "API_CONNECT", "error");
    // })
  }

  callApiGet(api) {
    return axios({
      method: "GET",
      url: `${url.api_url}/${api}`,
      headers: {
        "Content-Type": "application/json"
      }
    });
    //.catch(err => {
    //     swal("ERROR", "API_CONNECT", "error");
    // })
  }

  callApiPut(api, access_token, data) {
    return axios({
      method: "PUT",
      url: `${url.api_url}/${api}`,
      headers: {
        access_token: `${access_token}`,
        "Content-Type": "application/json"
      },
      data: data
    });
    // .catch(err => {
    //     swal("ERROR", "API_CONNECT", "error");
    // })
  }

  callApiDelete(api, access_token) {
    return axios({
      method: "DELETE",
      url: `${url.api_url}/${api}`,
      headers: {
        access_token: `${access_token}`,
        "Content-Type": "application/json"
      }
    });
    // .catch(err => {
    //     swal("ERROR", "API_CONNECT", "error");
    // })
  }
}

export default API;
