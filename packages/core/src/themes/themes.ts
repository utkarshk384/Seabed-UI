import type {
	Theme,
	radiusInterface,
	shadowInterface,
	breakpointInterface,
	Colors,
	colorsInterface,
	DeepRequired,
	FontType,
} from "@seabedui/types"

export const defaultRadius: radiusInterface = {
	xs: "0.125rem",
	sm: "0.25rem",
	base: "0.375rem",
	lg: "0.5rem",
	xl: "0.75rem",
	"2xl": "1rem",
	"3xl": "1.5rem",
}

export const defaultFont: FontType = {
	display: {
		desktop: {
			large: "72",
			base: "3.75rem",
		},
		mobile: {
			base: "3.75rem",
			large: "3rem",
		},
	},
	title: {
		desktop: {
			xs: "0.875rem",
			sm: "1rem",
			base: "1.25rem",
			lg: "1.75rem",
			xl: "2.25rem",
			"2xl": "3rem",
		},
		mobile: {
			xs: "0.75rem",
			sm: "1rem",
			base: "1.25rem",
			lg: "1.5rem",
			xl: "1.875rem",
			"2xl": "2.25rem",
		},
	},
	paragraph: {
		xs: "0.75rem",
		sm: "0.875rem",
		base: "1rem",
		lg: "1.125rem",
		xl: "1.25rem",
		"2xl": "1.5rem",
		"3xl": "1.875rem",
	},
}

export const defaultBreakpoints: breakpointInterface = {
	"2xl": "1560px",
	xl: "1280px",
	lg: "1024px",
	base: "768px",
	sm: "640px",
	xs: "420px",
}

export const defaultNeutralColors = {
	black: "#303036",
	white: "#FAFAFA",
	gray: "#A9A9B2",
}

export const defaultShadows: shadowInterface = {
	xs: "0px 0px 0px 1px rgba(169, 169, 178, 0.5)",
	sm: "0px 0px 2px rgba(169, 169, 178, 0.5)",
	base: "0px 0px 2px 2px rgba(169, 169, 178, 0.5)",
	lg: "0px 0px 3px 2px rgba(80, 80, 80, 0.5)",
	xl: "0px 0px 4px 3px rgba(169, 169, 178, 0.5)",
	"2xl": "0px 0px 5px 4px rgba(169, 169, 178, 0.5)",
	"3xl": "0px 0px 6px 5px rgba(169, 169, 178, 0.5)",
	outline: "0px 0px 0px 2px rgba(7, 89, 133, 0.5)",
	inner: "inset 0px 0px 2px 2px rgba(169, 169, 178, 0.5)",
	round: "0px 0px 50px 5px rgba(80, 80, 80, 0.5)",
}

export const defaultDarkColors: Colors = {
	primary: {
		foreground: "#164250",
		background: "#90CEE0",
		focus: "#AFDBE9",
		pressed: "#1A5060",
	},
	secondary: {
		foreground: "#1D4012",
		background: "#CAEDBF",
		focus: "#D7F2CF",
		pressed: "#245016",
	},
	accent: {
		foreground: "#341551",
		background: "#CEAEEA",
		focus: "#E1CEF2",
		pressed: "#491D72",
	},

	success: {
		foreground: "#0A4004",
		background: "#7FDC90",
		focus: "#8FCC9A",
		pressed: "#50965D",
	},
	error: {
		foreground: "#3B0D04",
		background: "#E16F59",
		focus: "#EABDB4",
		pressed: "#C45741",
	},
	info: {
		foreground: "#093048",
		background: "#3AA3E4",
		focus: "#90CBF0",
		pressed: "#457FA3",
	},
	warn: {
		foreground: "#534013",
		background: "#DEA82A",
		focus: "#F3DCA5",
		pressed: "#A68026",
	},
	disabled: {
		foreground: "#A9A9B2",
		background: "#F1F5F9",
	},
}

export const defaultLightColors: Colors = {
	primary: {
		foreground: "#B7C3E1",
		background: "#273D68",
		focus: "#9AABD5",
		pressed: "#1E2E50",
	},
	secondary: {
		foreground: "#523E14",
		background: "#FBD073",
		focus: "#FDE4B0",
		pressed: "#EDA507",
	},
	accent: {
		foreground: "#033A30",
		background: "#56D9BF",
		focus: "#BCE0D9",
		pressed: "#078870",
	},

	success: {
		foreground: "#0A4004",
		background: "#7FDC90",
		focus: "#8FCC9A",
		pressed: "#50965D",
	},
	error: {
		foreground: "#3B0D04",
		background: "#E16F59",
		focus: "#EABDB4",
		pressed: "#C45741",
	},
	info: {
		foreground: "#093048",
		background: "#3AA3E4",
		focus: "#90CBF0",
		pressed: "#457FA3",
	},
	warn: {
		foreground: "#534013",
		background: "#DEA82A",
		focus: "#F3DCA5",
		pressed: "#A68026",
	},
	disabled: {
		foreground: "#A9A9B2",
		background: "#F1F5F9",
	},
}

export const defaultColors: DeepRequired<colorsInterface> = {
	light: defaultLightColors,
	neutral: defaultNeutralColors,
	dark: defaultLightColors,
}

export const themes: Theme = {
	radius: "base",
	radiusConfig: defaultRadius,
	shadows: defaultShadows,
	fontSize: defaultFont,
	breakpoints: defaultBreakpoints,
	colors: defaultColors,
}
