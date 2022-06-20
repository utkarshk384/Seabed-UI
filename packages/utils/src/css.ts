/* eslint-disable @typescript-eslint/ban-ts-comment */
import { parse, stringify } from "css"
import fs from "fs"

import type { CSSType, Dict, sourceType } from "@seabedui/types"
import type { Declaration, AtRule, Rule, KeyFrame } from "css"

export const makeCSSVariables = (obj: Dict<string>, prefix?: string): Dict<string> => {
	const vars: Dict<string> = {}

	Object.keys(obj).forEach((key) => {
		if (prefix) vars[`--${prefix}-${key}`] = obj[key]
		else vars[`--${key}`] = obj[key]
	})

	return vars
}

export function ParseCSS(source: sourceType): CSSType {
	let code = source.code ? source.code : ""

	if (source.file) code = fs.readFileSync(source.file, "utf-8")

	if (code == "") throw new Error("Could not load css code")

	const ast = parse(code, { silent: true }),
		styleSheet = ast.stylesheet
	let styles: CSSType = {}

	/* If error while parsing */
	if (styleSheet && styleSheet.parsingErrors && styleSheet.parsingErrors.length > 0)
		throw new Error(`Error while parsing css: ${styleSheet.parsingErrors[0]}`)

	styleSheet?.rules.forEach((rule) => (styles = { ...styles, ...filterRule(rule) }))

	return styles
}

export function styled(css: TemplateStringsArray, ...args: string[]): CSSType {
	let code = "",
		i = 0

	const argsLen = args.length
	const cssLen = css.length
	const len = cssLen > argsLen ? cssLen : argsLen

	while (i < len) {
		if (i < cssLen) code += css[i]
		if (i < argsLen) code += args[i]

		i += 1
	}

	return ParseCSS({ code })
}

export function ValidateCSS(css: CSSType): CSSType {
	try {
		const stringified = stringify(css)
		parse(stringified)
	} catch (err) {
		throw new Error(`Error while validating CSS. ${err}`)
	}

	return css
}

const filterRule = (rule: Rule | Comment | AtRule): CSSType => {
	const styles: CSSType = {}

	//@ts-ignore
	const type = rule.type

	// If object is ob type Comment
	if (typeof type === "undefined") return {}

	switch (type) {
		case "rule":
			//@ts-ignore
			return getCSS(rule.selectors, rule.declarations)

		case "keyframes": {
			//@ts-ignore
			const name = `@keyframes ${rule.name}`
			styles[name] = {}

			//@ts-ignore
			const keyFrames: RequiredBy<KeyFrame>[] = rule.keyframes

			keyFrames.forEach((keyFrame) => {
				styles[name] = { ...styles[name], ...getCSS(keyFrame.values, keyFrame.declarations) }
			})
		}
	}

	return styles
}

const getCSS = (selectorArray: string[], declarations: Declaration[]): CSSType => {
	const styles: CSSType = {}

	const selectors = selectorArray.join(", ")

	declarations.forEach((style) => {
		const s = { [style.property as string]: style.value as string }
		styles[selectors] = {
			...styles[selectors],
			...s,
		}
	})

	return styles
}
