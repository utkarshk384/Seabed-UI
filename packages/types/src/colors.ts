import { PaletteType } from "./foundation"

/* 
	Types to do typescript typing based on selected color scheme
*/
export type ModeColors<T> = T extends "dark"
	? {
			dark: PaletteType
	  }
	: T extends "light"
	? {
			light: PaletteType
	  }
	: { dark: PaletteType; light: PaletteType }

/* 
	  Types for the `color scheme` in the theme object
*/
export type ColorsType =
	| {
			colorScheme?: "light"
			colors?: ModeColors<"light">
	  }
	| {
			colorScheme?: "dark"
			colors?: ModeColors<"dark">
	  }
	| {
			colorScheme?: "both"
			colors?: ModeColors<"both">
	  }

/*
	  Types that require both `light` and `dark` theme in the object.
	  Mostly would be used internally
*/
export type RequiredColorsType = {
	dark: PaletteType
	light: PaletteType
}

/* 
	Foundational Typings for the Default available colors
*/
export type ColorPaletteType =
	| "colors.black"
	| "colors.white"
	| "colors.amber[50]"
	| "colors.amber[100]"
	| "colors.amber[200]"
	| "colors.amber[300]"
	| "colors.amber[400]"
	| "colors.amber[500]"
	| "colors.amber[600]"
	| "colors.amber[700]"
	| "colors.amber[800]"
	| "colors.amber[900]"
	| "colors.blue[50]"
	| "colors.blue[100]"
	| "colors.blue[200]"
	| "colors.blue[300]"
	| "colors.blue[400]"
	| "colors.blue[500]"
	| "colors.blue[600]"
	| "colors.blue[700]"
	| "colors.blue[800]"
	| "colors.blue[900]"
	| "colors.gray[50]"
	| "colors.gray[100]"
	| "colors.gray[200]"
	| "colors.gray[300]"
	| "colors.gray[400]"
	| "colors.gray[500]"
	| "colors.gray[600]"
	| "colors.gray[700]"
	| "colors.gray[800]"
	| "colors.gray[900]"
	| "colors.red[50]"
	| "colors.red[100]"
	| "colors.red[200]"
	| "colors.red[300]"
	| "colors.red[400]"
	| "colors.red[500]"
	| "colors.red[600]"
	| "colors.red[700]"
	| "colors.red[800]"
	| "colors.red[900]"
	| "colors.green[50]"
	| "colors.green[100]"
	| "colors.green[200]"
	| "colors.green[300]"
	| "colors.green[400]"
	| "colors.green[500]"
	| "colors.green[600]"
	| "colors.green[700]"
	| "colors.green[800]"
	| "colors.green[900]"
	| "colors.violet[50]"
	| "colors.violet[100]"
	| "colors.violet[200]"
	| "colors.violet[300]"
	| "colors.violet[400]"
	| "colors.violet[500]"
	| "colors.violet[600]"
	| "colors.violet[700]"
	| "colors.violet[800]"
	| "colors.violet[900]"
	| "colors.indigo[50]"
	| "colors.indigo[100]"
	| "colors.indigo[200]"
	| "colors.indigo[300]"
	| "colors.indigo[400]"
	| "colors.indigo[500]"
	| "colors.indigo[600]"
	| "colors.indigo[700]"
	| "colors.indigo[800]"
	| "colors.indigo[900]"
	| "colors.pink[50]"
	| "colors.pink[100]"
	| "colors.pink[200]"
	| "colors.pink[300]"
	| "colors.pink[400]"
	| "colors.pink[500]"
	| "colors.pink[600]"
	| "colors.pink[700]"
	| "colors.pink[800]"
	| "colors.pink[900]"
	| "colors.orange[50]"
	| "colors.orange[100]"
	| "colors.orange[200]"
	| "colors.orange[300]"
	| "colors.orange[400]"
	| "colors.orange[500]"
	| "colors.orange[600]"
	| "colors.orange[700]"
	| "colors.orange[800]"
	| "colors.orange[900]"
	| "colors.teal[50]"
	| "colors.teal[100]"
	| "colors.teal[200]"
	| "colors.teal[300]"
	| "colors.teal[400]"
	| "colors.teal[500]"
	| "colors.teal[600]"
	| "colors.teal[700]"
	| "colors.teal[800]"
	| "colors.teal[900]"
