import axios from "axios";
import type { AlertInterface } from "../types/interfaces/AlertInterface";

const url = "/data/alert.json";

export const addAlert = async (data: AlertInterface) => {
  await axios
    .post(url, data, {
      headers: {
        Authorization: "Bearer your_token_here",
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
