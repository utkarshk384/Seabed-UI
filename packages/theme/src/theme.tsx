import _ from "lodash"

import { ThrowError } from "@seabedui/utils"

import {
	CssVar,
	SetProperty,
	DefaultFont,
	Theme,
	ParseBorderSizes,
	ResolveColor,
} from "@seabedui/theme-utils"

import type {
	DefaultThemeType,
	Dict,
	SchemeType,
	ThemeType,
	ColorSchemeType,
} from "@seabedui/types"

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
export function SetTheme(theme: DefaultThemeType, colorMode: ColorSchemeType): ThemeType {
	if ((theme.colorScheme === "both" && colorMode === "dark") || theme.colorScheme === "dark")
		theme.__colors = theme.colors.dark
	else if ((theme.colorScheme === "both" && colorMode === "light") || theme.colorScheme === "light")
		theme.__colors = theme.colors.light

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
export function NormalizeTheme(theme: DefaultThemeType): ThemeType {
	//Convert border Radius to `rem` if it's not done
	const [borderSize, err] = ParseBorderSizes(theme.borderRadius as string)

	if (err) throw ThrowError(err, "Border Size is undefined")
	theme.borderRadius = borderSize as string

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
	return theme as ThemeType
}

/**
 * @template T
 * @param { T extends DefaultThemeType } theme -  A generic theme object
 * @returns { T } - The generic theme object
 * A helper function that helps in normalizing the theme object
 */
const normalizeStateColors = <T extends DefaultThemeType>(theme: T): T => {
	for (const key in theme.__colors.states) {
		const [color, err] = ResolveColor(theme.__colors.states[key] as SchemeType, theme)
		if (err) throw ThrowError(err, "Couldn't normalize theme object.")
		theme.__colors.states[key] = color as string
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
	const sanitizedTheme = {
		typography: theme.typography,
		borderRadius: theme.borderRadius,
		breakpoints: theme.breakpoints,
	}

	const FontPrefix = ["heading", "body", "code"]

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	CssVar(sanitizedTheme as Dict<any>, {
		Customizer: (node, root) => {
			if (FontPrefix.includes(node.key as string))
				SetProperty(`${node.parent?.key}-${node.key}`, node.val, root, theme.__prefix)
			else SetProperty(`${node.key}`, node.val, root, theme.__prefix)
		},
	})

	return theme
}

/**
 *
 * @param { DefaultThemeType } theme - The final theme object
 * @param { boolean } isDark - A flag that indicates current color scheme.
 * A function that takes the theme colors and makes css variables depending on the current color scheme.
 */
export const MakeColorsCSSVars = (theme: DefaultThemeType, colorMode: ColorSchemeType): void => {
	//set Current Theme Colors in theme object
	const colors: Dict<string | Dict> = {}

	if (colorMode === "dark") {
		colors.accent = theme.colors.dark.accent
		colors.muted = theme.colors.dark.muted
		colors.states = theme.colors.dark.states
	} else if (colorMode === "light") {
		colors.accent = theme.colors.light.accent
		colors.muted = theme.colors.light.muted
		colors.states = theme.colors.light.states
	}

	if (Object.keys(colors).length === 0) throw new Error("Colors couldn't be parsed.")
	CssVar(colors, { prefix: theme.__prefix })
}

/**
 *
 * @param { Dict<unknown> } colors - The default color palaette
 */
export const DefaultColorsCssVar = (colors: Dict<unknown>, prefix: string): void => {
	CssVar(colors, {
		Customizer: (node, root) => {
			const pre = node.parent?.key
			if (pre) SetProperty(`${node.parent?.key}-${node.key}`, node.val, root, prefix)
			else SetProperty(`${node.key}`, node.val, root, prefix)
		},
	})
}
