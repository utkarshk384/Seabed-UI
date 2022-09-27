import core from "@seabedui/core"
import { defaultTheme } from "@seabedui/core"
import { colors } from "./colors"

export default {
	theme: {
		extend: {
			colors,
		},

		borderRadius: {
			none: "0",
			default: "var(--radius-default)",
			xs: "var(--radius-xs)",
			sm: "var(--radius-sm)",
			base: "var(--radius-base)",
			lg: "var(--radius-lg)",
			xl: "var(--radius-xl)",
			"2xl": "var(--radius-2xl)",
			"3xl": "var(--radius-3xl)",
			full: "9999px",
		},

		screens: {
			xs: defaultTheme.breakpoints.xs,
			sm: defaultTheme.breakpoints.sm,
			base: defaultTheme.breakpoints.base,
			lg: defaultTheme.breakpoints.lg,
			xl: defaultTheme.breakpoints.xl,
			"2xl": defaultTheme.breakpoints["2xl"],
		},

		boxShadow: {
			xs: "var(--shadow-xs)",
			sm: "var(--shadow-sm)",
			base: "var(--shadow-base)",
			lg: "var(--shadow-lg)",
			xl: "var(--shadow-xl)",
			"2xl": "var(--shadow-2xl)",
			"3xl": "var(--shadow-3xl)",
			kbd: "0px 0px 1px 2px rgba(0, 0, 0, 0.15), inset 0px -3px 0px #E2E8F0",
			"kbd-pressed": "0px 0px 3px 4px #00000026",
		},
	},
	corePlugins: {
		fontSize: false,
	},

	plugins: [core],
}
