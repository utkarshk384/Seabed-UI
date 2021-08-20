import { useMemo } from "react"
import { MemoizedStylesReturnType } from "./types"
import { Colors, classnames, ResolveColor, ThrowError } from "@seabedui/utils"
import { css } from "@linaria/core"

import type { Dict } from "@seabedui/types"

export const MemoizedClasses = (className: string | undefined): string => {
	const val = useMemo(() => classnames(variants, transitions, className || ""), [className])
	return val
}

export const MemoizedStyles: MemoizedStylesReturnType = (props, theme) => {
	const val = useMemo<Dict>(() => {
		const btnSize = sizes[props.size]
		if (!btnSize) throw new Error(`Couldn't parse button size. Value: ${btnSize}`)

		const btnColor = ResolveColor(props.color, theme)
		if (btnColor.err) throw ThrowError(btnColor.err, "Button color is undefined")

		const textColor = ResolveColor(props.textColor, theme)
		if (textColor.err) throw ThrowError(textColor.err, "Button text color is undefined")
		const fontSize = theme.typography.fontSize[props.textSize]

		return {
			"--padding": btnSize,
			"--color": btnColor.color,
			"--text-color": textColor.color,
			"--size": fontSize,
			"--disabled": Colors.gray[600],
		}
	}, [props, theme])

	return val
}

const sizes: Dict = {
	xs: "0.25rem 0.5rem",
	sm: "0.5rem 1rem",
	md: "1.5rem 3rem",
	lg: "2rem 4rem",
	xl: "3rem 6rem",
}

const transitions = css`
	/* 
		Base Transitions
	*/
	transition: background 0.25s ease-in-out, color 0.25s ease-in, outline-offset 0.25s ease-in-out,
		outline 0.25s ease-in-out;
`

/* 
	Variant Styles
*/
const variants = css`
	/* Solid */
	&[data-emphasis^="solid"] {
		background: rgb(var(--color));
		@media (hover: hover) {
			&:hover {
				background: rgba(var(--color), 0.95);
			}
		}
		&:active,
		&:focus {
			background: rgba(var(--color), 0.75);
		}
	}

	/* Outline */
	&[data-emphasis^="outline"] {
		border: 2px solid rgb(var(--color));
	}

	/* Ghost */
	&[data-emphasis^="ghost"] {
		background: transparent;
		outline: none;
		@media (hover: hover) {
			&:hover,
			&:active,
			&:focus {
				background-color: rgba(var(--color), 0.35);
			}
		}
	}

	/* Link */
	&[data-emphasis^="link"] {
		background: transparent;
		color: rgb(var(--sbu-accent));
		text-decoration: underline;
		outline: none;

		/* &:active,
		&:focus {
			color: ;
		} */
	}

	/* Disabled */
	&[data-loading^="true"],
	&[disabled^="true"] {
		background: rgb(var(--disabled));
		outline: none;
	}

	&[data-emphasis^="disabled"] {
		background: rgb(var(--color), 0.5);
		filter: brightness(80%);
		cursor: not-allowed;
	}
`
