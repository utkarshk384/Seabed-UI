import React, { Ref } from "react"

import type { SchemeType } from "./colors"
import type { SpacingType } from "./sizes"

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
export type DefaultPropsInterface<T = string | undefined> = {
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
	cx?: string
	sx?: React.CSSProperties
	pl?: SpacingType
} & Partial<DefaultSpacingType<T>>

export type RefObject<K> = { ref?: Ref<K> }

export type DefaultSpacingType<T = string | undefined> = {
	padding: T
	margin: T
}

export type DefaultPropsType<T, K extends string = string> = htmlAttributes<T, K> &
	DefaultPropsInterface &
	RefObject<T>
