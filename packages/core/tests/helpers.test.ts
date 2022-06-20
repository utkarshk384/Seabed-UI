import {
	SetDefaults,
	resolveColors,
	normalizeFont,
	resolveBorderRadius,
	recursiveFunction,
} from "../src/helpers"
import { defaultTheme } from "../src/themes"

import type { colorsInterface, InternalTheme, radiusInterface } from "@seabedui/types"

test("if everything in the theme object is set correctly", () => {
	const output = SetDefaults({} as InternalTheme)

	expect(output).toEqual({
		breakpoints: defaultTheme.breakpoints,
		colors: defaultTheme.colors,
		fontSize: defaultTheme.fontSize,
		radius: "base",
		radiusConfig: defaultTheme.radiusConfig,
		shadows: defaultTheme.shadows,
	})
})

test("if colors are resolved correctly", () => {
	jest.spyOn(console, "warn").mockImplementation(jest.fn())

	const dark = defaultTheme.colors?.dark
	const colors = { dark }
	const noColors = resolveColors({} as unknown as Required<colorsInterface>)
	const withColors = resolveColors(colors as unknown as Required<colorsInterface>)

	const expected = {
		dark: dark,
		light: defaultTheme.colors?.light,
		neutral: defaultTheme.colors?.neutral,
	}

	expect(noColors).toEqual(expected)
	expect(withColors).toEqual(expected)
})

test("if fonts are normalized", () => {
	const fonts = ["1rem", 0, "10px", "5em"]
	const expected = ["1rem", "0px", "10px", "5em"]

	for (const font of fonts) expect(normalizeFont(font)).toEqual(expected[fonts.indexOf(font)])
})

test("if border radius is resolved correctly", () => {
	const textBased = resolveBorderRadius("base", defaultTheme.radiusConfig as radiusInterface)
	const numberBased = resolveBorderRadius("10px", defaultTheme.radiusConfig as radiusInterface)

	expect(textBased).toEqual("0.375rem")
	expect(numberBased).toEqual("10px")
})

test("if recursiveFunction works correctly", () => {
	const addSuffix = (num: string): string => {
		return `${num}px`
	}

	const obj = {
		a: {
			b: 1,
		},
		c: 3,
		d: {
			e: {
				f: 4,
			},
		},
	}

	const output = recursiveFunction(obj, (val) => addSuffix(val))

	const expected = {
		a: {
			b: "1px",
		},
		c: "3px",
		d: {
			e: {
				f: "4px",
			},
		},
	}

	expect(output).toEqual(expected)
})
