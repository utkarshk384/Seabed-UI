## @seabedui/hooks
---
This is the package of all the custom hooks that is available to be used.

## 🐟 &nbsp; Installalation
```sh
yarn add @seabedui/hooks
```
or
```sh
npm install --save @seabedui/hooks
```


<br/>

## 🐋 &nbsp; Usage

```typescript
import { useDarkmode } from '@seabedui/hooks'
import { Button } from '@seabedui/button'

const Example = () => {
    cosnt [isDark, setDark] = useDarkmode() // Hook used to get current theme setting and set currrent theme


    return (
        <Button onClick={() => setDark(!isDark)}>
            Click to change theme
        </Button>
    )
}
```
