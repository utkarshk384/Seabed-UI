import React from "react"

import "../../../test-utils/matchMedia.mock"
import { renderer, testA11y, screen } from "../../../test-utils/utils"

import { Button, ButtonGroup } from "../src"

const Component: React.FC = () => (
	<ButtonGroup data-testid="btn-group">
		<Button>Button One</Button>
		<Button>Button Two</Button>
		<Button>Button Three</Button>
	</ButtonGroup>
)

it("Should pass a11y tests", async () => {
	await testA11y(<Component />)
})

it("Should render", () => {
	renderer(<Component />)

	expect(screen.getByTestId("btn-group")).toBeInTheDocument()
})

it("Should be well spaced", () => {
	renderer(
		<ButtonGroup data-testid="btn-group" gap="10">
			<Button>Button One</Button>
			<Button>Button Two</Button>
			<Button>Button Three</Button>
		</ButtonGroup>
	)
})
