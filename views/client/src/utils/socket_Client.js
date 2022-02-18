import openSocket from "socket.io-client";
import * as url from "./url_api";

export const url_socket = openSocket(`${url.api_url}`);