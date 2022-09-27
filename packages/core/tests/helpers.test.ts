import { SetDefaults, resolveColors, normalizeFont, resolveBorderRadius } from "../src/helpers"
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

	const expectedNoColors = {
		dark: dark,
		light: defaultTheme.colors?.light,
		neutral: defaultTheme.colors?.neutral,
	}

	const expectedWithColors = {
		dark: dark,
		light: dark,
		neutral: defaultTheme.colors?.neutral,
	}

	expect(noColors).toEqual(expectedNoColors)
	expect(withColors).toEqual(expectedWithColors)
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
