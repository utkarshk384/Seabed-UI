import _ from "lodash"

import { BorderRadiusSizes } from "./sizes"
import { Colors } from "./colors"

import type { DefaultThemeType, SchemeType } from "@seabedui/types"

/* 

	**********
	  Colors
	**********

*/

export function Hex2Rgb(hex: string): string {
	hex = hex.replace("#", "")

	const r = parseInt(hex.slice(0, 2), 16)
	const g = parseInt(hex.slice(2, 4), 16)
	const b = parseInt(hex.slice(4, 6), 16)

	return `${r}, ${g}, ${b}`
}

export function Rgb2Hex(rgb: number[]): string {
	let hex = "#"

	hex = hex + rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16)
	return hex
}

export function InvertColor(color: string): string {
	const values = color.split(",")

	if (!values) throw new Error(`The given color of ${color} returned undefined while inverting it`)
	else if (values.length !== 3) throw new Error(`Couldn't invert the given color of ${color}`)

	const ParsedValues = values.map((val) => 255 - parseInt(val))

	const r = ParsedValues[0] / 2
	const g = ParsedValues[1] / 2
	const b = ParsedValues[2] / 2

	let count = 0

	if (r > 127) count = count + 1
	else if (g > 127) count = count + 1
	else if (b > 127) count = count + 1

	if (count >= 2) return "0, 0, 0"
	return "255, 255, 255"
}

export function ResolveColor(
	color: SchemeType,
	theme: DefaultThemeType
): { color: string; err?: Error } {
	const splitColor = color.split(",")
	if (splitColor.length === 3) return { color }

	let selectedColor = ""
	let err
	const error = new Error(
		`${splitColor} is not defined in the theme object or the default color palette.`
	)

	switch (color) {
		case "bg.primary":
			if (!theme.__colors.text.primary) throw error
			return { color: theme.__colors.text.primary }
		case "bg.secondary":
			if (!theme.__colors.text.secondary) throw error
			return { color: theme.__colors.text.secondary }
		case "text.primary":
			if (!theme.__colors.background.primary) throw error
			return { color: theme.__colors.background.primary }

		case "text.secondary":
			if (!theme.__colors.background.secondary) throw error
			return { color: theme.__colors.background.secondary }

		case "accent":
			if (!theme.__colors.accent) throw error
			return { color: theme.__colors.accent }

		case "muted":
			if (!theme.__colors.muted) throw error
			return { color: theme.__colors.muted }

		default:
			selectedColor = _.get(Colors, color as string, null)
	}

	if (!selectedColor) err = error

	return { color: selectedColor, err }
}

/* 

	********************
	   Border Radius
	********************

*/
export function ParseBorderRadiusSize(size: string | number): string {
	if (typeof size === "number") return `${size / 16}rem`
	else if (typeof size === "string" && size.includes("rem")) return size
	return BorderRadiusSizes[size]
}
