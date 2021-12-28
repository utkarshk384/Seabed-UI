import type { NestedDict } from "@seabedui/types"

type ColorsType = {
	text?: boolean
	bg?: boolean
	border?: boolean
	divider?: boolean
	decoration?: boolean
	ring?: boolean
	stroke?: boolean
	"ring-offest"?: boolean
	outline?: boolean
}

type ParamaterTypes = {
	cssVar: string
	customName?: string
	colorTypes?: ColorsType
}

const defaultTypes = {
	text: true,
	bg: true,
	border: true,
	decoration: true,
	stroke: true,
	divider: true,
	ring: true,
	"ring-offest": true,
	outline: true,
}

export function createColorClasses({ cssVar, customName, colorTypes }: ParamaterTypes): NestedDict {
	const className = cssVar.replace("--", "")

	const toGenerate: Required<ColorsType> = (colorTypes || defaultTypes) as Required<ColorsType>

	const cssObject: NestedDict = {}

	if (toGenerate.text)
		cssObject[`.text-${customName || className}`] = {
			"--color": `hsla(var(${cssVar}), 1)`,
			color: `hsla(var(${cssVar}), 1)`,
		}

	if (toGenerate.bg)
		cssObject[`.bg-${customName || className}`] = {
			"--bg": `hsla(var(${cssVar}), var(--tw-bg-opacity))`,
			"background-color": `hsla(var(${cssVar}), var(--tw-bg-opacity))`,
		}

	if (toGenerate.border)
		cssObject[`.border-${customName || className}`] = {
			"--border": `hsla(var(${cssVar}), var(--tw-border-opacity))`,
			"border-color": `hsla(var(${cssVar}), var(--tw-border-opacity))`,
		}

	if (toGenerate.divider)
		cssObject[`.divider-${customName || className}`] = {
			"--border": `hsla(var(${cssVar}), var(--tw-divide-opacity))`,
			"border-color": `hsla(var(${cssVar}), var(--tw-divide-opacity))`,
		}

	if (toGenerate.outline)
		cssObject[`.outline-${customName || className}`] = {
			"--outline": `hsla(var(${cssVar}), var(--outline-opacity))`,
			"outline-color": `hsla(var(${cssVar}), var(--outline-opacity))`,
		}

	if (toGenerate.stroke)
		cssObject[`.stroke-${customName || className}`] = {
			"--stroke": `hsl(var(${cssVar}))`,
			stroke: `hsl(var(${cssVar}))`,
		}

	if (toGenerate.decoration)
		cssObject[`.decoration-${customName || className}`] = {
			"--decoration": `hsl(var(${cssVar}))`,
			"text-decoration": `hsl(var(${cssVar}))`,
		}

	if (toGenerate.ring)
		cssObject[`.ring-${customName || className}`] = {
			"--tw-ring-color": `hsla(var(${cssVar}), var(--tw-ring-opacity))`,
		}

	if (toGenerate["ring-offest"])
		cssObject[`.ring-offset-${customName || className}`] = {
			"--tw-ring-offset-color": `hsla(var(${cssVar}), var(--tw-ring-offset-opacity))`,
			"box-shadow": `0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow)`,
		}

	return cssObject
}
