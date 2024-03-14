import axios from "axios";

const backendPort = "8080";
const serverUrl = "http://" + window.location.hostname + ":" + backendPort;

async function get(endpoint, authToken) {
  return axios.get(serverUrl + endpoint, {
    headers: {
      Authorization: `${authToken}`,
    },
  });
}

async function post(endpoint, authToken, data) {
  const bodyData = JSON.stringify(data);

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authToken}`,
    },
    body: JSON.stringify(bodyData),
  });
}
export { serverUrl };
