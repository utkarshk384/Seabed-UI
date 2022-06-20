import { flattenObject, replaceAll } from "../src/general"

test("Flatten a nested object into a single level", () => {
	const result = flattenObject({
		A: {
			B: {
				C: ["1", "2", "3"],
			},
			D: "4",
		},
		E: {
			F: "5",
			G: {
				H: ["6", "7"],
			},
		},
	})

	expect(result).toEqual({
		"A-B-C": ["1", "2", "3"],
		"A-D": "4",
		"E-F": "5",
		"E-G-H": ["6", "7"],
	})
})

test("Replace a given string with the expression or the string", () => {
	const str = "Can you can a can as a canner can can a can?"
	const expr = /can\b/g

	const result = replaceAll(str, expr, "foo")

	expect(result).toEqual("Can you foo a foo as a canner foo foo a foo?")
})
