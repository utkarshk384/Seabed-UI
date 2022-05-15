import {
	Theme,
	radiusInterface,
	shadowInterface,
	breakpointInterface,
	Colors,
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

export const defaultLightColors: Colors = {
	primary: {
		foreground: "#B7C3E1",
		background: "#273D68",
		focus: "#9AABD5",
		pressed: "#1E2E50",
	},
	secondary: {
		foreground: "#B7C3E1",
		background: "#273D68",
		focus: "#9AABD5",
		pressed: "#1E2E50",
	},
	accent: {
		foreground: "#B7C3E1",
		background: "#273D68",
		focus: "#9AABD5",
		pressed: "#1E2E50",
	},

	success: {
		foreground: "#B7C3E1",
		background: "#273D68",
		focus: "#9AABD5",
		pressed: "#1E2E50",
	},
	error: {
		foreground: "#B7C3E1",
		background: "#273D68",
		focus: "#9AABD5",
		pressed: "#1E2E50",
	},
	info: {
		foreground: "#B7C3E1",
		background: "#273D68",
		focus: "#9AABD5",
		pressed: "#1E2E50",
	},
	warning: {
		foreground: "#B7C3E1",
		background: "#273D68",
		focus: "#9AABD5",
		pressed: "#1E2E50",
	},
	disabled: {
		foreground: "#B7C3E1",
		background: "#273D68",
	},
}

export const themes: Theme = {
	radius: "base",
	radiusConfig: defaultRadius,
	shadows: defaultShadows,
	breakpoints: defaultBreakpoints,
	colors: {
		neutral: defaultNeutralColors,
		light: defaultLightColors,
	},
}
