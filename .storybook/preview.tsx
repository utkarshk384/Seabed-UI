

import {useDarkMode} from "storybook-dark-mode"

import { themes } from '@storybook/theming'
import { Colors } from "../packages/core"
import { ExtendTheme, SeabedProvider} from "../packages/theme"


export const parameters = {
  darkMode: {
    dark: {
      ...themes.dark,          
      appContentBg: `rgb${Colors.gray[800]}`, 
      barBg: `rgb${Colors.gray[800]}`
    },
    light: {
      ...themes.normal,
      appContentBg: `rgb${Colors.gray[800]}`, 
      barBg: `rgb${Colors.gray[800]}`
    }
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


const LightTheme = ExtendTheme({
  colorScheme: "light", 
  colors: {
    light: {
      background: {
        primary: Colors.white,
        secondary: Colors.gray[200]
      },
      text: {
        primary: Colors.gray[900],
        secondary: Colors.gray[800]
      },
      accent: Colors.blue[500],
      muted: Colors.gray[400]
    },
  }
})
const DarkTheme = ExtendTheme({
  colorScheme: "dark", 
  colors: {
    dark: {
      background: {
        primary: Colors.gray[800],
        secondary: Colors.gray[900]
      },
      text: {
        primary: Colors.white,
        secondary: Colors.gray[200]
      },
      accent: Colors.blue[500],
      muted: Colors.gray[400]
    },
  }
})


const ThemeWrapper:React.FC = (props) => {
  const isDark = useDarkMode()


  return (<SeabedProvider theme={DarkTheme}>{props.children}</SeabedProvider>)
}

export const decorators = [(Story:React.FC) => (<ThemeWrapper><Story /></ThemeWrapper>),]

