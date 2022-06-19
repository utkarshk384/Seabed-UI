/* 
	Foundational type for typography object.
*/

export interface Display {
	large: string
	base: string
}

export type DisplayType = "large" | "base"

export interface Title {
	xs: string
	sm: string
	base: string
	lg: string
	xl: string
	"2xl": string
}

export type TitleType = "xs" | "sm" | "base" | "lg" | "xl" | "2xl"

export interface Paragraph {
	xs: string | number
	sm: string | number
	base: string | number
	lg: string | number
	xl: string | number
	"2xl": string | number
	"3xl": string | number
}

export type ParagraphType = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"

export interface ResponsiveDisplay {
	desktop?: Display
	mobile?: Display
}

export interface ResponsiveTitle {
	desktop?: Title
	mobile?: Title
}

export interface FontType {
	display?: ResponsiveDisplay
	title?: ResponsiveTitle
	paragraph?: Paragraph
}
