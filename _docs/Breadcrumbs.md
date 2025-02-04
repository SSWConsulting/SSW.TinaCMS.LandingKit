#### Breadcrumbs

A navigation component that shows the current page's location within the navigational hierarchy.

**Note**: You will encounter type errors if "finalNode" is not configured as a required field

```tsx
// using with TinaCMS
import { Breadcrumbs } from "ssw-tinacms-landingkit/dist/";
<Breadcrumbs
  data={{
    // ...<data from tina>
    firstBreadcrumb: "<first breadcrumb title>"
    breadcrumbReplacements: [
      { from: "<old-segment>", to: "<new-segmentmapping>" }
    ],
  }}
/>

// using with out TinaCMS
<Breadcrumbs
  data={{
    finalBreadcrumb: "<custom final breadcrumb title>"
    firstBreadcrumb: "<first breadcrumb title>",
     breadcrumbReplacements: [
      { from: "<old-segment>", to: "<new-segmentmapping>" }
    ],
  }}
/>

```

##### Props

- `data`: Object containing the breadcrumb content
  - `finalBreadcrumb`: Text for the current page (supports contextual editing when returned from TinaCMS)
  - `firstBreadcrumb`: Text for the first breadcrumb item
  - `breadcrumbReplacements`: a dictionary containing the title mapping for each url segment

###### Optional

- `hoverColor`: the color links will glow when hovered by the user
  - **example prop**: `hover:text-<color>`
- `separatorSize`: the size of the breadcrumb separator
  - **example prop**: `size-<size>`
- `textSize`: The size of links and the final breadcrumb text
  - **example prop**: `text-<size>`
- `textColor`:the color of the the text, as well as links when inactive.
  - **example prop**: `text-<color>`
- `textUnderlineOffset`: The spacing between the underline and text for breadcrumb links
  - **example prop**: `underline-offset-<number>`

###### Example Schema Configuration

```tsx
import { Template } from 'tinacms';

export const breadcrumbBlock: Template = {
  label: 'Breadcrumbs',
  name: 'breadcrumbs',
  ui: {
    defaultItem: () => {
      return {
        finalBreadcrumb: 'Final Breadcrumb',
      };
    },
  },
  fields: [
    {
      required: true,
      name: 'finalBreadcrumb',
      type: 'string',
      label: 'Final Breadcrumb',
    },
  ],
};
```
