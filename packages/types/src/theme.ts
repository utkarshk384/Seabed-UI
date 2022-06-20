import * as css from "csstype"
import { DeepRequired, Dict, NestedDict } from "./general"
import { FontType } from "./typography"

/* Frequently used types */
type BasicSizes = "xs" | "sm" | "base" | "lg" | "xl" | "2xl"

/* 
	Types for colors 
*/
export type ColorsType = {
	background: string
	foreground: string
	focus?: string
	pressed?: string
}
export interface NeutralColors extends Dict<string | undefined> {
	black?: string
	white?: string
	gray?: string
}
export interface BrandColors extends Dict<ColorsType | undefined> {
	primary?: ColorsType
	secondary?: ColorsType
	accent?: ColorsType
}

export interface StatefulColors {
	success?: ColorsType
	info?: ColorsType
	warn?: ColorsType
	error?: ColorsType
	disabled?: Omit<ColorsType, "focus" | "pressed">
}

/* Types for injecting custom CSS */
export type CustomCSS = Dict<unknown> & {
	spinner?: CSSStyles
}

export type CSSStyles = {
	before?: css.Properties & Dict<string>
	body?: css.Properties & Dict<string>
	after?: css.Properties & Dict<string>
	keyframes?: NestedDict<css.Properties>
}

/* 
	Types for Border Radius.
	Config Name: borderRadius
*/
export type radiusType = BasicSizes | "3xl"
export interface radiusInterface extends Dict<string | undefined> {
	xs?: string
	sm?: string
	base?: string
	lg?: string
	xl?: string
	"2xl"?: string
	"3xl"?: string
}

/* 
	Types for breakpoints
	Config Name: breakpoints
*/
export type breakpointType = BasicSizes
export interface breakpointInterface extends Dict<string | number | undefined> {
	xs?: string | number
	sm?: string | number
	base?: string | number
	lg?: string | number
	xl?: string | number
	"2xl"?: string | number
}

/* 
	Types for shadows
	Config Name: shadows
*/
export type shadowTypes = BasicSizes | "3xl" | "outline" | "inner" | "round"
export interface shadowInterface extends Dict<string | undefined> {
	xs?: string
	sm?: string
	base?: string
	lg?: string
	xl?: string
	"2xl"?: string
	"3xl"?: string
	outline?: string
	inner?: string
	round?: string
}

/* 
	Types for Colors 
	Config Name: colors
*/
export type Colors = BrandColors & StatefulColors

export interface colorsInterface {
	light?: Colors
	dark?: Colors
	neutral?: NeutralColors
}

export type Theme = Dict<unknown> & {
	breakpoints?: breakpointInterface
	shadows?: shadowInterface
	colors?: colorsInterface
	radiusConfig?: radiusInterface
	radius?: radiusType
	fontSize?: FontType
	defaultTheme?: "light" | "dark" | "system"
	css?: CustomCSS
}

export type InternalTheme = {
	breakpoints: breakpointInterface
	shadows: shadowInterface
	colors: DeepRequired<colorsInterface>
	radiusConfig: radiusInterface
	radius: string
	fontSize: FontType
	defaultTheme: "light" | "dark" | "system"
	css?: CustomCSS
	__dark: InternalStyles
	__light: InternalStyles
} & Dict<unknown>

export type InternalStyles = { css: Dict<string>; classes: NestedDict<string>[] }
