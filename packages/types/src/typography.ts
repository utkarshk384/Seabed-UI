/* 
	Foundational type for typography object.
*/

export interface FontNumberInterface {
	heading?: string | number
	body: string | number
	code?: string | number
}

export interface FontInterface<T = string> {
	heading?: T
	body: T
	code?: T
}

export type FontType = "heading" | "body" | "code"

export type FontSizeType =
	| "xs"
	| "sm"
	| "base"
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

/* 
	Typings for the `typography` section of the theme object.
*/
export type TypographyType = {
	letterSpacing?: FontInterface
	lineHeight?: FontNumberInterface
	fontFamily?: FontInterface | string
	fontSize?: FontInterface<FontSizeType>
	fontWeight?: FontNumberInterface
}
