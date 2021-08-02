export type FontType<T = ""> = T extends "both"
	? {
			heading?: string | number
			body: string | number
			code?: string | number
	  }
	: {
			heading?: string
			body: string
			code?: string
	  }
export type FontSizeType = {
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

export type TypographyType = {
	letterSpacings?: FontType
	lineHeight?: FontType<"both">
	fontFamily?: FontType | string
	fontSize?: FontSizeType
	fontWeight?: FontType<"both">
}
