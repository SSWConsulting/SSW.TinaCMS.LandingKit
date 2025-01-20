


<!-- TODO: Create instructions for linking the tailwind config with the dependent's tailwind config -->

<!-- TODO: Add instructions for importing the minified tailwind classes from this project -->

<!-- TODO: Add instructions for importing style.css into your layout.tsx for app routing -->

<!-- TODO: DON'T CROSS THE STREAMS! be careful not to include conflicting classes in your tailwind configration -->
# SSW Consulting Component Library

A React component library built with TypeScript, Next.js, and Shadcn/UI, providing customizable UI components for web applications.

## Installation

- run the following command to install the npm package 
```bash
npm install ssw-tinacms-landingkit"
```
- add an import at the top of `app/layout.tsx` `import "ssw-tinacms-launchkit/dist/style.css";`


## Components

### Styling 
The component scan be manually styled by applying tailwind classes to the components themselves.
For conflicting tailwind classes or styling that cannot be configured by appending styles to the 
outer component each compnent inludes input props. This can include classes defined in your tailwind
config file.

###### BreadCrumb props




#### Breadcrumbs

A navigation component that shows the current page's location within a navigational hierarchy.

##### Example usage for tina
```tsx
// using with TinaCMS
import { Breadcrumbs } from 'ssw-consulting-component-lib';
<Breadcrumbs 
  data={{
    ...<data from tina>
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

#### Props
- `data`: Object containing the breadcrumb content
  - `finalBreadcrumb`: Text for the current page
- `hoverColor`: the color links will glow when hovered by the user
  - **example prop**: hover:text-`<textcolor>`
- `separatorSize`: the size of the breadcrumb separator 
  - **example prop**:size-<size> <br>
- textSize: text-<size> <br>
The size of links and the final breadcrumb text
textColor: text-<color> <br>
the color of the the text, as well as links when inactive.



- `data`: Object containing the breadcrumb content
  - `finalBreadcrumb`: Text for the current page
- `options`: Configuration object (optional)
  - `backgroundColors`: Array of color options for the background
  - `breadcrumbReplacements`: Array of path replacements for display names
  - `firstBreadcrumb`: Text for the first breadcrumb item
  - `contentWidth`: Maximum width of the component in pixels

### Logo Carousel

A responsive carousel component for displaying a collection of logos with smooth animation.

```tsx
import { LogoCarousel } from 'ssw-consulting-component-lib';

// Example usage
<LogoCarousel 
  data={{
    heading: "Our Partners",
    logos: [
      { 
        logo: "/path/to/logo.png",
        altText: "Partner Logo"
      }
    ],
    isWhiteImages: false
  }}
  options={{
    backgroundColors: [], // Custom background color options
    contentWidth: 1200
  }}
/>
```

### Styling 

#### Props

<!-- - `data`: Object containing the carousel content
  - `heading`: Title displayed above the carousel
  - `logos`: Array of logo objects with `logo` (path) and `altText`
  - `isWhiteImages`: Boolean to enable white image mode (inverts colors)
- `options`: Configuration object (optional)
  - `backgroundColors`: Array of color options for the background
  - `contentWidth`: Maximum width of the component in pixels -->

## Features

- 🎨 Customizable theming and styling
- 📱 Responsive design
- 🔧 TypeScript support
- ⚡ Next.js compatible
- 🎯 TinaCMS integration for content management

## Requirements
- React 18 or higher
- TailwindCSS
<!-- remove this from the requirements? -->
- Next.js 13 or higher
- TypeScript 4.5 or higher

## License


## Contributing

### Local Testing


#### Previewing Components


- run the following at the root of the project `pnpm link --global`
- navigate to the root of the test project `cd tina-starter`
- link test project with the component package by running `pnpm link --global ssw-tinacms-landingkit`
- install all dependencies and run the project by running `pnpm i` and then `pnpm dev`
- check you can view the components at `http://localhost:3000/admin/index.html#/~/posts/explore/HelloWorld`


#### Testing Customizations
- rebuild the components with your customizations by running `pnpm run build`
- If you've already linked the repo using the steps outlined in `Previewing components` you should be able to see your changes


MIT License
