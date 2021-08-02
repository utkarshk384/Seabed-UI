import "@seabedUI/styles/index.scss"
import "@seabedUI/styles/normalize.scss"

import { useEffect } from "react"

import {ExtendTheme, Colors} from "@seabedUI/core"
import {SeabedProvider} from "@seabedUI/theme"
import {useDarkMode as useDark} from "@seabedUI/hooks"

import {useDarkMode} from "storybook-dark-mode"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


const LightTheme = ExtendTheme({colorMode: "light", colors: {light: {primary: Colors.gray[100], secondary: Colors.gray[700], accent: Colors.teal[400], }}})
const DarkTheme = ExtendTheme({colorMode: "dark", colors: {dark: {primary: Colors.gray[700], secondary: Colors.gray[100], accent: Colors.teal[400], }}})


const ThemeWrapper:React.FC = (props) => {
  const [_, setDark] = useDark()
  const isDark = useDarkMode()

  useEffect(() => {

    if(isDark) setDark(true)
    else setDark(false)
  }, [isDark])

  return (<SeabedProvider theme={isDark ? DarkTheme : LightTheme}>{props.children}</SeabedProvider>)
}

export const decorators = [(Story:React.FC) => (<ThemeWrapper><Story /></ThemeWrapper>),]

