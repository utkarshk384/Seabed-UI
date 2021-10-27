import { Kbd } from "../src/kbd"

import { Meta } from "@storybook/react"

export default {
	title: "Component/Kbd",
	component: Kbd,
} as Meta

export const Solid: React.VFC<Record<string, never>> = () => <Kbd>AA</Kbd>
