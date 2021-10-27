import { forwardRef, useMemo } from "react"
import { styled } from "@linaria/react"
import { useTheme } from "@seabedui/theme"
import { DefaultProps } from "@seabedui/theme-utils"

import { useStyles, baseStyles } from "./componentStyles"

import type { DefaultThemeType } from "@seabedui/types"
import type { TextPropsType, TextPropsInterface } from "./types"

export const Text: React.FC<TextPropsType> = forwardRef<HTMLHeadingElement, TextPropsType>(
	(props, ref) => {
		const tags = useMemo(() => ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "p"], [])

		const {
			textDecoration = "none",
			textTransform = "none",
			textAlign = "left",
			as = "p",
			display = tags.includes(as) ? "block" : "inline",
			fontFamily = "body",
			fontWeight = "body",
			lineHeight = "body",
			letterSpacing = "body",
			color = "text.primary",
			sx,
			cx,
			...htmlAttributes
		} = DefaultProps<TextPropsType>(props)

		const theme = useTheme()

		const styles = useStyles(
			{
				fontFamily,
				fontSize: props.fontSize,
				fontWeight,
				lineHeight,
				letterSpacing,
				color,
				as,
			},
			theme as DefaultThemeType
		)

		return (
			<StyledText
				as={as}
				ref={ref}
				className={cx}
				display={display}
				textAlign={textAlign}
				style={{ ...styles, ...sx }}
				textTransform={textTransform}
				textDecoration={textDecoration}
				{...htmlAttributes}
			>
				{props.children}
			</StyledText>
		)
	}
)

const StyledText = styled.p<TextPropsInterface>`
	/* Base */
	${baseStyles}

	/* Extra Styling */
	display: ${({ display }) => display};
	text-align: ${({ textAlign }) => textAlign};
	text-decoration: ${({ textDecoration }) => textDecoration};
	text-transform: ${({ textTransform }) => textTransform};
	font-style: ${({ italic }) => (italic ? "italic" : "normal")};

	/* Line Clamp */
	-webkit-line-clamp: ${({ lineClamp }) => (lineClamp ? lineClamp : "initial")};
	-webkit-box-orient: ${({ lineClamp }) => (lineClamp ? "vertical" : "initial")};
	overflow: ${({ lineClamp }) => (lineClamp ? "hidden" : "initial")};

	display: ${({ lineClamp, display }) => (lineClamp ? "-webkit-box" : display)};
`
