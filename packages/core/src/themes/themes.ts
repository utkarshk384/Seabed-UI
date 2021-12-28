import { CustomTheme } from "@seabedui/types"

export const themes: CustomTheme = {
	borderRadius: "md",
	colors: {
		light: {
			brand: {
				primary: "#80CED7",

				secondary: "#263D42",
				accent: "#F56F51",
			},
			text: "#4a4a4a",
			bg: "#ADADAD",
			states: {
				disabled: "#C2C2C2",
				dragged: "#F67F65",
				focus: "#F78F78",
				hover: "#F89F8B",
				pressed: "#F9AF9F",
			},
		},

		dark: {
			brand: {
				primary: "#155E7E",
				secondary: "#13314B",
				accent: "#FFCF4B",
			},
			text: "#ffffff",
			bg: "#3f3f3f",
		},
		success: "#1FAD9F",
		info: "#2094F3",
		warning: "#F0D02D",
		error: "#FF661A",
	},
	useSystemColors: false,
}
