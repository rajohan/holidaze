import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledLoading = styled.div<{ color: "dark" | "light" }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column: 1 / -1;
    justify-self: center;
    color: ${(props): string => (props.color === "light" ? props.theme.colors.secondary : props.theme.colors.primary)};
    margin: 10px;
`;

const LoadingCircle = styled.div<{ color: "dark" | "light" }>`
    width: 30px;
    height: 30px;
    border: 6px solid
        ${(props): string => (props.color === "light" ? props.theme.colors.secondary : props.theme.colors.tertiary)};
    border-top: 6px solid
        ${(props): string => (props.color === "light" ? props.theme.colors.tertiary : props.theme.colors.tertiaryDark)};
    border-radius: 100px;
    margin: 10px;
    animation: load 1s linear infinite;

    @keyframes load {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const LoadingDots = styled.div`
    span {
        span {
            animation: dot-1 1s infinite steps(1);

            & + span {
                animation-name: dot-2;

                & + span {
                    animation-name: dot-3;
                }
            }
        }
    }

    @keyframes dot-1 {
        from {
            opacity: 0;
        }
        25% {
            opacity: 1;
        }
    }
    @keyframes dot-2 {
        from {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
    @keyframes dot-3 {
        from {
            opacity: 0;
        }
        75% {
            opacity: 1;
        }
    }
`;

type Props = {
    text?: string;
    className?: string;
    color?: "dark" | "light";
};

const Loading: React.FC<Props> = (props: PropsWithChildren<Props>): React.ReactElement => {
    const { text, className, color = "light" } = props;

    return (
        <StyledLoading className={className} color={color}>
            <LoadingCircle color={color} />
            <LoadingDots>
                <span>
                    {text || "Loading"}
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </LoadingDots>
        </StyledLoading>
    );
};

export default Loading;
