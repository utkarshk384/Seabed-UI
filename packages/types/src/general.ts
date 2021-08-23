import { ComponentType } from "react"

import { DefaultThemeType } from "./theme"
/* 
    A general type used for allowing indexing using square brackets
*/
export type Dict<T = string, K extends string | number = string> = Record<K, T>

/* 
    Type used to create HOCs with theme object
*/
export type Component<T> = ComponentType<T & { theme: DefaultThemeType }>

export type SeabedComponentType<T = Dict<unknown>> = React.ForwardRefExoticComponent<T>

/* 
    Deep Required
*/
export type DeepRequired<T> = T extends Record<string, unknown>
	? { [K in keyof T]-?: DeepRequired<T[K]> }
	: NonNullable<T>

/* 
	Require certain fields
*/
export type RequiredBy<P, T extends keyof P> = Required<Pick<P, T>> & P

/**
 * A golang inspired way of handling error
 */
export type HandleReturn<T = string> = {
	error?: Error
	data: T
}

/* 
    General Types
*/

export type StrNum = string | number

/* 
    Keyboard Keys
*/
export type KeyboardButtons =
	| "escape"
	| "f1"
	| "f2"
	| "f3"
	| "f4"
	| "f5"
	| "f6"
	| "f7"
	| "f8"
	| "f9"
	| "f10"
	| "f11"
	| "f12"
	| "printScreen"
	| "enter"
	| "insert"
	| "delete"
	| "backTick"
	| "one"
	| "two"
	| "three"
	| "four"
	| "five"
	| "six"
	| "seven"
	| "eight"
	| "nine"
	| "zero"
	| "hyphen"
	| "equal"
	| "backspace"
	| "tab"
	| "alt"
	| "shift"
	| "arrowLeft"
	| "arrowRight"
	| "add"
	| "subtract"
	| "numpadAdd"
	| "numpadSubtract"
	| "ctrl"
	| "pause"
	| "capsLock"
	| "pageUp"
	| "space"
	| "pageDown"
	| "end"
	| "home"
	| "arrowUp"
	| "arrowDown"
	| "a"
	| "b"
	| "c"
	| "d"
	| "e"
	| "f"
	| "g"
	| "h"
	| "i"
	| "j"
	| "k"
	| "l"
	| "m"
	| "n"
	| "o"
	| "p"
	| "q"
	| "r"
	| "s"
	| "t"
	| "u"
	| "v"
	| "w"
	| "x"
	| "y"
	| "z"
	| "windows/command"
	| "select"
	| "numpad0"
	| "numpad1"
	| "numpad2"
	| "numpad3"
	| "numpad4"
	| "numpad5"
	| "numpad6"
	| "numpad7"
	| "numpad8"
	| "numpad9"
	| "multiply"
	| "decimalPoint"
	| "divide"
	| "numLock"
	| "scrollLock"
	| "myComputer"
	| "myCalculator"
	| "semiColon"
	| "comma"
	| "period"
	| "forwardSlash"
	| "openBracket"
	| "backSlash"
	| "closeBracket"
	| "singleQuote"
