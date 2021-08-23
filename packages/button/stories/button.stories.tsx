import { Button } from "../src/button"

import { Meta } from "@storybook/react"

export default {
	title: "Component/Button",
	component: Button,
} as Meta

export const Solid: React.VFC<Record<string, never>> = () => (
	<Button variant="solid" size="md" mt="10">
		Example Button
	</Button>
)

export const Outline: React.VFC<Record<string, never>> = () => (
	<Button variant="outline" size="md">
		Example Button
	</Button>
)

export const Ghost: React.VFC<Record<string, never>> = () => (
	<Button variant="ghost" size="md">
		Example Button
	</Button>
)

export const Link: React.VFC<Record<string, never>> = () => (
	<Button variant="link" size="md">
		Example Button
	</Button>
)

export const Disabled: React.VFC<Record<string, never>> = () => (
	<Button variant="disabled" size="md">
		Example Button
	</Button>
)
