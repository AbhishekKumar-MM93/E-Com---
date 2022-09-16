import axios from "axios";

export const httpGet = axios.create({
  baseURL: "http://localhost:3344",
  headers: {
    publish_key: "PK_C2cZ9IGQZBCytX7wMvjevMKMP1idZ3BQopBpOg==",
    secret_key: "SK_LZnc3jfHw4d36ze55GQW3f97BTK7aE2rJBwLXEw=",
  },
});

export const httpPost = axios.create({
  baseURL: "http://localhost:3344",
  headers: {
    "Content-type": "application/json",
    publish_key: "PK_C2cZ9IGQZBCytX7wMvjevMKMP1idZ3BQopBpOg==",
    secret_key: "SK_LZnc3jfHw4d36ze55GQW3f97BTK7aE2rJBwLXEw=",
  },
});
