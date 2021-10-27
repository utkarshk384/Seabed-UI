import { BorderRadiusSizes } from "./defaults"

import type { FontInterface, FontNumberInterface, HandleReturn, SpacingType } from "@seabedui/types"
import { GapSizes } from "./defaults"

export function ParseBorderSizes(size: string | number): HandleReturn<string | null> {
	if (typeof size === "number") return [`${size / 16}rem`]
	else if (typeof size === "string" && size.includes("rem")) return [size]

	const borderSize = BorderRadiusSizes[size]

	if (typeof borderSize === undefined)
		return [null, new Error(`Couldn't Parse border Sizes of ${size}`)]
	return [BorderRadiusSizes[size]]
}

export function ParseSizes(size: SpacingType): HandleReturn<string | null> {
	let parsedSize = ""

	if (typeof size === "string" && size.includes("rem")) return [size]
	else if (typeof size === "number" || typeof size === "string") parsedSize = GapSizes[size]

	if (!parsedSize) return [null, new Error(`Couldn't parse the size of ${size}`)]
	return [parsedSize]
}

export function ParseFont(
	family: string,
	families: FontInterface | FontNumberInterface
): HandleReturn<string | null> {
	let selectedFamily = ""

	Object.keys(families).forEach((key) => {
		if (family === key) selectedFamily = key
	})

	if (selectedFamily === "")
		return [null, new Error(`Couldn't find the font specified. value: ${family}`)]
	return [selectedFamily]
}
