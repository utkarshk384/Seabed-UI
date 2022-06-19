import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import type { BaseProps } from "./types"

type Props = BaseProps

const Component: React.FC<Props> = (props) => {
	return <button {...props}>{props.children}</button>
}

export default {
	title: "Component/Button",
	component: Component,
	argTypes: {
		children: {
			type: "string",
			description: "Content of the button",
			name: "label",
		},
		className: {
			control: { disable: true, required: false },
		},
	},
} as Meta<Props>

type DefaultProp = Story<Props>

export const Variants: DefaultProp = ({ children = "Button" }) => (
	<div className="flex gap-x-11 items-center justify-center">
		<Component className="btn btn-solid btn-primary btn-sm">{children}</Component>
		<Component className="btn btn-outline btn-primary btn-sm">{children}</Component>
		<Component className="btn btn-ghost btn-primary btn-sm">{children}</Component>
		<Component className="btn btn-link btn-primary btn-sm">{children}</Component>
	</div>
)

export const Sizes: DefaultProp = ({ children = "Button" }) => (
	<div className="flex gap-x-11 items-center justify-center">
		<Component className="btn btn-solid btn-primary btn-sm">{children}</Component>
		<Component className="btn btn-solid btn-primary btn-md">{children}</Component>
		<Component className="btn btn-solid btn-primary btn-lg">{children}</Component>
	</div>
)

export const WideButtons: DefaultProp = ({ children = "Button" }) => (
	<div className="flex gap-x-11 items-center justify-center">
		<Component className="btn btn-solid btn-primary bg-primary-800/70 btn-sm btn-wide">
			{children}
		</Component>
		<Component className="btn btn-solid btn-primary btn-md btn-wide">{children}</Component>
		<Component className="btn btn-solid btn-primary btn-lg btn-wide">{children}</Component>
	</div>
)

const Ellipsis: React.FC = (props) => (
	<svg
		aria-hidden="true"
		data-prefix="fas"
		data-icon="ellipsis-h"
		className="svg-inline--fa fa-ellipsis-h fa-w-16"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		{...props}
	>
		<path
			fill="currentColor"
			d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
		/>
	</svg>
)

export const CircleButtons: DefaultProp = ({ children = <Ellipsis /> }) => (
	<div className="flex gap-x-11 items-center justify-center">
		<Component className="btn btn-solid btn-primary btn-md btn-circle">{children}</Component>
		<Component className="btn btn-solid btn-primary btn-lg btn-circle">{children}</Component>
		<Component className="btn btn-solid btn-primary btn-sm btn-circle">{children}</Component>
	</div>
)

export const PillButtons: DefaultProp = ({ children = "Button" }) => (
	<div className="flex gap-x-11 items-center justify-center">
		<Component className="btn btn-solid btn-primary btn-sm btn-round ">{children}</Component>
		<Component className="btn btn-solid btn-primary btn-md btn-round ">{children}</Component>
		<Component className="btn btn-solid btn-primary btn-lg btn-round ">{children}</Component>
	</div>
)

export const Colors: DefaultProp = ({ children = "Button" }) => (
	<div className="flex flex-col gap-y-32 items-center justify-center">
		<div>
			<h1 className="text-2xl text-primary text-custom text-center font-sans mb-10 font-bold">
				Brand Colored Buttons
			</h1>
			<div className="flex gap-x-11 items-center justify-center">
				<Component className="btn btn-solid btn-primary btn-md">{children}</Component>
				<Component className="btn btn-solid btn-secondary btn-md">{children}</Component>
				<Component className="btn btn-solid btn-accent btn-md">{children}</Component>
			</div>
		</div>

		<div>
			<h1 className="text-2xl text-custom bg-text-center font-sans mb-10 font-bold">
				State Colored Buttons
			</h1>
			<div className="flex gap-x-11 items-center justify-center">
				<Component className="btn btn-solid btn-success btn-md">{children}</Component>
				<Component className="btn btn-solid btn-info btn-md">{children}</Component>
				<Component className="btn btn-solid btn-warn btn-md">{children}</Component>
				<Component className="btn btn-solid btn-error btn-md">{children}</Component>
			</div>
		</div>
	</div>
)

export const States: DefaultProp = ({ children }) => (
	<div className="flex gap-x-11 items-center justify-center">
		<Component className="btn btn-solid btn-primary btn-md btn-loading">
			{children || "Loading"}
		</Component>
		<Component className="btn btn-solid btn-primary btn-md btn-loading" />
		<Component className="btn btn-solid btn-primary btn-md btn-disabled">
			{children || "Disabled"}
		</Component>
	</div>
)
