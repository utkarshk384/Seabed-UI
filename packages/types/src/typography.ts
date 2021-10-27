import { Dict } from "./general"

/* 
	Foundational type for typography object.
*/

export interface FontNumberInterface {
	heading?: string | number
	body: string | number
	code?: string | number
}

export interface FontInterface {
	heading?: string
	body: string
	code?: string
}

export type FontType = "heading" | "body" | "code"

export type FontSizeType =
	| "xs"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "2xl"
	| "3xl"
	| "4xl"
	| "5xl"
	| "6xl"
	| "7xl"
	| "8xl"
	| "9xl"
	| "inherit"

export type FontSizeInterface = Dict & {
	inherit?: string
	xs?: string
	sm?: string
	md?: string
	lg?: string
	xl?: string
	"2xl"?: string
	"3xl"?: string
	"4xl"?: string
	"5xl"?: string
	"6xl"?: string
	"7xl"?: string
	"8xl"?: string
	"9xl"?: string
}

/* 
	Typings for the `typography` section of the theme object.
*/
export type TypographyType = {
	letterSpacing?: FontInterface
	lineHeight?: FontNumberInterface
	fontFamily?: FontInterface | string
	fontSize?: FontSizeInterface
	fontWeight?: FontNumberInterface
}
