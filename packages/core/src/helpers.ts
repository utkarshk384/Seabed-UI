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
} from "@seabedui/types"

export function NormalizeTheme(userTheme: Theme): InternalTheme {
	const theme = userTheme as InternalTheme

	/* Check if default theme is set */
	if (!theme.defaultTheme)
		throw new Error(
			`defaultTheme is not set in seabedui.theme.defaultTheme object in tailwind.config.js`
		)

	/* Set defaults if not set */
	if (!theme.breakpoints) theme.breakpoints = defaultBreakpoints
	if (!theme.radiusConfig) theme.radiusConfig = defaultRadius
	if (!theme.radius) theme.radius = "base"
	if (!theme.fontSize) theme.fontSize = defaultFont
	if (!theme.shadows) theme.shadows = defaultShadows
	if (!theme.colors) theme.colors = defaultColors

	/* Fill fonts that isn't present */
	const fontSize = theme.fontSize

	if (!fontSize.display) fontSize.display = defaultFont.display
	if (fontSize.display && !fontSize.display.desktop)
		fontSize.display.desktop = defaultFont.display?.desktop
	if (fontSize.display && !fontSize.display.mobile)
		fontSize.display.mobile = defaultFont.display?.mobile

	if (!fontSize.title) fontSize.title = defaultFont.title
	if (fontSize.title && !fontSize.title.desktop) fontSize.title.desktop = defaultFont.title?.desktop
	if (fontSize.title && !fontSize.title.mobile) fontSize.title.mobile = defaultFont.title?.mobile

	if (!fontSize.paragraph) fontSize.paragraph = defaultFont.paragraph

	theme.fontSize = recursiveFont(fontSize)

	/* Resolve Border Radius */
	theme.radius = resolveBorderRadius(theme.radius as radiusType, theme.radiusConfig)

	/* Set NeutralColors if not set */
	if (!theme.colors.neutral) theme.colors.neutral = defaultColors.neutral

	/* Set missing colors for dark and light mode */
	if (!theme.colors.dark && !theme.colors.light) {
		theme.colors.light = defaultColors.light
		theme.colors.dark = defaultColors.dark
	} else if (!theme.colors.light) {
		theme.colors.light = theme.colors.dark
		console.warn(
			"Didn't find `seabedui.theme.colors.light` in tailwind.config.js so using `seabedui.theme.colors.dark` instead"
		)
	} else if (!theme.colors.dark) {
		theme.colors.dark = theme.colors.light
		console.warn(
			"Didn't find `seabedui.theme.colors.dark` in tailwind.config.js so using `seabedui.theme.colors.light` instead"
		)
	}

	/* Convert all colors to HSL */
	if (typeof theme.colors == "object") theme.colors = recursiveHSL(theme.colors)

	return theme
}

export const resolveBorderRadius = (radius: radiusType, radiusTypes: radiusInterface): string => {
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

export const recursiveHSL = <T>(usrObj: T): T => {
	const obj = usrObj as unknown as Dict<string | Dict<string>>
	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === "string") obj[key] = toHSL(obj[key] as string)
		else obj[key] = recursiveHSL(obj[key])
	})

	return obj as unknown as T
}

const normalizeFont = (font: number | string): string => {
	if (typeof font === "number") return `${font}px`
	if (!font.match(/[A-z]+/)) return `${font}px`

	if (font.includes("rem") || font.includes("em") || font.includes("px")) return font

	console.warn(
		"SeabedUI - The font sizes that was passed to the config object is using non standard units."
	)

	return font
}

export const recursiveFont = <T>(usrObj: T): T => {
	const obj = usrObj as unknown as Dict<string | Dict<string>>
	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === "string") obj[key] = normalizeFont(obj[key] as string)
		else obj[key] = recursiveFont(obj[key])
	})

	return obj as unknown as T
}
