import { css } from "styled-components";

export const cssReset = css`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        min-height: 100vh;
        width: 100vw;
        max-width: 100%;
        margin: 0;
        line-height: 1.3;
    }

    header,
    nav,
    main,
    footer,
    section,
    article,
    aside,
    figure,
    figcaption {
        display: block;
        margin: 0;
        padding: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    form {
        margin: 0;
    }

    ul,
    ol,
    dd,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        color: inherit;
    }

    img {
        display: block;
        max-width: 100%;
        user-select: none;
    }

    svg {
        display: inline-block;
        width: 0;
        height: 0;
        vertical-align: middle;
        fill: currentColor;
        user-select: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    legend,
    fieldset {
        border: 0;
        margin: 0;
        padding: 0;
    }

    button,
    input[type="button"],
    input[type="reset"],
    input[type="submit"] {
        background-color: transparent;
        border-width: 0;
        padding: 0;
        cursor: pointer;
        color: inherit;
        user-select: none;
    }

    button[disabled],
    input[disabled] {
        cursor: default;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
    }

    textarea {
        resize: vertical;
        vertical-align: bottom;
    }

    input::-ms-clear {
        display: none;
    }
`;
