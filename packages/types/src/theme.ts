import { Dict } from "./general"
import * as css from "csstype"
import { DeepRequired } from "."

export type SizeType = "sm" | "md" | "lg" | "xl" | "2xl"
export type BorderRadiusType = "none" | "full" | SizeType | number

/* 
	Type for the `breakpoint` property in the theme object
*/
export type BreakpointType = Dict<string | number> & {
	"2xl"?: string | number
	xl?: string | number
	lg?: string | number
	md?: string | number
	sm?: string | number
	xs?: string | number
}

export type BrandColors = Dict<string> & {
	primary: string
	secondary: string
	accent: string
}

export type ThemedColors = Dict<string | Dict<string>> & {
	brand?: BrandColors
	text?: string
	bg?: string
	states?: StateColors
}

export type StateColors = {
	hover?: string
	focus?: string
	pressed?: string
	disabled?: string
	dragged?: string
}

export type Colors = {
	light?: ThemedColors
	dark?: ThemedColors
	success?: string
	info?: string
	warning?: string
	error?: string
}

export type CustomTheme = Dict<unknown> & {
	colors?: Colors & Dict<string | Dict<Dict<string> | string>>
	borderRadius?: BorderRadiusType
	useSystemColors?: boolean
	css?: CustomCSS
}

export type CustomCSS = Dict<unknown> & {
	spinner?: CSSStyles
}

export type CSSStyles = {
	before?: css.Properties & Dict<string>
	body?: css.Properties & Dict<string>
	after?: css.Properties & Dict<string>
	keyframes?: Dict<Dict<css.Properties>>
}

export type ThemeType = CustomTheme | "dark" | "light"
export type InternalTheme = {
	colors: DeepRequired<Colors & Dict<string | Dict<Dict<string> | string>>>
	borderRadius: string
	useSystemColors: boolean
	css?: CustomCSS
}
