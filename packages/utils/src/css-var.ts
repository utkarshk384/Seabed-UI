import _ from "lodash"
import { WalkBuilder, WalkNode } from "walkjs"

//TODO: Add Custom css-var prefix
export const PREFIX = "sbaa"

export const ExcludeProperties = ["colorScheme", "cssPrefix"]

export function CssVar(
	obj: Record<string, unknown>,
	Customizer?: (node: WalkNode, root: HTMLElement) => void
): void {
	const root = document.documentElement as HTMLElement
	if (!root)
		throw new Error("Document is not defined. Try calling the function inside a useEffect.")

	new WalkBuilder()
		.withSimpleCallback((node: WalkNode) => {
			if (node.nodeType === "value") {
				if (Customizer) Customizer(node, root)
				else SetProperty(node.key as string, node.val, root, PREFIX)
			}
		})
		.walk(obj)
}

const addCSSPrefix = (varName: string, prefix?: string): string => {
	if (prefix) return `--${prefix}-${_.kebabCase(varName)}`
	return `--${_.kebabCase(varName)}`
}

export const SetProperty = (
	varName: string,
	val: string,
	root: HTMLElement = document.documentElement,
	prefix?: string
): void => {
	if (prefix) root.style.setProperty(addCSSPrefix(varName as string, prefix), `${val}`)
	else root.style.setProperty(addCSSPrefix(varName), `${val}`)
}

export const GetProperty = (varName: string, root: HTMLElement, prefix?: string): void => {
	const computedStyle = getComputedStyle(root)
	if (prefix) computedStyle.getPropertyValue(addCSSPrefix(varName, prefix))
	else computedStyle.getPropertyValue(addCSSPrefix(varName))
}
