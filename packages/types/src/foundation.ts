import { ColorPaletteType } from "./colors"
import { Dict } from "./general"

/* 

    These states are applied via tailwind classnames to all UI elements depending on the type of UI element.

    Ex: A button element might receive a enabled, muted, hover, focused, pressed states. 
        Whereas, a text element will receive enabled and muted states only.

    The states are as follows:

    * `enabled`: The component is enabled.
    * `muted`: The component is in a muted state.
    * `hover`: The component is hovered.
    * `focus`: The component is focused.
    * `selected`: The component that is selected in a list.
    * `pressed`: The component that is being pressed.
    * `dragged`: The component that is being dragged.

*/
export type StateType = Dict & {
	enabled?: SchemeType
	muted?: SchemeType
	hover?: SchemeType
	focused?: SchemeType
	selected?: SchemeType
	pressed?: SchemeType
	draggered?: SchemeType
}

/* 
	Foundational type for typography object.
*/
export type FontType<T = ""> = T extends "both"
	? {
			heading?: string | number
			body: string | number
			code?: string | number
	  } & Dict<string | number>
	: {
			heading?: string
			body: string
			code?: string
	  } & Dict

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

export type ColorSchemeType = "light" | "dark" | "both"
