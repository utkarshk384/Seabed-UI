import { BorderRadiusSizes } from "@seabedUI/core"

export function ParseBorderRadiusSize(size: string | number): string {
	if (typeof size === "number") return `${size / 16}rem`
	else if (typeof size === "string" && size.includes("rem")) return size
	return BorderRadiusSizes[size]
}
