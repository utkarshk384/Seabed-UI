import core from "@seabedui/core"

export default {
	theme: {
		borderRadius: {
			none: "0",
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
			xs: "var(--bp-xs)",
			sm: "var(--bp-sm)",
			base: "var(--bp-base)",
			lg: "var(--bp-lg)",
			xl: "var(--bp-xl)",
			"2xl": "var(--bp-2xl)",
		},

		dropShadow: {
			xs: "var(--shadow-xs)",
			sm: "var(--shadow-sm)",
			base: "var(--shadow-base)",
			lg: "var(--shadow-lg)",
			xl: "var(--shadow-xl)",
			"2xl": "var(--shadow-2xl)",
			"3xl": "var(--shadow-3xl)",
		},
	},

	plugins: [core],
}
