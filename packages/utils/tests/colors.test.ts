import { isHEX, isRGB, isHSL, toHSL } from "../src/colors"

test("Check if the given color is a HEX Color", () => {
	const hexOne = isHEX("hsl(0, 0%, 0%)")
	const hexTwo = isHEX("#3f3f3f")

	expect(hexOne).toBe(false)
	expect(hexTwo).toBe(true)
})

test("Check if the given color is a HSL Color", () => {
	const hslOne = isHSL("hsl(0, 0%, 0%)")
	const hslTwo = isHSL("rgb(0, 0, 0)")

	expect(hslOne).toBe(true)
	expect(hslTwo).toBe(false)
})

test("Check if the given color is a rgb Color", () => {
	const rgbOne = isRGB("hsl(0, 0%, 0%)")
	const rgbTwo = isRGB("rgb(0, 0, 0)")

	expect(rgbOne).toBe(false)
	expect(rgbTwo).toBe(true)
})

test("Convert RGB and HEX color format to HSL format", () => {
	const hex = toHSL("#FFFFFF")
	const rgb = toHSL("rgb(0, 0, 0)")

	expect(hex).toBe("0, 0%, 100%")
	expect(rgb).toBe("0, 0%, 0%")
	expect(() => {
		toHSL("asdf")
	}).toThrowError("Invalid Color: asdf. ")
})
