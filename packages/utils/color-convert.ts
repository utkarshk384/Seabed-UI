export function Hex2Rgb(hex: string): string {
	hex = hex.replace("#", "")

	const r = parseInt(hex.slice(0, 2), 16)
	const g = parseInt(hex.slice(2, 4), 16)
	const b = parseInt(hex.slice(4, 6), 16)

	return `${r} ${g} ${b}`
}
export function Rgb2Hex(rgb: number[]): string {
	let hex = "#"

	hex = hex + rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16)
	return hex
}
