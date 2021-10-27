/// <reference types="react" />
import type { DefaultSpacingType } from "@seabedui/types";
declare type PropsType = DefaultSpacingType & {
    style?: React.CSSProperties;
    className?: string;
    sx?: React.CSSProperties;
    cx?: string;
};
export declare const SeabedFactory: React.FC<PropsType>;
export {};
