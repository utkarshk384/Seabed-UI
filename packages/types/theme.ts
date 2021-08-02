import type { TypographyType } from "./typography"
import type { ColorsType, PaletteType } from "./colors"
import type { BreakpointType } from "./breakpoint"
import type { SizeType } from "./others"
import { StateType } from "./states"

type baseThemeType = {
	borderRadius?: SizeType
	breakpoints?: BreakpointType
	typography?: TypographyType
	States?: StateType
}

export type ThemeType = ColorsType & baseThemeType

type defaultTheme = Omit<baseThemeType, "borderRadius"> & {
	borderRadius?: string | SizeType
	colorMode?: "light" | "dark" | "both"
	colors?: { light: PaletteType; dark: PaletteType }
}

export type DefaultThemeType = Required<defaultTheme>
