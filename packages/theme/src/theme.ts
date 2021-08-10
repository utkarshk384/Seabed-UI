import _ from "lodash"

import { DefaultFont, Theme } from "./defaults"
import {
	CssVar,
	ParseBorderRadiusSize,
	PREFIX,
	ResolveColor,
	SetProperty,
	ThrowError,
} from "@seabedui/utils"

import type { DefaultThemeType, Dict, SchemeType, ThemeType } from "@seabedui/types"

export function ExtendTheme(theme?: ThemeType | DefaultThemeType): ThemeType {
	if (!theme) theme = Theme as ThemeType
	const defaultTheme: DefaultThemeType & Dict<unknown> = Theme

	//If default Theme is provided then return without any further modification
	if (_.isEqual(theme, defaultTheme)) return defaultTheme as ThemeType

	return _.mergeWith(defaultTheme, theme)
}

export function SetTheme(theme: DefaultThemeType, isDark: boolean): ThemeType {
	if (isDark) theme.__colors = theme.colors.dark
	else theme.__colors = theme.colors.dark

	return theme as ThemeType
}

export function ApplyTheme(theme: DefaultThemeType): void {
	if (typeof document === "undefined")
		throw new Error("Window is undefined. Try calling the function inside of a useEffect")

	const { typography } = theme

	//Load default font if `fontFamily` isn't specified
	if (
		typeof typography?.fontFamily === "string" &&
		typography.fontFamily === "'Ubuntu', sans-serif"
	)
		DefaultFont()
}

export function NormalizeTheme(theme: DefaultThemeType): DefaultThemeType {
	//Convert border Radius to `rem` if it's not done
	theme.borderRadius = ParseBorderRadiusSize(theme.borderRadius as string)

	//If the type of `fontFamily` is string, convert it to `FontType` notation
	const fontFamily = theme.typography.fontFamily
	if (typeof fontFamily === "string") {
		theme.typography.fontFamily = {
			heading: fontFamily,
			body: fontFamily,
			code: fontFamily,
		}
	}

	/* 
		Interpret the state colors and accordingly assign their values
	*/
	theme = normalizeStateColors(theme)
	return theme
}

const normalizeStateColors = <T extends DefaultThemeType>(theme: T): T => {
	for (const key in theme.__colors.states) {
		const color = ResolveColor(theme.__colors.states[key] as SchemeType, theme)
		if (color.err) throw ThrowError(color.err, "Couldn't normalize theme object")
		theme.__colors.states[key] = color.color
	}

	return theme
}

export const MakeThemeCSSVar = (theme: DefaultThemeType): DefaultThemeType => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { colorScheme, colors, ...sanitizedTheme } = theme as DefaultThemeType
	const FontPrefix = ["heading", "body", "code"]

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	CssVar(sanitizedTheme as Dict<any>, (node, root) => {
		if (FontPrefix.includes(node.key as string))
			SetProperty(`${node.parent?.key}-${node.key}`, node.val, root, PREFIX)
		else SetProperty(`${node.key}`, node.val, root, PREFIX)
	})

	return theme
}

export const ApplyThemeColors = (theme: DefaultThemeType, isDark: boolean): void => {
	//set Current Theme Colors in theme object
	const colors: Dict<string | Dict> = {}

	if (isDark) {
		colors.accent = theme.colors.dark.accent
		colors.muted = theme.colors.dark.muted
		colors.states = theme.colors.dark.states
	} else {
		colors.accent = theme.colors.light.accent
		colors.muted = theme.colors.light.muted
		colors.states = theme.colors.light.states
	}

	if (Object.keys(colors).length === 0) throw new Error("Colors couldn't be parsed.")
	CssVar(colors)
}

export const DefaultColorsCssVar = (colors: Dict<unknown>): void => {
	CssVar(colors, (node, root) => {
		const pre = node.parent?.key

		if (pre) SetProperty(`${node.parent?.key}-${node.key}`, node.val, root, PREFIX)
		else SetProperty(`${node.key}`, node.val, root, PREFIX)
	})
}
