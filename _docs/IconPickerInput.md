#### IconPickerInput

```tsx
import * as AntIcons from 'react-icons/ai';
const iconSchema: Template = {
  label: 'Icon',
  name: 'icon',
  fields: [
    {
      type: 'string',
      label: 'Icon',
      name: 'icon',
      ui: {
        component: IconPickerInput(AntIcons),
      },
    },
  ],
};
```

##### Props

- `<first argument>`: a dictionary of react components to be mapped as icons. The ouput of this field will contain the name of the component, which will be used in the relevant Tina component to when displaying the icon.
