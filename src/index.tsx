import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RelayEnvironmentProvider } from "react-relay/hooks";

import { StoreProvider } from "./store";
import RelayEnvironment from "./relay/RelayEnvironment";

import App from "./Components/App";

const Root: React.FC = (): React.ReactElement => {
    return (
        <React.StrictMode>
            <StoreProvider>
                <RelayEnvironmentProvider environment={RelayEnvironment}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </RelayEnvironmentProvider>
            </StoreProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Root />);
