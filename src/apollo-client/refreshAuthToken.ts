import { API_URL, LOCAL_STORAGE_AUTH_TOKEN } from "../constants";

const refreshAuthToken = async (): Promise<string | null> => {
    const response = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": API_URL
        },
        body: JSON.stringify({
            query: "mutation { refreshAuthTokens { authToken user { id } } }"
        })
    });

    const responseJson = await response.json();

    if (responseJson.data && responseJson.data.refreshAuthTokens) {
        localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, responseJson.data.refreshAuthTokens.authToken);
        return responseJson.data.refreshAuthTokens;
    }

    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN);
    return null;
};

export { refreshAuthToken };
