/* 
	Foundational type for typography object.
*/

import { Dict } from "./general"

export type FontSizesType =
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

export type BindingsInterface = Dict<string> & {
	h1: FontSizesType
	h2: FontSizesType
	h3: FontSizesType
	h4: FontSizesType
	h5: FontSizesType
	h6: FontSizesType
	content: FontSizesType
	small: FontSizesType
}

export type SizeInterface = Dict<string> & {
	xs: string
	sm: string
	md: string
	lg: string
	xl: string
	"2xl": string
	"3xl": string
	"4xl": string
	"5xl": string
	"6xl": string
	"7xl": string
}

export interface FontInterface {
	sizes: SizeInterface
	bindings: BindingsInterface
}
