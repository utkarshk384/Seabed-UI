import type { TypographyType } from "./typography"
import type { ColorsType, RequiredColorsType } from "./colors"
import type { PaletteType, SizeType, ColorSchemeType } from "./foundation"
import type { DeepRequired, Dict } from "./general"

/* 
    Typings for the `borderRadius` of the theme object.
*/
export type BorderRadiusType = "none" | "full" | SizeType | number

/* 
	Type for the `breakpoint` property in the theme object
*/
export type BreakpointType = Dict<number> & {
	"2xl"?: string | number
	xl?: string | number
	lg?: string | number
	md?: string | number
	sm?: string | number
	xs?: string | number
}

/* 
	Typings for the base theme object.
*/
type baseThemeType = {
	borderRadius?: BorderRadiusType
	breakpoints?: BreakpointType
	typography?: TypographyType
	initalColorMode?: ColorSchemeType
	useSystemColors?: boolean
}

/* 
	Typings for the final Theme Object.
*/
export type ThemeType = ColorsType & baseThemeType

type defaultTheme = Omit<baseThemeType, "borderRadius" | "typography"> & {
	borderRadius?: string | BorderRadiusType
	colorScheme?: ColorSchemeType<"both">
	colors?: RequiredColorsType
	__colors?: PaletteType
	__prefix?: string
	typography?: DeepRequired<TypographyType>
}

/* 
	Typings for the defualt theme object.
	Would mostly be used internally
*/
export type DefaultThemeType = DeepRequired<defaultTheme>
