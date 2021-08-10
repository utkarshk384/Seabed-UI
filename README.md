# Seabed UI ( Extremely early stage of build )

A React Component library made with build-time css-in-js using [@linaria](https://github.com/callstack/linaria).

<br/>
<br/>

## 🐳 &nbsp; Features  
---

1. No runtime css using javascript.
2. Uses css variables for dynamic styling.
3. Acessible components based on WAI-ARIA standards.

<br/>
<br/>

## 🐟 &nbsp; Installation 
---

```sh
# javascript
yarn add @seabedui/core @seabedui/theme

# typescript
yarn add @seabedui/core @seabedui/theme @seabedui/types
```
or 
```sh
# javascript
npm install --save @seabedui/core @seabedui/theme

# typescript
npm install --save @seabedui/core @seabedui/theme @seabedui/types
```

## 🐬 &nbsp; Usage 
---

Inorder to start using the components, the following steps should be taken:

1. Wrap the areas where you want to use the components with `SeabedProvider` under the `@seabedui/theme` package.

```typescript
    import { SeabedProvider, ExtendTheme } from "@seabedui/theme"

    import type { ThemeType } from "@seabedui/types" 

    const WrapperComponent = ({ children }) => {

        const theme:ThemeType = ExtendTheme({}) // `ThemeType` is used for typescript users

        return (
        <SeabedProvider theme={theme}> 
            {children} 
        </SeabedProvider>
        )
    }
```

<br/>

2. Now your ready to use the component library by importing components from `@seabedui/core` as a one place import or from `@seabedui/{component-name}.

<br/>

### Example
```typescript

    import { Button } from "@seabedui/core" // One place import
    import { Button } from "@seabedui/button" //Component based import

    const Example = (props) => {

        return (
        <Button variant="solid"> 
            Seabed UI Button 
        </Button>
        )
    }
```
<br/>
<br/>
<br/>

## 🐋 &nbsp; Inspiration
---
Since I am a performance driven person, I didn't want to comprimse on loading speeds of websites therefore, leading me to built this component library. 

The project was largely inspired by the folks at [@chakra-ui](https://github.com/chakra-ui/chakra-ui). Props to them for creating such an amazing library. 
