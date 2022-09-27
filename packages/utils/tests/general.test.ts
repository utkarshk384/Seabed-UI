import { flattenObject, recursiveFunction, replaceAll } from "../src/general"

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
