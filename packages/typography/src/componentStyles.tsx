import { ThrowError } from "@seabedui/utils"
import { Memoizer, ResolveColor, ParseFont } from "@seabedui/theme-utils"

import type { DefaultThemeType } from "@seabedui/types"
import type { SharedStylesProps, TextPropsType } from "./types"

export const baseStyles = {
	"font-family": "var(--font-family);",
	"font-weight": "var(--font-weight);",
	"font-size": "var(--font-size);",
	"line-height": "var(--line-height);",
	"letter-spacing": "var(--letter-spacing);",
	color: "rgb(var(--color));",
}

export const useStyles = Memoizer<SharedStylesProps & { as?: TextPropsType["as"] }>(
	(props, Theme) => {
		const theme = Theme as DefaultThemeType

		/* Get Font Size */

		let fontSize: string

		if (props.fontSize) fontSize = theme.typography.fontSize[props.fontSize]
		else fontSize = FontSizeTag(props.as, theme)

		if (!fontSize) throw new Error(`Couldn't parse font size. Value: ${fontSize}`)

		/* Get Font Family */
		const [fontFamily, fontErr] = ParseFont(props.fontFamily, theme.typography.fontFamily)
		if (fontErr) throw ThrowError(fontErr, "Font family is undefined")

		/* Get Font Weight */
		const [fontWeight, weightErr] = ParseFont(props.fontWeight, theme.typography.fontWeight)
		if (weightErr) throw ThrowError(weightErr, "Font family is undefined")

		/* Get Line Height */
		const [lineHeight, lHightErr] = ParseFont(props.fontWeight, theme.typography.fontWeight)
		if (lHightErr) throw ThrowError(lHightErr, "Font family is undefined")

		/* Get Letter Spacing */
		const [ltrSpacing, ltrErr] = ParseFont(props.fontWeight, theme.typography.fontWeight)
		if (ltrErr) throw ThrowError(ltrErr, "Font family is undefined")

		/* Get Font Color */
		const [textColor, textErr] = ResolveColor(props.color, theme)
		if (textErr) throw ThrowError(textErr, "Button text color is undefined")

		return {
			"--letter-spacing": `var(--${theme.__prefix}-letter-spacing-${ltrSpacing})`,
			"--line-height": `var(--${theme.__prefix}-line-height-${lineHeight})`,
			"--font-family": `var(--${theme.__prefix}-font-family-${fontFamily})`,
			"--font-weight": `var(--${theme.__prefix}-font-weight-${fontWeight})`,
			"--font-size": fontSize,
			"--hover": `var(--${theme.__prefix}-hover)`,
			"--active": `var(--${theme.__prefix}-active)`,
			"--visited": `var(--${theme.__prefix}-visited)`,
			"--color": textColor as string,
		}
	}
)

const FontSizeTag = (tag: TextPropsType["as"], theme: DefaultThemeType): string => {
	const fontSizes = theme.typography.fontSize

	switch (tag) {
		case "h1":
			return fontSizes["5xl"]

		case "h2":
			return fontSizes["4xl"]

		case "h3":
			return fontSizes["3xl"]

		case "h4":
			return fontSizes["2xl"]

		case "h5":
			return fontSizes["xl"]

		case "h6":
			return fontSizes["lg"]

		case "p":
		case "span":
			return fontSizes["md"]

		case "small":
		case "sub":
		case "sup":
			return fontSizes["sm"]

		default:
			return "inherit"
	}
}
