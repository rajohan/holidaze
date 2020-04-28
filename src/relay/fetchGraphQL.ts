import axios from "axios";
import { GraphQLResponse, Variables } from "relay-runtime";

import { API_URL } from "../constants";

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

const fetchGraphQL = async (text: string | null | undefined, variables?: Variables): Promise<GraphQLResponse> => {
    const response = await axios({
        method: "post",
        url: API_URL,
        headers: {
            Authorization: `bearer test`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": API_URL
        },
        withCredentials: true,
        data: JSON.stringify({
            query: text,
            variables
        })
    });

    return response.data;
};

export { fetchGraphQL };
