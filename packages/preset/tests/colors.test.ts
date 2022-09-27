import { addHSL } from "../src/colors"

test("if given HSL values is formatted properly", () => {
	const clr = addHSL("225, 50%, 75%")

	expect(clr).toEqual("hsla(225, 50%, 75%, 1)")
})
