export const IS_DEV_MODE = process.env.NODE_ENV !== "production";
export const API_URL = IS_DEV_MODE ? "http://localhost:8080/graphql" : "https://api-holidaze.herokuapp.com/graphql";
