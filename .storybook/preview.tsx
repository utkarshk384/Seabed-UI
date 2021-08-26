import { themes } from '@storybook/theming'
import { Colors } from "../packages/theme-utils/src/defaults"
import { ExtendTheme, SeabedProvider } from "../packages/theme"
import '@storybook/addon-console'


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


const Theme = ExtendTheme({
  colorScheme: "both",

  borderRadius: 15,
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
      accent: Colors.green[500],
      muted: Colors.gray[400]
    },
    light: {
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
    }
  }
})


const ThemeWrapper:React.FC = (props) => {


  return (
   
  <SeabedProvider theme={Theme}>
      {props.children}
  </SeabedProvider>
  )
}

export const decorators = [(Story:React.FC) => (<ThemeWrapper><Story /></ThemeWrapper>),]

