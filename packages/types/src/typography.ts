import { FontType, FontSizeType } from "./foundation"

/* 
	Typings for the `typography` section of the theme object.
*/
export type TypographyType = {
	letterSpacings?: FontType
	lineHeight?: FontType<"both">
	fontFamily?: FontType | string
	fontSize?: FontSizeType
	fontWeight?: FontType<"both">
}