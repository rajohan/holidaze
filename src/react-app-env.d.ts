/// <reference types="react-scripts" />s
declare module "babel-plugin-relay/macro" {
    export { graphql as default } from "react-relay";
}

declare module "react-simply-carousel";

declare module "react-date-picker" {
    export interface DatePickerProps {
        onClick?: () => void;
    }
}
