const InvalidColor = (clr: string, additionalMsg?: string): Error =>
	new Error(`Invalid Color: ${clr}. ${additionalMsg ?? ""}`)

export const isHEX = (color: string): boolean => {
	let hex = false
	if (color.match(/#[0-9A-Fa-f]{6}/)) hex = true

	return hex
}

export const isRGB = (color: string): boolean => {
	let rgb = false

	if (color.match(/rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)/)) rgb = true
	else if (color.match(/\d{1,3},\s?\d{1,3},\s?\d{1,3}/)) rgb = true

	return rgb
}

export const isHSL = (color: string): boolean => {
	let hsl = false

	if (color.match(/hsl\((\d){1,3},\s?(\d){1,3}%,\s?(\d){1,3}%\)/)) hsl = true
	else if (color.match(/\d{1,3},\s?\d{1,3}%,\s?\d{1,3}%/)) hsl = true

	return hsl
}

export function toHSL(clr: string): string {
	let color = clr

	/* If HSL then return */
	if (isHSL(color)) {
		color = color.replace("hsl(", "").replace(")", "")
		const split = color.split(",")
		const h = split[0]
		const s = split[1]
		const l = split[2]

		return `${h}, ${s}%, ${l}%`
	}

	let r, g, b
	if (isHEX(color)) {
		color = color.replace("#", "")

		r = parseInt(color.slice(0, 2), 16)
		g = parseInt(color.slice(2, 4), 16)
		b = parseInt(color.slice(4, 6), 16)
	} else if (isRGB(color)) {
		color = color.replace("rgb(", "").replace(")", "")
		const RGBarray = color.split(",")
		r = parseInt(RGBarray[0])
		g = parseInt(RGBarray[1])
		b = parseInt(RGBarray[2])
	} else throw InvalidColor(clr)

	r /= 255
	g /= 255
	b /= 255

	const min = Math.min(r, g, b),
		max = Math.max(r, g, b)
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

	const hue = Math.round(h),
		saturation = Math.round(s * 100),
		lightness = Math.round(l * 100)

	return `${hue}, ${saturation}%, ${lightness}%`
}

export function toRGB(color: string): string {
	if (isRGB(color)) {
		color = color.replace("rgb(", "").replace(")", "").replace("rgba(", "")
		const RGBarray = color.split(",")

		return `${RGBarray[0]} ${RGBarray[1]} ${RGBarray[2]}`
	} else if (isHEX(color)) {
		color = color.replace("#", "")
		const r = parseInt(color.slice(0, 2), 16)
		const g = parseInt(color.slice(2, 4), 16)
		const b = parseInt(color.slice(4, 6), 16)

		return `${r} ${g} ${b}`
	} else if (isHSL(color)) {
		let r, g, b
		color = color.replace("hsl(", "").replace(")", "").replace("hsla(", "")
		const split = color.split(",")
		const h = parseInt(split[0])
		const s = parseInt(split[1])
		const l = parseInt(split[2])

		if (s == 0) {
			r = g = b = l // achromatic
		} else {
			const hue2rgb = function hue2rgb(p: number, q: number, t: number): number {
				if (t < 0) t += 1
				if (t > 1) t -= 1
				if (t < 1 / 6) return p + (q - p) * 6 * t
				if (t < 1 / 2) return q
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
				return p
			}

			const q = l < 0.5 ? l * (1 + s) : l + s - l * s
			const p = 2 * l - q
			r = hue2rgb(p, q, h + 1 / 3)
			g = hue2rgb(p, q, h)
			b = hue2rgb(p, q, h - 1 / 3)
		}

		return `${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)}`
	}

	return color
}
