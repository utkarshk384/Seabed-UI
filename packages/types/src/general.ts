import { ComponentType } from "react"

import { DefaultThemeType } from "./theme"
/* 
    A general type used for allowing indexing using square brackets
*/
export type Dict<T = string, K extends string | number = string> = Record<K, T>

/* 
    Type used to create HOCs with theme object
*/
export type Component<T> = ComponentType<T & { theme: DefaultThemeType }>

export type SeabedComponentType<T = Dict<unknown>> = React.ForwardRefExoticComponent<T>

/* 
    Deep Required
*/
export type DeepRequired<T> = T extends Record<string, unknown>
	? { [K in keyof T]-?: DeepRequired<T[K]> }
	: NonNullable<T>

/* 
    General Types
*/

export type StrNum = string | number
