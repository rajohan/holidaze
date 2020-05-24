import { API_URL, LOCAL_STORAGE_AUTH_TOKEN } from "../constants";
import { RefreshAuthTokens_refreshAuthTokens } from "../GraphQL/__generated__/RefreshAuthTokens";

const refreshAuthToken = async (): Promise<RefreshAuthTokens_refreshAuthTokens | null> => {
    const response = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": API_URL
        },
        body: JSON.stringify({
            query: "mutation { refreshAuthTokens { authToken user { id, username, email, accessLevel } } }"
        })
    });

    const responseJson = await response.json();

    if (responseJson.data && responseJson.data.refreshAuthTokens) {
        localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, responseJson.data.refreshAuthTokens.authToken);
        return {
            __typename: "UserWithTokenType",
            authToken: responseJson.data.refreshAuthTokens.authToken,
            user: responseJson.data.refreshAuthTokens.user
        };
    }

    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN);
    return null;
};

export { refreshAuthToken };
