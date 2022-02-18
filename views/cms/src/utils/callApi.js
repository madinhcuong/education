import axios from "axios";
import * as url from "./url_api";
class API {
  callApiPost(api, access_token, data) {
    return axios({
      method: "POST",
      url: `${url.api_url}/${api}`,
      headers: {
        access_token: `${access_token}`,
        "Content-Type": "application/json",
      },
      data: data,
    });
  }

  Import(api, access_token, formData) {
    return axios({
      method: "POST",
      url: `${url.api_url}/${api}`,
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
        access_token: `${access_token}`,
      },
    });
  }

  callApiGet(api, access_token) {
    return axios({
      method: "GET",
      url: `${url.api_url}/${api}`,
      headers: {
        access_token: `${access_token}`,
        "Content-Type": "application/json",
      },
    });
  }

  callApiPut(api, access_token, data) {
    return axios({
      method: "PUT",
      url: `${url.api_url}/${api}`,
      headers: {
        access_token: `${access_token}`,
        "Content-Type": "application/json",
      },
      data: data,
    });
  }

  callApiDelete(api, access_token) {
    return axios({
      method: "DELETE",
      url: `${url.api_url}/${api}`,
      headers: {
        access_token: `${access_token}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export default API;
