import React from "react"
import { SchemeType, SpacingType } from "./foundation"

/* 
	Items to ignore from `React.CSS properties` so that it doesn't create conflicting types.
	type OmitItems = "translate" | "color" | "direction"
	type omitCSSProps = Omit<React.CSSProperties, OmitItems>
	*/

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
export type DefaultProps = {
	bg?: SchemeType
	m?: SpacingType
	mt?: SpacingType
	mr?: SpacingType
	mb?: SpacingType
	ml?: SpacingType
	p?: SpacingType
	pt?: SpacingType
	pr?: SpacingType
	pb?: SpacingType
	pl?: SpacingType
}

export type DefaultPropsType<T, K extends string = string> = htmlAttributes<T, K> & DefaultProps
