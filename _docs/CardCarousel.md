#### Card Carousel

A component that displays a list of cards, either in a slideshow or adjacent to one another.

```tsx
// using with TinaCMS
import { Breadcrumbs } from 'ssw-tinacms-landingkit/dist/';

import * as Icons from 'react-icons/<library>';

<CardCarousel
  icons={Icons}
  callbackFunctions={{
    '<callback-function-1>': () => {
      //behaviour
    },
    '<callback-function-n>': () => {
      //behaviour
    },
  }}
  data={
    {
      // ...<data from tina>}
    }
  }
/>;

// using with out TinaCMS

<CardCarousel
  icons={AntIcons}
  callbackFunctions={{
    'Alert user': () => {
      console.log('you clicked the button');
    },
  }}
  data={{
    categoryGroup: [
      {
        categoryName: '<category-name>',
        cardGuidList: {
          cardGuidList: ['1'],
        },
      },
      {
        categoryName: '<category-name>',
        cardGuidList: {
          cardGuidList: ['2'],
        },
      },
    ],
    isH1: false,
    isStacked: false,
    heading: '<heading>',
    body: '<flavor-text>',
    buttons: [
      {
        buttonText: '<button-1>',
        callbackFunction: 'Alert user',
        icon: '<icon-name>',
        color: 'Primary',
      },
      {
        buttonText: '<button-n>',
        buttonLink: '<url>',
        callbackFunction: null,
        icon: '<icon-name>',
        color: 'Secondary',
      },
    ],
    cardStyle: 'Glass',
    cards: [
      {
        guid: '1',
        chips: {
          filledChipText: '<chip-text>',
          clearChipText: '<chip-text>',
        },
        mediaType: 'image',
        image: '<image-url>',
        altText: '<image-alt-text>',
        heading: '<card-1-heading>',
        description: '<card-1-description>',
        featureList: {
          features: [
            {
              heading: '<feature-1>',
              description: '<feature-1-description>',
              icon: 'AiOutlineCheck',
            },
            {
              heading: '<feture-2>',
              description: '<feature-1-description>',
              icon: 'AiOutlineCheck',
            },
          ],
        },
        embeddedButton: {
          buttonText: '<button-text>',
          buttonLink: '<url>',
          icon: 'AiOutlineArrowRight',
        },
      },
      {
        guid: '2',
        chips: {
          filledChipText: '<chip-text>',
          clearChipText: '<chip-text>',
        },
        mediaType: 'youtube',
        youtubeUrl: 'https://www.youtube.com/watch?v=<video-id>',
        heading: '<card-2-heading>',
        description: '<card-2-description>',
        featureList: {
          features: [
            {
              heading: '<feature-1>',
              description: '<feature-1-description>',
              icon: 'AiOutlineCheck',
            },
            {
              heading: '<feature-2>',
              description: '<feature-2-description>',
              icon: 'AiOutlineCheck',
            },
          ],
        },
        embeddedButton: {
          buttonText: '<button-text>',
          buttonLink: '<url>',
          icon: 'AiOutlineArrowRight',
        },
      },
    ],
  }}
/>;
```

##### Props

- `data`: Object containing the breadcrumb content
  - `categoryGroup`:
    - `categoryName`: The name of the group the cards will sit under
    - `cardGuidList`: an object containing the list of card guids assigned to the tab
      - `cardGuidList`: a list of guids for the cards that will display when this tab is clicked
    - `isH1`: Whether or not the title of the component will use a level 1 heading
    - `body`: some flavor text that will display above the cards
    - `buttons`: an array of buttons that will display beneath the card list
      - `buttonText`: the text that will show inside of the button
      - `buttonLink`: an optional hyperlink to wrap the button with
      - `callbackFunction`: the callback function that will fire when the button is clicked (passed in via `callbackFunctions`)
      - `icon`: the name of the icon component that will display next to the button
      - `color`: a string indicating the style of the button ("Primary" or "Secondary")
    - `cardStyle`: a string indicating the style for the cards ("Glass" or "Transparent")
    - `cards`:
      - `guid`: an ID representing the card (used in the categoryGroup field)
      - `chips`: an object containing the text for the pills below the button image
        - `filledChipText`: the text in the left-hand filled chip
        - `clearChipText`: the text in the right-hand clear chip
      - `mediaType`: a string indicating the type of media that will be shown in the card ("image" or "youtube")
      - `youtubeUrl`: https://www.youtube.com/watch?v=<video-id>,
      - `heading`: The heading at the top of the card
      - `description`: The flavor text for the card,
      - `featureList`: an object containing information
        - `features`: an array used to populate the list at the bottom of the button
          - `heading`: the heading of the list item
          - `description`: the description displayed under the heading for the feature list item
          - `icon`: the name of the icon from the `icons` field the button uses
      - `embeddedButton`: The link displayed at the bottom of the card
        - `buttonText`: '<button-text>',
        - `buttonLink`: The name of the icon from the `icons` field the button uses
        - `icon`: The name of the icon from the `icons` field the button uses
- `icons`: a dictionary containing the icons the user can chose from as React components
- `callbackFunctions`: A dictionary of callback functions the user can bind to any button in `buttons`

###### Example Schema Configuration

```tsx
import * as AntIcons from 'react-icons/ai';
import { TinaField } from 'tinacms';
import {
  cardColors,
  CarouselCardPicker,
  ColorPickerInput,
  IconPickerInput,
  // replace with a relative path to your node_modules folder
} from '../../node_modules/ssw-tinacms-landingkit/dist';

// replace with an import from your button field setup
const buttonSchema = [
  {
    type: 'string',
    label: '<button-text-field-label>',
    name: 'buttonText',
  },
  {
    type: 'string',
    label: '<button-link-field-label>',
    name: 'buttonLink',
  },
  {
    type: 'string',
    label: '<button-icon-field-label>',
    name: 'icon',
    ui: {
      component: IconPickerInput(AntIcons),
    },
  },
  {
    type: 'string',
    label: '<callback-function-dropdown-label>',
    name: 'callbackFunction',
    options: ['<keys-in-your-callback-function-dictionary>'],
  },
  {
    type: 'boolean',
    label: '<icon-first-field-label>',
    name: 'iconFirst',
    description: '<icon-first-field-description>',
  },
  {
    type: 'string',
    label: '<color-field-label>',
    name: 'color',
    ui: {
      component: ColorPickerInput(buttonColors),
    },
  },
];

export const pillGroupSchema = [
  {
    type: 'string',
    label: '<filled-chip-field-label>',
    name: 'filledChipText',
    description: '<filled-chip-field-description>',
  },
  {
    type: 'string',
    label: '<clear-chip-field-label>',
    name: 'clearChipText',
    description: '<clear-chip-field-description>',
  },
];

export const listItemSchema = [
  {
    type: 'string',
    label: '<list-heading-field-label>',
    name: 'heading',
  },
  {
    type: 'string',
    label: '<list-description-field-label>',
    name: 'description',
  },
  {
    type: 'string',
    label: '<list-icon-field-label>',
    name: 'icon',
    ui: {
      component: IconPickerInput(AntIcons),
    },
  },
];

const mediaTypeField = {
  type: 'string',
  label: '<media-type-field-label>',
  name: 'mediaType',
  description: '<media-type-field-label>',
  options: ['image', 'youtube'],
};
export const youtubeEmbedField: TinaField = {
  type: 'string',
  label: '<youtube-url-field-label>',
  name: 'youtubeUrl',
  description: '<youtube-url-field-description>',
};

const defaultCardItem = {
  guid: null,
  altText: '<default-card-alt-text>',
  chips: {
    chips: [
      {
        filledChipText: '<default-chip-text>',
        clearChipText: '<default-chip-text>',
      },
    ],
  },
  icon: '<icon-from-library>',
  heading: '<default-heading>',
  description: '<default-description>',
  featureList: {
    features: [
      {
        heading: '<default-heading>',
        description: '<default-description>',
        icon: '<icon-from-library>',
      },
      {
        heading: '<default-heading>',
        description: '<default-description>',
        icon: '<icon-from-library>',
      },
    ],
  },
  embeddedButton: {
    buttonText: '<default-button-text>,
  },
};

const categoryGroupField = {
  type: 'object',
  label: '<category-group-field-label>',
  name: 'categoryGroup',
  list: true,
  description: '<category-group-field-description>',
  ui: {
    defaultItem: {
      categoryName: '<category-group-default-name>',
      cardGuidList: {
        guid: null,
        cardGuidList: [],
      },
    },
  },
  fields: [
    {
      type: 'string',
      label: '<category-name-field-label>',
      name: 'categoryName',
      description: '<category-name-field-description>',
    },
    {
      type: 'object',
      label: '<card-guid-list-field-label>',
      name: 'cardGuidList',
      fields: [
        {
          type: 'string',
          label: '<card-guid-field-label>',
          name: 'guid',
        },
        {
          type: 'string',
          label: '<card-guid-list-field-label>',
          name: 'cardGuidList',
          required: false,
          list: true,
        },
      ],
      ui: {
        component: CarouselCardPicker({ outerBlocksFieldName: 'blocks' }),
      },
    },
  ],
};

const defaultCardBlock = {
  defaultItem: {
    buttons: [
      {
        buttonText: '<default-button-text>',
        color: 'Primary',
      },
      {
        buttonText: '<default-button-text>',
        color: 'Primary',
      },
    ],
    isStacked: false,
    heading: '<default-heading-label>',
    isH1: false,
    body: '<default-body-text>',
    buttonRow: [
      {
        buttonText: '<default-button-text>',
      },
      {
        buttonText: '<default-button-text>',
      },
    ],
    cards: [
      defaultCardItem,
      defaultCardItem,
      defaultCardItem,
      defaultCardItem,
      defaultCardItem,
    ],
  },
};

export const cardCarouselBlock = {
  label: '<card-carousel-field-label>',
  ui: defaultCardBlock,
  name: 'cardCarousel',
  fields: [
    {
      type: 'boolean',
      label: '<stacked-mode-toggle-label>',
      name: 'isStacked',
      description: '<stacked-mode-description>',
    },
    {
      label: '<heading-field-label>',
      name: 'heading',
      description: '<heading-field-description>',
      type: 'string',
    },
    {
      type: 'boolean',
      label: '<use-as-h1-toggle-label>',
      name: 'isH1',
      description: '<use-as-h1-description>.',
    },
    {
      type: 'string',
      label: '<body-field-label>',
      name: 'body',
      description: '<body-field-description>',
      ui: {
        component: 'textarea',
      },
    },
    {
      name: 'buttons',
      label: '<button-row-field-label>',
      description: '<button-row-field-description>',
      list: true,
      ui: {
        max: 2,
      },
      type: 'object',
      // eslint-disable-next-line no-undef
      fields: buttonSchema as TinaField[],
    },
    categoryGroupField as TinaField,
    {
      name: 'cardStyle',
      type: 'string',
      label: '<card-style-field-label>',
      ui: {
        component: ColorPickerInput(cardColors),
        options: ['Glass', 'Transparent'],
      },
    },
    {
      type: 'object',
      label: '<cards-field-label>',
      name: 'cards',
      description: '<cards-field-description>',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.heading ?? '<placeholder-label-for-card>' };
        },
        defaultItem: defaultCardItem,
      },
      fields: [
        {
          type: 'string',
          label: 'guid',
          name: 'guid',
          ui: {
            component: 'hidden',
          },
        },
        mediaTypeField,
        youtubeEmbedField,
        {
          name: 'heading',
          type: 'string',
          label: '<label-for-heading-field>',
          description: '<description-for-heading-field>',
        },

        {
          type: 'string',
          label: '<label-for-icon-field>',
          name: 'icon',
          ui: {
            component: IconPickerInput(AntIcons),
          },
        },
        {
          type: 'image',
          label: '<label-for-image-field>',
          name: 'image',
          description: '<description-for-image-field>',
        },
        {
          type: 'string',
          label: '<label-for-alt-text-field>',
          name: 'altText',
          description: '<description-for-alt-text-field>',
        },
        {
          name: 'chips',
          label: '<label-for-chips-field>',
          type: 'object',
          description: '<description-for-chips-field>',
          fields: pillGroupSchema,
        },
        {
          type: 'string',
          label: '<card-description-field-label>',
          name: 'description',
          ui: {
            component: 'textarea',
          },
        },
        {
          name: 'featureList',
          label: '<feature-list-field-label>',
          description:
            'A list of text-icon entries to go under the description.',
          type: 'object',
          fields: [
            {
              list: true,
              type: 'object',
              label: '<features-field-label>',
              name: 'features',
              description: '<features-field-description>',
              fields: listItemSchema,
              ui: {
                defaultItem: {
                  heading: '<placeholder-heading>',
                  description: '<placeholder-description>',
                },
              },
            },
          ],
        },
        {
          type: 'object',
          label: '<button-field-label>',
          name: 'embeddedButton',
          description: '<button-field-description>',
          fields: [
            {
              type: 'string',
              label: '<button-field-label>',
              name: 'buttonText',
              description: '<button-field-description>',
            },
            {
              type: 'string',
              label: '<button-link-label>',
              name: 'buttonLink',
              description: '<button-link-field-description>',
            },
            {
              type: 'string',
              label: '<icon-field-label>',
              name: 'icon',
              ui: {
                component: IconPickerInput(AntIcons),
              },
            },
          ],
        },
      ],
    },
  ],
};
```
