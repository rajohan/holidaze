import React from "react";

type Props = {
    children: React.ReactNode;
    fallback: React.ReactNode;
};

type State = {
    hasError: boolean;
    error: null | Error;
};

class ErrorBoundary extends React.Component<Props, State> {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error
        };
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
