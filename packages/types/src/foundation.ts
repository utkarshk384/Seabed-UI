import { ColorPaletteType } from "./colors"
import { Dict } from "./general"

/* 

    These states are applied via tailwind classnames to all UI elements depending on the type of UI element.

    Ex: A button element might receive a enabled, muted, hover, focused, active states. 
        Whereas, a text element will receive enabled and muted states only.

    The states are as follows:

    * `visited`: Used to show a link is clicked
    * `disabled`: Used to show that a component is disabled
    * `hover`: The component is hovered.
    * `focus`: The component is focused.
    * `selected`: The component that is selected in a list.
    * `active`: The component that is being pressed.
    * `dragged`: The component that is being dragged.

*/
export type StateType = Dict & {
	disabled?: SchemeType
	visited?: SchemeType
	hover?: SchemeType
	focused?: SchemeType
	selected?: SchemeType
	active?: SchemeType
	draggered?: SchemeType
}

/* 
	Foundational type for typography object.
*/
export type fontVariants<T> = T extends "both"
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

export type FontType<T = ""> = T extends "both"
	? fontVariants<T> & Dict<string | number>
	: fontVariants<T> & Dict

/* 
	  Foundational types for the `typography.fontSizes` section of the theme object.
*/
export type FontSizeType = Dict & {
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
    Foundational sizing of fonts, buttons etc...
*/
export type SpacingType =
	| "0"
	| "1"
	| "2"
	| "3"
	| "4"
	| "5"
	| "6"
	| "7"
	| "8"
	| "9"
	| "10"
	| "12"
	| "14"
	| "16"
	| "18"
	| "20"
	| "22"
	| "24"
	| "26"
	| "28"
	| "30"
	| "32"
	| "34"
	| "36"
	| "38"
	| "40"
	| "42"
	| "44"
	| "46"
	| "48"
	| "50"
	| "52"
	| "54"
	| "56"
	| "58"
	| "60"
	| "62"
	| "64"
	| "66"
	| "68"
	| "70"
	| "72"
	| "74"
	| "76"
	| "78"
	| "80"
	| "82"
	| "84"
	| "86"
	| "88"
	| "90"
	| "92"
	| "94"
	| "96"
	| "98"
export type SizeType = "sm" | "md" | "lg" | "xl" | "2xl"
export type ExtendedSizeType = SizeType | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl"

type basicColorType = Dict & {
	primary: string
	secondary: string
}

/* 
	Foundational Types for Text Colors and Background Colors
*/
export type SchemeType =
	| "bg.primary"
	| "bg.secondary"
	| "text.primary"
	| "text.secondary"
	| "accent"
	| "muted"
	| ColorPaletteType

/* 
	Foundational Types for defining theme colors
	
	*Note:  Muted is also used for the `disabled` state
*/
export type PaletteType = Dict<unknown> & {
	background?: basicColorType
	text?: basicColorType
	states?: StateType
	accent?: string
	muted?: string
}

/* 
	Foundational types for Color Scheme
*/

export type ColorSchemeType<T = ""> = "light" | "dark" | T
