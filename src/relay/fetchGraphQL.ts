import axios from "axios";
import { GraphQLResponse, Variables } from "relay-runtime";

import { API_URL } from "../constants";

const axiosInstance = axios.create();

const fetchGraphQL = async (text: string | null | undefined, variables?: Variables): Promise<GraphQLResponse> => {
    const response = await axiosInstance({
        method: "post",
        url: API_URL,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": API_URL
        },
        withCredentials: true,
        data: JSON.stringify({
            query: text,
            variables
        })
    });

    if (response.data && response.data.errors) {
        return Promise.reject(response.data.errors[0]);
    }

    return Promise.resolve(response.data);
};

export { fetchGraphQL, axiosInstance };
