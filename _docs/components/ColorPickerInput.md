# ColorPickerInput

## Code Example

```tsx
import {
  // for use with card carousel
  cardColors,
  // for use with button template, or templates using button as a subtemplate
  buttonColors,
} from "../../node_modules/ssw-tinacms-landingkit/dist";

//example usage within a schema
const exampleSchema: Template = {
  label: 'Example',
  name: 'button',
  fields: = [
    {
        type: 'string',
        label: '<color-field-label>',
        name: 'color',
        ui: {
            component: ColorPickerInput(buttonColors),
        },
    },
  ]
}
```

## Props

- `<first argument>`: a dictionary of color classes bound to a key. For ordinary use import `buttonColors` or `cardColors` from the package. For custom use pass in the `ColorPickerOptions` object as described below.

```tsx
export interface ColorPickerOptions {
  // key is emitted as the value when the corresponding color is clicked
  [key: string]: {
    /* classes can be used within your desired
       component to apply the color corresponding to the key
    */
    classes: string;
    /* editorClasses is a list of classes bound to the button corresponding with the key
       If this value is undefined, "classes" will be used instead
    */
    editorClasses?: string;
  };
}

// EXAMPLE

// pass this as a value for the ColorPickerInput in your schema configuration
export const colors = {
  red: {
    classes: 'bg-red-500',
    editorClasses: 'bg-linear-to-br from-red-500 to-black',
  },
  blue: {
    classes: 'bg-blue-500',
    editorClasses: 'bg-linear-to-br from-blue-500 to-black',
  },
};

const component = ({
  children,
  //pass this value in from tina
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => {
  const color = colors[color] || colors['red'];

  return <div className={color.classes}>{children}</div>;
};
```
