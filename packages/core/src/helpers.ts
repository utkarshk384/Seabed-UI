import { defaultFont, defaultRadius, defaultShadows, defaultColors } from "./themes"
import { toRGB, recursiveFunction } from "@seabedui/utils"

import type {
	radiusInterface,
	radiusType,
	DeepRequired,
	InternalTheme,
	Theme,
	FontInterface,
	colorsInterface,
	Colors,
	Dict,
	SizeInterface,
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
	theme["fontSize"] = resolveFonts(theme["fontSize"])

	/* Resolve Border Radius */
	theme.radius = resolveBorderRadius(theme.radius as radiusType, theme.radiusConfig)

	/* Resolve color related properties */
	theme.colors = resolveColors(theme.colors)

	/* Convert all colors to HSL */
	if (typeof theme.colors == "object")
		theme.colors = recursiveFunction(theme.colors, (val) => toRGB(val))

	return theme
}

export const SetDefaults = (theme: InternalTheme): InternalTheme => {
	if (!theme.radiusConfig) theme.radiusConfig = defaultRadius
	if (!theme.radius) theme.radius = "base"
	if (!theme.fontSize) theme.fontSize = defaultFont
	if (!theme.shadows) theme.shadows = defaultShadows
	if (!theme.colors) theme.colors = defaultColors

	return theme
}

export const resolveFonts = (fontSize: FontInterface): FontInterface => {
	if (!fontSize) return defaultFont

	if (!fontSize.sizes) fontSize.sizes = defaultFont.sizes
	if (!fontSize.bindings) fontSize.bindings = defaultFont.bindings

	const sizes: Dict<string> = {}

	Object.keys(fontSize.sizes).forEach((key) => {
		const size = fontSize.sizes[key]
		sizes[key] = normalizeFont(size)
	})

	fontSize.sizes = sizes as SizeInterface

	Object.keys(fontSize.bindings).forEach((key) => {
		const item = fontSize.bindings[key]

		if (typeof fontSize.sizes[item] !== "undefined") fontSize.bindings[key] = fontSize.sizes[item]
	})

	return fontSize
}

export const resolveColors = (colors: Required<colorsInterface>): Required<colorsInterface> => {
	/* Set missing colors for dark and light mode */
	if (!colors.dark && !colors.light) {
		colors.light = defaultColors.light
		colors.dark = defaultColors.dark
		return colors
	} else if (!colors.light) {
		colors.light = colors.dark
		console.warn(
			"Didn't find `seabedui.theme.colors.light` in tailwind.config.js so using `seabedui.theme.colors.dark` instead"
		)
		return colors
	} else if (!colors.dark) {
		colors.dark = colors.light
		console.warn(
			"Didn't find `seabedui.theme.colors.dark` in tailwind.config.js so using `seabedui.theme.colors.light` instead"
		)
		return colors
	}

	Object.keys(defaultColors.light).forEach((key) => {
		const exclude = ["text", "error", "info", "disabled", "success", "warn"]
		const clr = colors.light[key]
		if (!exclude.includes(key) && !clr)
			console.warn("Couldn't find colors for " + key + "key in `seabedui.theme.colors.light`.")
	})

	colors.dark = setStateColors(colors.dark, colors.light, defaultColors.dark)
	colors.light = setStateColors(colors.light, colors.dark, defaultColors.light)

	return colors
}

function setStateColors(colors: Colors, alternateColors: Colors, defaultClrs: Colors): Colors {
	Object.keys(defaultClrs).forEach((key) => {
		const exclude = ["accent", "primary", "secondary"]
		const clr = colors[key]
		if (!clr) {
			if (!exclude.includes(key)) colors[key] = alternateColors[key] || defaultClrs[key] // Only replace stateful colors and text colors
			console.warn("Couldn't find colors for " + key + "key in `seabedui.theme.colors.light`.")
		}
	})

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
