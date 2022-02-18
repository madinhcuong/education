import axios from "axios";
import * as url from "./url_api";
import { message } from "antd";

export default function Import(api, formData) {
  return axios({
    method: "POST",
    url: `${url.api_url}/${api}`,
    data: formData,
    headers: {
      "content-type": "multipart/form-data",
      access_token: JSON.parse(localStorage.getItem("access_token_client"))
    }
  })
    .then(success => {
      message.success("Import điểm thành công", 3);
    })
    .catch(err => {
      message.success("Import điểm không thành công", 3);
    });
}
