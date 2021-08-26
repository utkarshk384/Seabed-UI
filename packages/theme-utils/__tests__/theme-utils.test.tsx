import * as utils from "../src"
import { Theme } from "../src/defaults"

it("Should convert hex to rgb and back", () => {
	const hex = "#f3f3f3"
	const rgb = [243, 243, 243]

	expect(utils.Hex2Rgb(hex)).toEqual("243, 243, 243")
	expect(utils.Rgb2Hex(rgb)).toEqual(hex)
})

it("Should invert the given color", () => {
	expect(utils.InvertGrayscale("243, 243, 243")).toEqual("255, 255, 255")
})

it("Should resolve the given colors", () => {
	expect(utils.ResolveColor("bg.primary", Theme)[0]).toEqual(utils.Colors.green[100])
	expect(utils.ResolveColor(utils.Colors.green[100], Theme)[0]).toEqual(utils.Colors.green[100])
})

it("Should correctly parse border radius", () => {
	expect(utils.ParseBorderSizes(16)[0]).toEqual("1rem")
	expect(utils.ParseBorderSizes("sm")[0]).toEqual("0.125rem")
})
