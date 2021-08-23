import _ from "lodash"
import { Dict } from "@seabedui/types"
import { WalkBuilder, WalkNode } from "walkjs"

type CSSVarOptions = {
	Customizer?: (node: WalkNode, root: HTMLElement) => void
	prefix?: string
}

//TODO: Update comments of prefix

/**
 *
 * @param { Dict<unknown> } obj - An indexable object that will be traversed and then be used to make css variable
 * @param { (node, root) => void } Customizer - A callback function that can be called to customized to set the css variable.
 * 			@param { WalkNode } - The walk node
 * 			@param { HTMLElement } - The element root html element.
 * A function that makes css variables based on given object that will be traversed.
 */
export function CssVar(obj: Dict<unknown>, opts: CSSVarOptions): void {
	const root = document.documentElement as HTMLElement
	if (!root)
		throw new Error("Document is not defined. Try calling the function inside a useEffect.")

	new WalkBuilder()
		.withSimpleCallback((node: WalkNode) => {
			if (node.nodeType === "value") {
				if (opts.Customizer) opts.Customizer(node, root)
				else SetProperty(node.key as string, node.val, root, opts.prefix)
			}
		})
		.walk(obj)
}

/**
 *
 * @param { string } varName - The css variable name
 * @returns { string } - A kebab cased string that may or maynot include the prefix.
 * A function that takes in a css variable name and returns a kebab cased version of it.
 */
const addCSSPrefix = (varName: string, prefix?: string): string => {
	if (prefix) return `--${prefix}-${_.kebabCase(varName)}`
	return `--${_.kebabCase(varName)}`
}

/**
 *
 * @param { string } varName - The css variable name
 * @param { string } val - Value to set in the css variable
 * @param { HTMLElement = document.documentElement } root - The root element of the document.
 * A function that sets css variable using the given name and value.
 */
export const SetProperty = (
	varName: string,
	val: string,
	root: HTMLElement = document.documentElement,
	prefix?: string
): void => {
	root.style.setProperty(addCSSPrefix(varName as string, prefix), `${val}`)
}

/**
 *
 * @param { string } varName - Css variable name.
 * @param { HTMLElement } root - The root element of the document.
 * A function that gets the value of the css variable.
 */
export const GetProperty = (varName: string, root: HTMLElement, prefix?: string): void => {
	const computedStyle = getComputedStyle(root)
	computedStyle.getPropertyValue(addCSSPrefix(varName, prefix))
}
