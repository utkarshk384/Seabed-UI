import _ from "lodash"
import { CssVar, ParseBorderSizes, ResolveColor, SetProperty, ThrowError } from "@seabedui/utils"

import { DefaultFont, Theme } from "./defaults"

import type { DefaultThemeType, Dict, SchemeType, ThemeType } from "@seabedui/types"

/**
 * @param { ThemeType } [theme] - The theme object to extend from
 * @return {ThemeType} - The extended theme object
 * A function that extends the user theme with the default theme.
 */
export function ExtendTheme(theme?: ThemeType): ThemeType {
	if (!theme) theme = Theme as ThemeType
	const defaultTheme: DefaultThemeType & Dict<unknown> = Theme

	//If default Theme is provided then return without any further modification
	if (_.isEqual(theme, defaultTheme)) return defaultTheme as ThemeType

	return _.mergeWith(defaultTheme, theme)
}

/**
 *
 * @param { DefaultThemeType } theme - The theme object
 * @param { boolean } isDark - A flag to indicate the current color scheme
 * @returns { ThemeType } - The theme object
 * A function that sets the current theme to the `__colors` in the @type { DefaultThemeType }.
 */
export function SetTheme(theme: DefaultThemeType, isDark: boolean): ThemeType {
	if (isDark) theme.__colors = theme.colors.dark
	else theme.__colors = theme.colors.light

	return theme as ThemeType
}

/**
 *
 * @param { DefaultThemeType } theme - The theme object
 * A helper function that helps in applying default styles
 */
export function ApplyDefaults(theme: DefaultThemeType): void {
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

/**
 *
 * @param { DefaultThemeType } theme -  The theme object
 * @returns { DefaultThemeType } - The final theme object
 * A fucntion that normails the theme object.
 */
export function NormalizeTheme(theme: DefaultThemeType): DefaultThemeType {
	//Convert border Radius to `rem` if it's not done
	const borderSize = ParseBorderSizes(theme.borderRadius as string)

	if (borderSize.error) throw borderSize.error
	theme.borderRadius = borderSize.data as string

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

/**
 * @template T
 * @param { T extends DefaultThemeType } theme -  A generic theme object
 * @returns { T } - The generic theme object
 * A helper function that helps in normalizing the theme object
 */
const normalizeStateColors = <T extends DefaultThemeType>(theme: T): T => {
	for (const key in theme.__colors.states) {
		const color = ResolveColor(theme.__colors.states[key] as SchemeType, theme)
		if (color.err) throw ThrowError(color.err, " Couldn't normalize theme object.")
		theme.__colors.states[key] = color.color
	}

	return theme
}

/**
 *
 * @param { DefaultThemeType } theme - The final theme object
 * @returns { DefaultThemeType } - The final theme object
 * A function that makes css variable on certain theme properties
 */
export const MakeThemeCSSVar = (theme: DefaultThemeType): DefaultThemeType => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { colorScheme, colors, __colors, ...sanitizedTheme } = theme as DefaultThemeType
	const FontPrefix = ["heading", "body", "code"]

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	CssVar(sanitizedTheme as Dict<any>, (node, root) => {
		if (FontPrefix.includes(node.key as string))
			SetProperty(`${node.parent?.key}-${node.key}`, node.val, root)
		else SetProperty(`${node.key}`, node.val, root)
	})

	return theme
}

/**
 *
 * @param { DefaultThemeType } theme - The final theme object
 * @param { boolean } isDark - A flag that indicates current color scheme.
 * A function that takes the theme colors and makes css variables depending on the current color scheme.
 */
export const MakeColorsCSSVars = (theme: DefaultThemeType, isDark: boolean): void => {
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

/**
 *
 * @param { Dict<unknown> } colors - The default color palaette
 */
export const DefaultColorsCssVar = (colors: Dict<unknown>): void => {
	CssVar(colors, (node, root) => {
		const pre = node.parent?.key
		if (pre) SetProperty(`${node.parent?.key}-${node.key}`, node.val, root)
		else SetProperty(`${node.key}`, node.val, root)
	})
}
