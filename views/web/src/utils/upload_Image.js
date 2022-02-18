import axios from "axios";
import * as url from "./url_api";
import swal from "sweetalert";

export default function Upload_Image(endpoint, formData) {
  return axios({
    method: "POST",
    url: `${url.api_url}/${endpoint}`,
    data: formData,
    headers: {
      "content-type": "multipart/form-data",
      access_token: JSON.parse(localStorage.getItem("access_token"))
    }
  }).catch(err => {
    return swal("Không tải được ảnh", "", "error");
  });
}
