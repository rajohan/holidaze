/// <reference types="react-scripts" />
declare module "react-simply-carousel";
declare module "react-super-responsive-table";
declare module "react-star-picker";

declare module "react-date-picker" {
    export interface DatePickerProps {
        onClick?: () => void;
    }
}
