import * as utils from "../src"
import { Theme } from "../../theme/src/defaults/theme"

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
	expect(utils.ResolveColor("bg.primary", Theme).color).toEqual(utils.Colors.green[100])
	expect(utils.ResolveColor(utils.Colors.green[100], Theme).color).toEqual(utils.Colors.green[100])
})

it("Should correctly parse border radius", () => {
	expect(utils.ParseBorderRadiusSize(16)).toEqual("1rem")
	expect(utils.ParseBorderRadiusSize("sm")).toEqual("0.125rem")
})
