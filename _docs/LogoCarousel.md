# Logo Carousel

A responsive carousel component for displaying a collection of logos with smooth animation.
## Code Example
```tsx
import { LogoCarousel } from 'ssw-consulting-component-lib/dist/';

//usage with tina
return <LogoCarousel data={/*<data from tina>*/} />

//standalone usage

<LogoCarousel data={{
            heading: "<heading>",
            maskImages: true, // if you want the images to have a white mask
            logos: [
              {
              logo: "<logo-url>",
              altText: "Microsoft",
            },]
          }} />
```

## Props

`data`: Object containing the carousel content

- `heading`: Title displayed above the carousel
- `logos`: Array of logo objects with `logo` (path) and `altText`
  **example prop**: [{logo: "/images/placeholder1.png", altText: "image1"}, {{logo: "/images/placeholder2.png", altText: "image2"}}]
- `isWhiteImages`: Boolean to enable the white mask for images

### Optional

- `repeat`: The number of times the logos will repeat in the carousel
  - this can be used to fix pop in issues that occur when the logo carousel length is smaller than the viewport
- `className`: a set of custom tailwind classes for styling;
- `textSize`: a prop that allows the headign size to be overriden with a tailwind class
  - **example prop**: `text-<size>`
- `textPadding`: a tailwind class to override the paddign aroung the heading;
  - **example prop**: `p-<size>`
- `mediumTextSize`: a tailwind class to override the size of the heading on medium size screens
  - **example prop**: `md:text-<size>`
- `textColor`: a tailwind class to override the color of the heading
  - **example prop**: `text-<color>`

## Example Schema Configuration

```tsx
const logoCarouselBlock: Template = {
  label: '<label-of-your-choice>',
  name: 'logoCarousel',
  ui: {
    defaultItem: () => {
      return {
        heading: '<default-heading>',
        logos: [
          {
            logo: '<logo-image>',
            altText: '<alt-text>',
          },
        ],
      };
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'string',
      label: '<heading-field-label>',
    },

    {
      name: 'maskImages',
      type: 'boolean',
      label: '<mask-image-toggle-label>',
    },
    {
      name: 'logos',
      label: '<logos-field-label>',
      type: 'object',
      list: true,
      fields: [
        {
          label: 'Logo',
          name: 'logo',
          type: 'image',
        },
        {
          label: '<logo-alt-text-label>',
          description: '<logos-alt-text-description>',
          name: 'altText',
          type: 'string',
        },
      ],
    },
  ],
};
```
