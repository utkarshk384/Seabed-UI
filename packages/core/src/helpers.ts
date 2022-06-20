import {
	defaultBreakpoints,
	defaultFont,
	defaultRadius,
	defaultShadows,
	defaultColors,
} from "./themes"
import { toHSL } from "@seabedui/utils"

import type {
	radiusInterface,
	radiusType,
	DeepRequired,
	InternalTheme,
	Theme,
	Dict,
	FontType,
	colorsInterface,
} from "@seabedui/types"

export function NormalizeTheme(userTheme: Theme): InternalTheme {
	let theme = userTheme as InternalTheme

	/* Check if default theme is set */
	if (!theme.defaultTheme)
		throw new Error(
			`defaultTheme is not set in seabedui.theme.defaultTheme object in tailwind.config.js`
		)

	/* Set defaults if not set */
	theme = SetDefaults(theme)

	/* Fill fonts that isn't present */
	theme.fontSize = resolveFonts(theme.fontSize)

	/* Resolve Border Radius */
	theme.radius = resolveBorderRadius(theme.radius as radiusType, theme.radiusConfig)

	/* Resolve color related properties */
	theme.colors = resolveColors(theme.colors)

	/* Convert all colors to HSL */
	if (typeof theme.colors == "object")
		theme.colors = recursiveFunction(theme.colors, (val) => toHSL(val))

	return theme
}

export const SetDefaults = (theme: InternalTheme): InternalTheme => {
	if (!theme.breakpoints) theme.breakpoints = defaultBreakpoints
	if (!theme.radiusConfig) theme.radiusConfig = defaultRadius
	if (!theme.radius) theme.radius = "base"
	if (!theme.fontSize) theme.fontSize = defaultFont
	if (!theme.shadows) theme.shadows = defaultShadows
	if (!theme.colors) theme.colors = defaultColors

	return theme
}

export const resolveFonts = (fontSize: FontType): FontType => {
	if (!fontSize.display) fontSize.display = defaultFont.display
	if (fontSize.display && !fontSize.display.desktop)
		fontSize.display.desktop = defaultFont.display?.desktop
	if (fontSize.display && !fontSize.display.mobile)
		fontSize.display.mobile = defaultFont.display?.mobile

	if (!fontSize.title) fontSize.title = defaultFont.title
	if (fontSize.title && !fontSize.title.desktop) fontSize.title.desktop = defaultFont.title?.desktop
	if (fontSize.title && !fontSize.title.mobile) fontSize.title.mobile = defaultFont.title?.mobile

	if (!fontSize.paragraph) fontSize.paragraph = defaultFont.paragraph

	fontSize = recursiveFunction(fontSize, (val) => normalizeFont(val))

	return fontSize
}

export const resolveColors = (colors: Required<colorsInterface>): Required<colorsInterface> => {
	/* Set NeutralColors if not set */
	if (!colors.neutral) colors.neutral = defaultColors.neutral

	/* Set missing colors for dark and light mode */
	if (!colors.dark && !colors.light) {
		colors.light = defaultColors.light
		colors.dark = defaultColors.dark
	} else if (!colors.light) {
		colors.light = colors.dark
		console.warn(
			"Didn't find `seabedui.theme.colors.light` in tailwind.config.js so using `seabedui.theme.colors.dark` instead"
		)
	} else if (!colors.dark) {
		colors.dark = colors.light
		console.warn(
			"Didn't find `seabedui.theme.colors.dark` in tailwind.config.js so using `seabedui.theme.colors.light` instead"
		)
	}

	return colors
}

export const resolveBorderRadius = (
	radius: radiusType | string,
	radiusTypes: radiusInterface
): string => {
	let returnVal = ""

	const types: DeepRequired<radiusInterface> = radiusTypes as DeepRequired<radiusInterface>

	switch (radius) {
		case "xs":
		case "sm":
		case "base":
		case "lg":
		case "xl":
		case "2xl":
		case "3xl":
			returnVal = types[radius]
			break
		default:
			returnVal = radius
	}

	return returnVal
}

export const normalizeFont = (font: number | string): string => {
	if (typeof font === "number") return `${font}px`
	if (!font.match(/[A-z]+/)) return `${font}px`

	if (font.match(/rem|em|px/)) return font

	console.warn(
		"SeabedUI - The font sizes that was passed to the config object is using non standard units."
	)

	return font
}

export const recursiveFunction = <T>(usrObj: T, fn: (value: string) => string): T => {
	const obj = usrObj as unknown as Dict<string | Dict<string>>
	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === "string" || typeof obj[key] === "number")
			obj[key] = fn(obj[key] as string)
		else obj[key] = recursiveFunction(obj[key], fn)
	})

	return obj as unknown as T
}
