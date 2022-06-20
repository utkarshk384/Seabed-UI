import { makeCSSVariables, ParseCSS, ValidateCSS, styled } from "../src/css"

const ExpectedOutput = {
	".test-class": {
		"font-size": "1rem",
		"text-align": "center",
	},
}

test("Make a list of CSS Variables from an object with or without prefix", () => {
	const bp = {
		sm: "420px",
		md: "420px",
		lg: "420px",
	}

	const colors = {
		white: "#ffffff",
		black: "#3f3f3f",
	}

	const bpOutput = makeCSSVariables(bp, "bp")
	const colorsOutput = makeCSSVariables(colors)

	expect(bpOutput).toEqual({
		"--bp-sm": "420px",
		"--bp-md": "420px",
		"--bp-lg": "420px",
	})

	expect(colorsOutput).toEqual({
		"--white": "#ffffff",
		"--black": "#3f3f3f",
	})
})

test("Read CSS from and parse the content into a JS Object", () => {
	const css = ParseCSS({
		code: `.test-class {
		font-size: 1rem;
		text-align: center;
	  }
	  `,
	})

	const cssFile = ParseCSS({ file: "./packages/utils/tests/test.css" })

	expect(css).toEqual(ExpectedOutput)
	expect(cssFile).toEqual(ExpectedOutput)
	expect(() => {
		ParseCSS({ code: "// This is not a valid CSS" })
	}).toThrowError(/Error while parsing css/)
})

test("Validate CSS ", () => {
	const cssValidate = {
		".test-class": {
			"font-size": "1rem",
			"text-align": "center",
		},
	}

	expect(cssValidate).toEqual(cssValidate)
	expect(() => {
		ValidateCSS({})
	}).toThrowError(/Error while validating CSS/)
})

test("if styled returns validate css", () => {
	const fontSize = "1rem",
		textAlign = "center"
	const css = styled`.test-class {
		font-size: ${fontSize};
		text-align: ${textAlign};
	  }`

	expect(css).toEqual(ExpectedOutput)
	expect(() => {
		styled`.test-class {;}`
	}).toThrowError(/Error while parsing css/)
})
