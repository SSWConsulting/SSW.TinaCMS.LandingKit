#### Image Text Block

A component that displays a series of list items, buttons, and a heading adjacent to an image or youtube embed.

**Note**: It's not recommended to use this component without TinaCMS because it uses the rich text field to display the description.

```tsx
// swap this with your icon library of choice
import * as AntIcons from 'react-icons/ai'


// for coniguring the outer blocks component see tina documentation https://tina.io/docs/editing/blocks#rendering-our-blocks

const callbackFunctions = {
  "<your-callback-function>"
  : ()=> {
    //stub
  }
}
// usage with tina
<ImageTextBlock
  icons={AntIcons}
  callbackFunctions={callbackFunctions}
  data={block}></ImageTextBlock>
```

##### Props

- `data`:
  - `heading`
  - `description`: the descrtiption that displays next to the image (uses the tina rich text type)
  - `topLabel`:
    - `icon`: the name of the icon from the `icons` field the label uses
    - `labelText`: the text used in the label before the heading
  - `isH1`: a boolean indicating whether the heading will use h1 or h2 tags (uses h2 by default)
  - `chips`: an object containing the text for the pills below the button image
    - `filledChipText`: the text in the left-hand filled chip
    - `clearChipText`: the text in the right-hand clear chip
  - `featureColumns`: an object containing information for the list below the description
    - `twoColumns`: a boolean that determines whether the list below the paragraph will use one or two columns
    - `features`: an array used to populate the list at the bottom of the button
      - `heading`: the heading of the list item
      - `description`: the description displayed under the heading for the feature list item
      - `icon`: the name of the icon from the `icons` field the feature uses
    - `buttons`: an array of buttons displaying below the text (The fields below are the same as the fields for the button schema)
      - `buttonText`: the text that will show inside of the button
      - `buttonLink`: an optional hyperlink to wrap the button with
      - `callbackFunction`: a string matching the key of the callback function that fires on click (passed in via `callbackFunctions`)
      - `icon`: the name of the icon from the `icons` field the button uses
      - `iconFirst`: a boolean indicating whether the embedded icon (if present) will display before or after the button text
      - `color`: a string indicating the style of the button ("Primary" | "Secondary")
  - `mediaConfiguration`: an object containing formatting options for the image that displays next to the text
    - `mediaType`: the type of embed displaying adjacent to the text ("image" | "youtube")
    - `placement`: where the image (or youtube embed) sits relative to the text ("Left" | "Right")
    - `verticalPlacement`: where the image (or youtube embed) sits vertically in the window ("Centered" | "Top" | "Bottom")
    - `mobilePlacement`: where the image sits relative to the text in mobile view ("Above" | "Below")
    - `imageSource`: he url for the image in the image & text block (this will only be used when `mediaType` is set to `image`)
    - `youtubeUrl`: the full ul for the youtube video being embedded (this will only be used when `mediaType` is set to `youtube`)
- `icons`: a dictionary containing the icons used in the component with React components as values
- `callbackFunctions`: a dictionary of callback functions that can be invoked when the button is clicked

###### Example Schema Configuration

```tsx
// replace with your preferred icon library
import * as AntIcons from 'react-icons/ai';
import { Template, TinaField } from 'tinacms';
import {
  buttonColors,
  ColorPickerInput,
  IconPickerInput,
  // replace with the path to your node_modules
} from '../../node_modules/ssw-tinacms-landingkit/dist';

// same as the mediaFieldType definition in the card carousel schema https://github.com/SSWConsulting/SSW.TinaCMS.LandingKit/blob/master/_docs/CardCarousel.md
const mediaTypeField = {
  type: 'string',
  label: '<media-type-field-label>',
  name: 'mediaType',
  description: '<media-type-field-label>',
  options: ['image', 'youtube'],
};

const imageComponentLayoutSchema = [
  {
    type: 'object',
    label: '<media-configuration-field-label>',
    name: 'mediaConfiguration',
    description: '<media-configuration-field-description>',
    ui: {
      // feel free to replace with your own defaults
      defaultItem: {
        placement: 'Right',
        mediaType: 'image',
      },
    },
    fields: [
      mediaTypeField,
      {
        type: 'string',
        label: '<placement-field-label>',
        name: 'placement',
        description: '<placement-field-description>',
        default: 'Right',
        ui: {
          component: 'select',
          options: ['Left', 'Right'],
        },
      },
      {
        type: 'string',
        label: '<vertical-placement-field-label>',
        name: 'verticalPlacement',
        description: '<vertical-placement-field-description>',
        ui: {
          component: 'select',
          options: ['Centered', 'Top', 'Bottom'],
        },
      },
      {
        type: 'string',
        label: '<mobile-placement-field-label>',
        name: 'mobilePlacement',
        description: '<mobile-placement-field-description>',
        default: 'Above Text',
        ui: {
          component: 'select',
          options: [
            {
              label: '<above-text-option-label>',
              value: 'Above',
            },
            {
              label: '<below-text-option-label>',
              value: 'Below',
            },
          ],
        },
      },
      {
        type: 'image',
        label: '<image-source-field-label>',
        name: 'imageSource',
        description: '<image-source-field-description>',
      },
      {
        type: 'string',
        label: '<youtube-url-field-label>',
        name: 'youtubeUrl',
        description: '<youtube-url-field-description>',
      },
      {
        type: 'string',
        label: '<alt-text-field-label>',
        name: 'altText',
        description: '<alt-text-field-description>',
      },
    ],
  },
];

// same as the schema definition for the Button component https://github.com/SSWConsulting/SSW.TinaCMS.LandingKit/blob/master/_docs/Button.md
const buttonSchema = [
  {
    type: 'string',
    label: '<label-for-button-tex-field>',
    name: 'buttonText',
  },
  {
    type: 'string',
    label: '<label-for-button-link-field>',
    name: 'buttonLink',
  },
  {
    type: 'string',
    label: '<label-for-button-icon-field>',
    name: 'icon',
    ui: {
      component: IconPickerInput(AntIcons),
    },
  },
  {
    type: 'string',
    label: '<label-for-callback-function-dropdown>',
    name: 'callbackFunction',
    options: ['Placeholder'],
  },
  {
    type: 'boolean',
    label: '<label-for-icon-first-toggle>',
    name: 'iconFirst',
    description: '<description-for-icon-first-toggle>',
  },
  {
    type: 'string',
    label: '<label-for-color-field>',
    name: 'color',
    ui: {
      component: ColorPickerInput(buttonColors),
    },
  },
];

export const imageTextBlockSchema = {
  name: 'imageTextBlock',
  label: '<label-for-image-text-block-component>',
  ui: {
    previewSrc: '<image-url>',
    // feel free to replace with your own defaults
    defaultItem: {
      backgroundColor: 'Transparent',
      topLabel: {
        labelText: '<default-top-label-text>',
      },
      heading: '<default-heading-text>',
      isH1: false,
      description: '<default-description-text>',
      chips: {
        filledChipText: '<default-filled-chip-text>',
        clearChipText: '<default-clear-chip-text>',
      },
      featureColumns: {
        twoColumns: true,
        features: [
          {
            heading: '<default-feature-heading>',
            description: '<default-feature-description>',
          },
          {
            heading: '<default-feature-heading>',
            description: '<default-feature-description>',
          },
        ],
      },
      buttons: [
        {
          colour: 0,
          buttonText: '<default-button-text>',
        },
        {
          colour: 1,
          buttonText: '<default-button-text>',
        },
      ],
    },
  },
  fields: [
    {
      type: 'object',
      label: '<top-label-field-label>',
      name: 'topLabel',
      description: '<top-label-field-description>',
      fields: iconLabelSchema as TinaField[],
    },
    {
      type: 'string',
      label: '<heading-field-label>',
      name: 'heading',
      description: '<heading-field-description>',
    },
    {
      type: 'boolean',
      label: '<h1-toggle-field-label>',
      name: 'isH1',
      description: '<h1-toggle-field-description>',
    },
    {
      type: 'rich-text',
      label: '<description-field-label>',
      name: 'description',
      description: '<description-field-description>',
      toolbarOverride: ['bold', 'italic', 'link'],
    },
    {
      name: 'chips',
      label: '<chips-field-label>',
      type: 'object',
      description: '<chips-field-description>',
      fields: pillGroupSchema as TinaField[],
    },
    {
      name: 'featureColumns',
      label: '<feature-columns-list-field-label>',
      description: '<feature-columns-list-field-description>',
      type: 'object',
      fields: [
        {
          type: 'boolean',
          label: '<two-columns-toggle-label>',
          name: 'twoColumns',
          description: '<two-columns-toggle-description>',
        },
        {
          list: true,
          type: 'object',
          label: '<features-list-label>',
          name: 'features',
          description: '<features-list-description>',
          fields: listItemSchema,
          ui: {
            defaultItem: {
              heading: '<default-feature-heading>',
              description: '<default-feature-description>',
            },
          },
        },
      ],
    },
    {
      name: 'buttons',
      label: '<buttons-list-field-label>',
      type: 'object',
      list: true,
      description: '<buttons-list-field-fdescription>',
      ui: {
        defaultItem: {
          buttonText: '<default-button-text>',
        },
        max: 2,
        itemProps(item) {
          return { label: `${item.buttonText}` };
        },
      },
      fields: buttonSchema as TinaField[],
    },
    ...imageComponentLayoutSchema,
  ],
};
```
