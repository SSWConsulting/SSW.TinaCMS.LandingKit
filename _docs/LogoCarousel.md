### Logo Carousel

A responsive carousel component for displaying a collection of logos with smooth animation.

```tsx
import { LogoCarousel } from 'ssw-consulting-component-lib';

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
#### Props

`data`: Object containing the carousel content
  - `heading`: Title displayed above the carousel
  - `logos`: Array of logo objects with `logo` (path) and `altText`
  **example prop**: [{logo: "/images/placeholder1.png", altText: "image1"}, {{logo: "/images/placeholder2.png", altText: "image2"}}]
  - `isWhiteImages`: Boolean to enable the white mask for images
 
###### Optional
- `className`: a set of custom tailwind classes for styling;
- `textSize`: a prop that allows the headign size to be overriden with a tailwind class
  - **example prop**: `text-<size>`
- `textPadding`: a tailwind class to override the paddign aroung the heading;
  - **example prop**: `p-<size>`
- `mediumTextSize`: a tailwind class to override the size of the heading on medium size screens
  - **example prop**: `md:text-<size>`
- `textColor`: a tailwind class to override the color of the heading
  - **example prop**: `text-<color>`