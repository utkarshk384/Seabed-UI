import { recursiveFunction } from "@seabedui/utils"

export const addHSL = (foreground: string): string => {
	return `rgb(${foreground})`
}

const clrs = {
	"primary-foreground": "var(--primary-foreground)",
	"primary-background": "var(--primary-background)",
	"primary-focus": "var(--primary-focus)",
	"primary-pressed": "var(--primary-pressed)",

	"secondary-foreground": "var(--secondary-foreground)",
	"secondary-background": "var(--secondary-background)",
	"secondary-focus": "var(--secondary-focus)",
	"secondary-pressed": "var(--secondary-pressed)",

	"accent-foreground": "var(--accent-foreground)",
	"accent-background": "var(--accent-background)",
	"accent-focus": "var(--accent-focus)",
	"accent-pressed": "var(--accent-pressed)",

	"success-foreground": "var(--success-foreground)",
	"success-background": "var(--success-background)",
	"success-focus": "var(--success-focus)",
	"success-pressed": "var(--success-pressed)",

	"info-foreground": "var(--info-foreground)",
	"info-background": "var(--info-background)",
	"info-focus": "var(--info-focus)",
	"info-pressed": "var(--info-pressed)",

	"warn-foreground": "var(--warn-foreground)",
	"warn-background": "var(--warn-background)",
	"warn-focus": "var(--warn-focus)",
	"warn-pressed": "var(--warn-pressed)",

	"error-foreground": "var(--error-foreground)",
	"error-background": "var(--error-background)",
	"error-focus": "var(--error-focus)",
	"error-pressed": "var(--error-pressed)",

	"neutral-foreground": "var(--neutral-foreground)",
	"neutral-background": "var(--neutral-background)",
}

export const colors = recursiveFunction(clrs, (val) => addHSL(val))
