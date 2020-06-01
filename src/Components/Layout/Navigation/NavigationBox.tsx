import React, { useEffect } from "react";
import styled from "styled-components";

const StyledNavigationBox = styled.div<{ show: boolean; navBoxNumber: number }>`
    background-color: ${(props): string => props.theme.colors.secondary};
    filter: ${(props): string => props.theme.dropShadows.small};
    position: absolute;
    right: 0;
    width: 250px;
    z-index: 1000;
    margin-top: 20px;
    padding: ${(props): string => (props.show ? "5px" : "0 5px")};
    visibility: ${(props): string => (props.show ? "visible" : "hidden")};
    opacity: ${(props): string => (props.show ? "1" : "0")};
    transition: background-color 0.3s, margin 0.3s, padding 0.3s, visibility 0.3s, opacity 0.3s;
    transition-timing-function: linear;

    &::before {
        content: "";
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 14px solid ${(props): string => props.theme.colors.secondary};
        position: absolute;
        top: -14px;
        right: ${(props): number => (props.navBoxNumber === 1 ? 10 : 70)}px;

        @media only screen and (min-width: 400px) {
            right: 10px;
        }
    }

    @media only screen and (min-width: 350px) {
        width: 300px;
    }
`;

type Props = {
    show: boolean;
    setShow: (show: boolean) => void;
    navRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    navBoxNumber: number;
};

const NavigationBox: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { show, setShow, navRef, children, navBoxNumber } = props;

    // Close navigation menu on mouse click outside the component
    useEffect(() => {
        const handleMouseDownOutsideComponent = (event: MouseEvent): void => {
            if (navRef.current) {
                !navRef.current.contains(event.target as Node) && setShow(false);
            }
        };

        document.addEventListener("mousedown", handleMouseDownOutsideComponent);

        return (): void => {
            document.removeEventListener("mousedown", handleMouseDownOutsideComponent);
        };
    }, [navRef, setShow]);

    return (
        <StyledNavigationBox show={show} navBoxNumber={navBoxNumber}>
            {children}
        </StyledNavigationBox>
    );
};

export default NavigationBox;
