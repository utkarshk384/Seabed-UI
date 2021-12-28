import type { NestedDict } from "@seabedui/types"

export const ColorsCSSVar = (colorVariants: string[]): NestedDict => {
	const CSSProperties: NestedDict = {}

	colorVariants.forEach((key) => {
		CSSProperties[key] = {}
		for (let i = 1; i < 10; i++) {
			let count = i * 100
			CSSProperties[key][`${count}`] = `var(--${key}-${count})`
			count += 100
		}
	})

	return CSSProperties
}
