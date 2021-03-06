/* A CSS Type */
export type CSSType = Dict<Dict<unknown>>

/* A general type used for allowing indexing using square brackets */
export type Dict<T = string, K extends string | number = string> = Record<K, T>

export type Primitive = string | number | boolean | bigint | symbol | undefined | null
export type Builtin = Primitive | Date | Error | RegExp

/* Deep Required */
export type DeepRequired<T> = T extends Error
	? Required<T>
	: T extends Builtin
	? T
	: T extends Map<infer K, infer V>
	? Map<DeepRequired<K>, DeepRequired<V>>
	: T extends ReadonlyMap<infer K, infer V>
	? ReadonlyMap<DeepRequired<K>, DeepRequired<V>>
	: T extends WeakMap<infer K, infer V>
	? WeakMap<DeepRequired<K>, DeepRequired<V>>
	: T extends Set<infer U>
	? Set<DeepRequired<U>>
	: T extends ReadonlySet<infer U>
	? ReadonlySet<DeepRequired<U>>
	: T extends WeakSet<infer U>
	? WeakSet<DeepRequired<U>>
	: T extends Promise<infer U>
	? Promise<DeepRequired<U>>
	: T extends Dict<string>
	? { [K in keyof T]-?: DeepRequired<T[K]> }
	: Required<T>

/* Require certain fields */
export type RequiredBy<P, T extends keyof P> = Required<Pick<P, T>> & P

/* A golang inspired way of handling error */
export type HandleReturn<T = string> = [data: T, error?: Error]

/* General Types */
export type NestedDict<T> = Dict<Dict<T>>

/* Keyboard Keys */
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
