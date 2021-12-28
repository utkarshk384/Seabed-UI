import type { Dict } from "@seabedui/types"

export function toHSL(color: string): string {
	/* If HSL then return */
	if (isHSL(color)) return color

	let r, g, b
	if (isHEX(color)) {
		color = color.replace("#", "")

		if (color.length != 6) throw new Error(`HEXtoHSL: Invalid hex string: ${color}`)

		r = parseInt(color.substr(0, 2), 16)
		g = parseInt(color.substr(2, 2), 16)
		b = parseInt(color.substr(4, 2), 16)
	} else if (isRGB(color)) {
		const RGBarray = color.split(",")
		r = parseInt(RGBarray[0])
		g = parseInt(RGBarray[1])
		b = parseInt(RGBarray[2])
	} else throw new Error(`Invalid color: ${color}`)
	;(r = r / 255), (g = g / 255), (b = b / 255)

	const min = Math.min(r, g, b)
	const max = Math.max(r, g, b)
	const delta = max - min

	let h = 0,
		s = 0,
		l = 0

	if (max === min) h = 0
	else if (r === max) h = (g - b) / delta
	else if (g === max) h = 2 + (b - r) / delta
	else if (b === max) h = 4 + (r - g) / delta

	h = Math.min(h * 60, 360)

	if (h < 0) h += 360

	l = (min + max) / 2

	if (max === min) s = 0
	else if (l <= 0.5) s = delta / (max + min)
	else s = delta / (2 - max - min)
	;(h = Math.round(h)), (s = Math.round(s * 100)), (l = Math.round(l * 100))

	return `${h}, ${s}%, ${l}%`
}

export const isRGB = (color: string): boolean => {
	let rgb = false

	if (color.indexOf("rgb") > -1) rgb = true
	else if (color.split(",").length == 3) rgb = true

	return rgb
}

export const isHEX = (color: string): boolean => {
	let hex = false

	if (color.indexOf("#") > -1) hex = true

	return hex
}

export const isHSL = (color: string): boolean => {
	let hsl = false
	const arr = color.split(",")

	if (color.indexOf("hsl") > -1) hsl = true
	else if (arr.length == 3) {
		if (arr[1].indexOf("%") > -1 && arr[2].indexOf("%") > -1) hsl = true
	}

	return hsl
}

export function genShadesTint(hsl: string): string[] {
	const NUMBER_OF_COLORS = 9
	const hslArray = hsl.split(",")

	if (hslArray.length != 3) throw new Error(`generateShades: Invalid hsl string: ${hsl}`)

	const color: Dict<number> = {
		h: parseInt(hslArray[0]),
		s: parseInt(hslArray[1]),
		l: parseInt(hslArray[2]),
	}

	const colors = new Array(NUMBER_OF_COLORS)
	colors[4] = hsl

	let calcHue = color.h,
		calcLight = color.l

	// Tints
	for (let i = 3; i >= 0; i--) {
		if (calcLight + 5 < 80) {
			calcLight += 5
			calcHue = color.h
		} else calcHue += 5

		colors[i] = `${calcHue}, ${color.s}%, ${calcLight}%`
	}

	// Shades
	calcHue = color.h
	calcLight = color.l
	for (let i = 5; i < 9; i++) {
		if (calcLight - 5 < 10) calcHue += 5
		else {
			calcHue = color.h
			calcLight -= 5
		}

		colors[i] = `${calcHue}, ${color.s}%, ${calcLight}%`
	}

	return colors
}
