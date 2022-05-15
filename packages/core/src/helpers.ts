import {
	defaultBreakpoints,
	defaultRadius,
	defaultShadows,
	defaultNeutralColors,
	defaultLightColors,
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

	/* Set default radius, radiusConfig, breakpoints or shadows if not set */
	if (!theme.breakpoints) theme.breakpoints = defaultBreakpoints
	else if (!theme.radiusConfig) theme.radiusConfig = defaultRadius
	else if (!theme.radius) theme.radius = "base"
	else if (!theme.shadows) theme.shadows = defaultShadows

	/* Resolve Border Radius */
	theme.radius = resolveBorderRadius(theme.radius as radiusType, theme.radiusConfig)

	/* Set Neutral colors if not set */
	if (!theme.colors.neutral) theme.colors.neutral = defaultNeutralColors

	/* Set dark mode and light mode switch */
	if (!theme.colors.dark && !theme.colors.light) {
		theme.colors.light = defaultLightColors
		theme.colors.dark = defaultLightColors
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

	// /* Set state colors for all the brand colors */
	// theme = generateThemeColors(theme, colorVariants)

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
