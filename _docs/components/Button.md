# Button

A rippling button with custom inputs from Tina. This component also accepts a list of callback functions that can potentially be invoked when the button is clicked if configured to.

## Code Example

```tsx
// import a library of your choosing from react icons
import * as AntIcons from 'react-icons/ai';
import { Breadcrumbs } from 'ssw-tinacms-landingkit/dist/';

// define your callback functions
const callbackFunctions = {
  "<your-callback-function>"
  : ()=> {
    //stub
  }
}

// using with tina
  <Button
        callbackFunctions={callbackFunctions}
        icons={AntIcons}
        data={block}
      />

// manual setup
  <Button
    icons={AntIcons}
    callbackFunctions={callbackFunctions}
    data={{
      callbackFunction: "Placeholder",
      color: "Primary",
      icon: "AiOutlineArrowRight",
      iconFirst: false,
      buttonText: "<your-button-text>",
    }}
  />
```

## Props

- `data`: Object containing the breadcrumb content
  - `callbackFunction`: The name of the callback function from the dictionary the button will invoke on click
  - `color`: the variant of the button ("Primary" | "Secondary")
  - `breadcrumbReplacements`: a dictionary containing the title mapping for each url segment
  - `buttonText`: The text that will show in the centre of the button
  - `callbackFunction`: The function (supplied in the callbackFunctions prop) that will be invoked when the button is clicked
  - `iconFirst`: A boolean that controls whether the icon displays before r after the text
- `callbackFunctions`: A dictionary of callback functions that can be invoked when the button is clicked
