# Accordion

A component that displays an accordion with heading, description, buttons, media which can be image or youtube embed.

**Note**: It's not recommended to use this component without TinaCMS because it uses the rich text field to display the description.

## Code Example

```tsx
<AccordionBlock
  callbackFunctions={callbackFunctions}
  data={block}
></AccordionBlock>
```

## Props

- `data`:
  - `heading`
  - `isH1`: a boolean indicating whether the heading will use h1 or h2 tags (uses h2 by default)
  - `body`: flavour text under the accordion heading
  - `accordionItems`: collapsable part of the accordion component
  - `TabletTextAlignmentFieldSchema`: the configuration to specify alignment on mobile (left or center)
  - `isMultipleOpen`: allow multiple accordion items to be open at once
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
- `callbackFunctions`: a dictionary of callback functions that can be invoked when the button is clicked

## Example Schema Configuration

```tsx
// replace with your preferred icon library
import * as AntIcons from "react-icons/ai";
import { Template, TinaField } from "tinacms";
import {
  buttonColors,
  ColorPickerInput,
  IconPickerInput,
  // replace with the path to your node_modules
} from "../../node_modules/ssw-tinacms-landingkit/dist";

const MediaTypeFieldSchema = {
  type: "string",
  label: "<media-type-field-label>",
  name: "mediaType",
  description: "<media-type-field-label>",
  options: ["image", "youtube"],
};

const TabletTextAlignmentFieldSchema = {
  type: "string",
  label: "Text Alignment (Mobile)",
  name: "tabletTextAlignment",
  options: ["Left", "Center"],
};

const ImageComponentLayoutSchema = [
  {
    type: "object",
    label: "Media",
    name: "mediaConfiguration",
    description: "Media configuration including layout and image/video upload.",
    ui: {
      defaultItem: {
        placement: "Right",
        mediaType: "image",
      },
    },
    fields: [
      MediaTypeFieldSchema,
      {
        type: "string",
        label: "Media Placement",
        name: "placement",
        description:
          "Choose the desktop (columned) layout for the media text block.",
        default: "Right",
        ui: {
          component: "select",
          options: ["Left", "Right"],
        },
      },
      {
        type: "string",
        label: "Media placement (vertical)",
        name: "verticalPlacement",
        description: "Where the media sits vertically in desktop view",
        ui: {
          component: "select",
          options: ["Centered", "Top", "Bottom"],
        },
      },
      {
        type: "string",
        label: "Media Placement (mobile)",
        name: "mobilePlacement",
        description:
          "Choose the mobile (stacked) layout for the media text block.",
        default: "Above Text",
        ui: {
          component: "select",
          options: [
            {
              label: "Above Text",
              value: "Above",
            },
            {
              label: "Below Text",
              value: "Below",
            },
          ],
        },
      },
      {
        type: "image",
        label: "Image Source",
        name: "imageSource",
        description:
          "Upload an image or other media to display in the media text block. 4/3 aspect ratio recommended.",
      },
      {
        type: "string",
        label: "YouTube URL",
        name: "youtubeUrl",
        description:
          "Enter the YouTube video URL (only used if Media Type is set to youtube)",
      },
      {
        type: "string",
        label: "Alt Text",
        name: "altText",
        description: "Add alt text for the image.",
      },
    ],
  },
];

const ButtonSchema = [
  {
    type: "string",
    label: "Button Text",
    name: "buttonText",
  },
  {
    type: "string",
    label: "Button Link",
    name: "buttonLink",
  },
  {
    type: "string",
    label: "Icon",
    name: "icon",
    ui: {
      component: IconPickerInput(AntIcons),
    },
  },
  {
    type: "string",
    label: "Callback Function",
    name: "callbackFunction",
    options: ["Placeholder"],
  },
  {
    type: "boolean",
    label: "Icon First",
    name: "iconFirst",
    description: "Place the icon to the left of the button text.",
  },
  {
    type: "string",
    label: "Color",
    name: "color",
    ui: {
      component: ColorPickerInput(buttonColors),
    },
  },
];

const AccordionSchema: Template = {
  name: "accordionBlock",
  label: "Accordion",
  ui: {
    previewSrc: "/images/thumbs/tina/accordion.png",
    defaultItem: {
      heading: "Lorem Ipsum",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      accordionItems: [
        {
          label: "Lorem",
          content: {
            type: "root",
            children: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  },
                ],
              },
            ],
          },
        },
        {
          label: "Ipsum",
          content: {
            type: "root",
            children: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  },
                ],
              },
            ],
          },
        },
      ],
      buttons: [
        {
          buttonText: "Lorem Ipsum",
          colour: 0,
        },
        {
          buttonText: "Dolor Sit",
          colour: 1,
        },
      ],
    },
  },
  fields: [
    {
      type: "string",
      label: "Heading",
      name: "heading",
      description: "Heading text for the block.",
    },
    {
      type: "boolean",
      label: "Use as H1",
      name: "isH1",
      description: "Choose to use the heading as an H1 instead of an H2.",
    },
    {
      type: "string",
      label: "Body",
      name: "body",
      description: "Flavour text under the block title.",
    },
    TabletTextAlignmentFieldSchema as TinaField,
    {
      type: "object",
      label: "Accordion",
      name: "accordionItems",
      description: "The accordion (collapsable) portion of the block.",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label ?? "Accordion" };
        },
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
          description: "Label for the accordion item.",
        },
        {
          type: "rich-text",
          label: "Content",
          name: "content",
          description: "Content/description text for the accordion item.",
          toolbarOverride: ["bold", "italic", "link"],
        },
      ],
    },
    {
      type: "boolean",
      label: "Multiple Accordion Items Open Simultaneously",
      name: "isMultipleOpen",
      description: "Allow multiple accordion items to be open at once.",
    },
    {
      name: "buttons",
      label: "Button Row",
      type: "object",
      list: true,
      description: "A row of buttons. Max 2.",
      ui: {
        defaultItem: {
          buttonText: "Lorem Ipsum",
        },
        max: 2,
        itemProps(item) {
          return { label: `${item.buttonText}` };
        },
      },
      fields: ButtonSchema as TinaField[],
    },
    //@ts-ignore
    ...ImageComponentLayoutSchema,
  ],
};

export default AccordionSchema;
```
