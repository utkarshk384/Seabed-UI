import React from "react"

import "../../../test-utils/matchMedia.mock"
import { renderer, testA11y, screen } from "../../../test-utils/utils"

import { Button } from "../src"

it("Should create a button", () => {
	renderer(<Button>Example Button</Button>)

	expect(screen.getByText("Example Button")).toBeInTheDocument()
	expect(screen.getByText("Example Button")).toBeInTheDocument()
})

it("Should pass a11y tests", async () => {
	await testA11y(<Button>Hello</Button>)
})

it("Should be in disabled state", () => {
	renderer(
		<Button data-testid="btn" isLoading>
			Example Button
		</Button>
	)

	// eslint-disable-next-line jest-dom/prefer-enabled-disabled
	expect(screen.getByTestId("btn")).toHaveAttribute("disabled", "true")
	expect(screen.getByTestId("btn")).toHaveAttribute("aria-disabled", "true")
})

it("Should be in loading state", () => {
	renderer(
		<Button
			data-testid="btn"
			isLoading
			loadingText="Loading..."
			loadingIcon={<div>Some Spinner</div>}
		>
			Example Button
		</Button>
	)
	/* Expect default text to be replaced */
	expect(screen.getByText("Loading...")).toBeInTheDocument()
	expect(screen.queryByText("Example Button")).not.toBeInTheDocument()

	/* Loading Icon */
	expect(screen.getByText("Some Spinner")).toBeInTheDocument()

	/* Loading and a11y */
	// eslint-disable-next-line jest-dom/prefer-enabled-disabled
	expect(screen.getByTestId("btn")).toHaveAttribute("disabled", "true")
	expect(screen.getByTestId("btn")).toHaveAttribute("aria-busy", "true")
	expect(screen.getByTestId("btn")).toHaveAttribute("data-loading", "true")
})

it("Should be in active state", () => {
	renderer(
		<Button data-testid="btn" isActive>
			Example Button
		</Button>
	)

	expect(screen.getByTestId("btn")).toHaveAttribute("data-active", "true")
	expect(screen.getByTestId("btn")).toHaveAttribute("aria-pressed", "true")
})
