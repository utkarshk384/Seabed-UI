import { Dict } from "./general"

type basicColorInterface = Dict & {
	primary: string
	secondary: string
}

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
export type StateInterface = Dict & {
	disabled?: SchemeType
	visited?: SchemeType
	hover?: SchemeType
	focused?: SchemeType
	selected?: SchemeType
	active?: SchemeType
	draggered?: SchemeType
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
export type PaletteInterface = Dict<unknown> & {
	background?: basicColorInterface
	text?: basicColorInterface
	states?: StateInterface
	accent?: string
	muted?: string
}

/* 
	Types to do typescript typing based on selected color scheme
*/
export type ColorsMode<T> = T extends "dark"
	? {
			dark: PaletteInterface
	  }
	: T extends "light"
	? {
			light: PaletteInterface
	  }
	: { dark: PaletteInterface; light: PaletteInterface }

/* 
	  Types for the `color scheme` in the theme object
*/
export type ColorsInterface =
	| {
			colorScheme?: "light"
			colors?: ColorsMode<"light">
	  }
	| {
			colorScheme?: "dark"
			colors?: ColorsMode<"dark">
	  }
	| {
			colorScheme?: "both"
			colors?: ColorsMode<"both">
	  }

/*
	  Types that require both `light` and `dark` theme in the object.
	  Mostly would be used internally
*/
export type RequiredColorsType = {
	dark: PaletteInterface
	light: PaletteInterface
}

/* 
	Foundational types for Color Scheme
*/

export type ColorSchemeType<T = ""> = "light" | "dark" | T

/* 
	Foundational Typings for the Default available colors
*/
export type ColorPaletteType =
	| "black"
	| "white"
	| "yellow[50]"
	| "yellow[100]"
	| "yellow[200]"
	| "yellow[300]"
	| "yellow[400]"
	| "yellow[500]"
	| "yellow[600]"
	| "yellow[700]"
	| "yellow[800]"
	| "yellow[900]"
	| "amber[50]"
	| "amber[100]"
	| "amber[200]"
	| "amber[300]"
	| "amber[400]"
	| "amber[500]"
	| "amber[600]"
	| "amber[700]"
	| "amber[800]"
	| "amber[900]"
	| "blue[50]"
	| "blue[100]"
	| "blue[200]"
	| "blue[300]"
	| "blue[400]"
	| "blue[500]"
	| "blue[600]"
	| "blue[700]"
	| "blue[800]"
	| "blue[900]"
	| "gray[50]"
	| "gray[100]"
	| "gray[200]"
	| "gray[300]"
	| "gray[400]"
	| "gray[500]"
	| "gray[600]"
	| "gray[700]"
	| "gray[800]"
	| "gray[900]"
	| "red[50]"
	| "red[100]"
	| "red[200]"
	| "red[300]"
	| "red[400]"
	| "red[500]"
	| "red[600]"
	| "red[700]"
	| "red[800]"
	| "red[900]"
	| "green[50]"
	| "green[100]"
	| "green[200]"
	| "green[300]"
	| "green[400]"
	| "green[500]"
	| "green[600]"
	| "green[700]"
	| "green[800]"
	| "green[900]"
	| "violet[50]"
	| "violet[100]"
	| "violet[200]"
	| "violet[300]"
	| "violet[400]"
	| "violet[500]"
	| "violet[600]"
	| "violet[700]"
	| "violet[800]"
	| "violet[900]"
	| "indigo[50]"
	| "indigo[100]"
	| "indigo[200]"
	| "indigo[300]"
	| "indigo[400]"
	| "indigo[500]"
	| "indigo[600]"
	| "indigo[700]"
	| "indigo[800]"
	| "indigo[900]"
	| "pink[50]"
	| "pink[100]"
	| "pink[200]"
	| "pink[300]"
	| "pink[400]"
	| "pink[500]"
	| "pink[600]"
	| "pink[700]"
	| "pink[800]"
	| "pink[900]"
	| "orange[50]"
	| "orange[100]"
	| "orange[200]"
	| "orange[300]"
	| "orange[400]"
	| "orange[500]"
	| "orange[600]"
	| "orange[700]"
	| "orange[800]"
	| "orange[900]"
	| "teal[50]"
	| "teal[100]"
	| "teal[200]"
	| "teal[300]"
	| "teal[400]"
	| "teal[500]"
	| "teal[600]"
	| "teal[700]"
	| "teal[800]"
	| "teal[900]"
