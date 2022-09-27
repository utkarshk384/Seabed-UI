import { Dict } from "./general"
import { Theme } from "./theme"

export type Variant =
	| "responsive"
	| "first"
	| "last"
	| "odd"
	| "even"
	| "visited"
	| "checked"
	| "group-hover"
	| "group-focus"
	| "focus-within"
	| "hover"
	| "focus"
	| "focus-visible"
	| "active"
	| "disabled"
	| "dark"
	| "motion-safe"
	| "motion-reduce"

type Opts = {
	respectPrefix?: boolean
	respectImportant?: boolean
	variants?: Variant[]
}

export type tailwindPlugin = {
	addUtilities(newUtilities: Dict<unknown>, opts?: Opts | Variant): void
	addComponents(classes: Dict<unknown>, opts?: Opts | Variant): void
	addBase(tags: Dict<unknown>): void
	e(str: string): string
	config<T = configInterface>(expr: string): T
}

export interface configInterface {
	disableComponents?: boolean
	resetCSS?: boolean
	theme?: Theme
}
