import { Button } from "./index"

import { Meta } from "@storybook/react"

export default {
	title: "Component/Button",
	component: Button,
} as Meta

export const Primary: React.VFC<Record<string, never>> = () => (
	<Button variant="outline">Example Button</Button>
)
