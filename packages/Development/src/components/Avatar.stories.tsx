import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import type { BaseProps } from "./types"

export type Props = BaseProps

const Component: React.FC<Props> = (props) => {
	return <div {...props}>{props.children}</div>
}

export default {
	title: "Component/Avatar",
	component: Component,
	argTypes: {
		className: {
			control: { disable: true, required: false },
		},
	},
} as Meta<Props>

type DefaultProp = Story<Props>

export const Template: DefaultProp = (args) => {
	const styles: React.CSSProperties = {
		outline: "5px",
		outlineStyle: "solid",
		outlineOffset: "1px",
	}

	return (
		<div className="flex items-center justify-center">
			<Component
				className="avatar relative avatar-sm outline-opacity-75 outline-accent-900"
				style={styles}
			>
				<img src="https://picsum.photos/400/400" alt="An image" />
			</Component>
		</div>
	)
}
