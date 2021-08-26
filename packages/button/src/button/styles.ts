import { css } from "@linaria/core"
import { classnames, ThrowError } from "@seabedui/utils"
import { ResolveColor, Memoizer, ParseFont } from "@seabedui/theme-utils"

import type { SharedStylesProps } from "../types"
import type { DefaultThemeType, Dict, fontVariants } from "@seabedui/types"

export const useClasses = Memoizer<string | undefined>((className) =>
	classnames(variants, transitions, className || "")
)

export const useStyles = Memoizer<Required<SharedStylesProps>, Dict>((props, Theme) => {
	/* Creating new variable to comply with typescript types */
	const theme = Theme as DefaultThemeType

	const btnSize = sizes[props.size]
	if (!btnSize) throw new Error(`Couldn't parse button size. Value: ${btnSize}`)

	const [btnColor, btnErr] = ResolveColor(props.color, theme)
	if (btnErr) throw ThrowError(btnErr, "Button color is undefined")

	const [textColor, textErr] = ResolveColor(props.textColor, theme)
	if (textErr) throw ThrowError(textErr, "Button text color is undefined")

	const fontSize = theme.typography.fontSize[props.textSize]
	if (!fontSize) throw new Error(`Couldn't parse font size. Value: ${fontSize}`)

	const [fontFamily, fontErr] = ParseFont(
		props.fontFamily,
		theme.typography.fontFamily as fontVariants<"">
	)
	if (fontErr) throw ThrowError(fontErr, "Font family is undefined")

	return {
		"--padding": btnSize,
		"--bg-color": btnColor as string,
		"--text-color": textColor as string,
		"--size": fontSize,
		"--disabled": `var(--${theme.__prefix}-disabled)`,
		"--active": `var(--${theme.__prefix}-active)`,
		"--font-family": `var(--${theme.__prefix}-font-family-${fontFamily})`,
		"--border-radius": `var(--${theme.__prefix}-border-radius)`,
	}
})

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
		background: rgb(var(--bg-color));
		@media (hover: hover) {
			&:hover {
				background: rgba(var(--bg-color), 0.95);
			}
		}
		&:active,
		&:focus {
			background: rgba(var(--bg-color), 0.75);
		}
	}

	/* Outline */
	&[data-emphasis^="outline"] {
		border: 2px solid rgb(var(--bg-color));
	}

	/* Ghost */
	&[data-emphasis^="ghost"] {
		background: transparent;
		@media (hover: hover) {
			&:hover,
			&:active,
			&:focus {
				background-color: rgba(var(--bg-color), 0.35);
			}
		}
	}

	/* Link */
	&[data-emphasis^="link"] {
		background: transparent;
		color: rgb(var(--text-color));
		text-decoration: underline;
		outline: none;
		transition: color 0.15s ease-out;

		&:active,
		&:focus {
			color: rgb(var(--active));
		}
	}

	/* Disabled */
	&[data-loading^=""],
	&[disabled^=""],
	&[data-emphasis^="disabled"] {
		background: rgb(var(--disabled));
		filter: brightness(80%);
		cursor: not-allowed;
	}
`
