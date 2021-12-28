import React from "react";
import { themes } from "@storybook/theming"
import { withConsole } from '@storybook/addon-console';

import viewPorts from "./viewports.json"

import "../src/styles/tailwind.css"

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Set the theme of the UI',
    defaultValue: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
      toolbar: {
      showName: true,
      items: [
        { value: 'light', title: 'Light Theme' },
        { value: 'dark', title: 'Dark Theme' },
      ],
    },
  },

}


// or global addParameters
export const parameters = {
  html: {
    prettier: {
      tabWidth: 4,
      useTabs: true,
      htmlWhitespaceSensitivity: 'strict',
    }
  },

  docs: {
    theme: themes.normal
  },

  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: viewPorts,
}


const themeDecorator = (story, { globals }) => {
  const theme = globals.theme ? globals.theme : ''
  const rootEl = window.parent.document.documentElement
  rootEl.setAttribute('data-theme', theme)
  
  React.useEffect(() => {
    const el = document.querySelector('html')
    const computedStyles = window.getComputedStyle(el);
    el.setAttribute('data-theme', theme);


    Object.keys(computedStyles).forEach((item) => {
      const key = computedStyles[item]
      if(key[0] == "-" && key[1] == "-")
        rootEl.style.setProperty(key, computedStyles.getPropertyValue(key))
        
    })

  }, [theme, rootEl])



  return story();
};

export const decorators = [
  (storyFn, context) => withConsole()(storyFn)(context), 
  themeDecorator
]