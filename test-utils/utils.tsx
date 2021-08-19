import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { RunOptions, RunOnly, TagValue } from "axe-core"
import { axe, toHaveNoViolations } from "jest-axe"
import { render, RenderOptions, RenderResult } from "@testing-library/react"

import { SeabedProvider } from "../packages/theme/src"

const Providers: React.FC = ({ children }) => <SeabedProvider>{children}</SeabedProvider>

/**
 *
 * @param { React.FC } ui - Test Component
 * @param { RenderOptions } options - Test render options
 * @returns { RenderResult } - Result from Testing library
 * A function that renders a component using the testing library
 */
export function renderer(ui: React.ReactElement, options?: RenderOptions): RenderResult {
	return render(ui, { wrapper: Providers })
}

interface AxeOptions extends RunOptions {
	runOnly?: RunOnly | TagValue[] | string[]
}
/**
 *
 * @param { React.FC } ui - Test Component
 * @param { AxeOptions } axeOptions - Any configuration options related to axe
 * @param { RenderOptions } renderOptions - Any configuration object related to RTL render
 */
export const testA11y = async (
	ui: React.ReactElement,
	axeOptions: AxeOptions = {},
	renderOptions: RenderOptions = {}
): Promise<void> => {
	expect.extend(toHaveNoViolations)
	const container = React.isValidElement(ui) ? renderer(ui, renderOptions).container : ui

	const results = await axe(container, axeOptions)

	expect(results).toHaveNoViolations()
}

export { screen } from "@testing-library/react"
