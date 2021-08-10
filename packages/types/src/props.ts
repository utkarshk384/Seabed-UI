import React from "react"
import { SchemeType } from "./foundation"

/* 
	Items to ignore from `React.CSSPropties` so that it doesn't create conflicting types.
*/
type OmitItems = "translate" | "color"
type omitCSSProps = Omit<React.CSSProperties, OmitItems>

/* 
	Wrapper Type for Html Attributes
*/
type htmlAttributes<T, K extends string = string> = Omit<React.HTMLAttributes<T>, K>

/* 
	Omit 
*/

/* 
	Base type that every component extends from for their props
*/
export type DefaultPropsType<T, K extends string = string> = htmlAttributes<T, K> &
	omitCSSProps & {
		bg?: SchemeType
	}
