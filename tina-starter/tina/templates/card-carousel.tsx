import * as AntIcons from "react-icons/ai";
import { TinaField } from "tinacms";
import {
  cardColors,
  CarouselCardPicker,
  ColorPickerInput,
  IconPickerInput,
} from "../../node_modules/ssw-tinacms-landingkit/dist";
import { buttonSchema } from "./button";
import listItemSchema from "./subtemplates/list-item";
import mediaTypeField from "./subtemplates/media-type";
import pillGroupSchema from "./subtemplates/pill-group";

export const youtubeEmbedField: TinaField = {
  type: "string",
  label: "YouTube URL",
  name: "youtubeUrl",
  description:
    "Enter the YouTube video URL (only used if Media Type is set to youtube)",
};

const defaultCardItem = {
  guid: null,
  altText: "Lorem Ipsum",
  chips: {
    chips: [
      {
        filledChipText: "Lorem",
        clearChipText: "Ipsum",
      },
    ],
  },
  icon: "info",
  heading: "Lorem Ipsum",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  featureList: {
    features: [
      {
        heading: "Feature 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "Tina",
      },
      {
        heading: "Feature 2",
        description:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: "Tina",
      },
    ],
  },
  embeddedButton: {
    buttonText: "Lorem",
  },
};

const categoryGroupField = {
  type: "object",
  label: "Category Group",
  name: "categoryGroup",
  list: true,
  description: "The category that cards fit into",
  ui: {
    defaultItem: {
      categoryName: "Lorem",
      cardGuidList: {
        guid: null,
        cardGuidList: [],
      },
    },
  },
  fields: [
    {
      type: "string",
      label: "Category Name",
      name: "categoryName",
      description: "Text to include on the tab.",
    },
    {
      type: "object",
      label: "Attached Cards",
      name: "cardGuidList",
      fields: [
        {
          type: "string",
          label: "Category GUID",
          name: "guid",
        },
        {
          type: "string",
          label: "Card GUID List",
          name: "cardGuidList",
          required: false,
          list: true,
        },
      ],
      ui: {
        component: CarouselCardPicker({ outerBlocksFieldName: "blocks" }),
      },
    },
  ],
};

const defaultCardBlock = {
  defaultItem: {
    buttons: [
      {
        buttonText: "Lorem",
        color: "Primary",
      },
      {
        buttonText: "Ipsum",
        color: "Secondary",
      },
    ],
    isStacked: false,
    heading: "Lorem Ipsum",
    isH1: false,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonRow: [
      {
        buttonText: "Lorem",
      },
      {
        buttonText: "Ipsum",
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
  label: "Card Carousel",
  ui: defaultCardBlock,
  name: "cardCarousel",
  fields: [
    {
      type: "boolean",
      label: "Stacked Mode",
      name: "isStacked",
      description: "Remove the carousel effect and stack card entries.",
    },
    {
      label: "Heading",
      name: "heading",
      description: "Heading text for the block.",
      type: "string",
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
      ui: {
        component: "textarea",
      },
    },
    {
      name: "buttons",
      label: "Button Row",
      description: "a row of bttons. Max 2.",
      list: true,
      ui: {
        max: 2,
      },
      type: "object",
      // eslint-disable-next-line no-undef
      fields: buttonSchema as TinaField[],
    },
    categoryGroupField as TinaField,
    {
      name: "cardStyle",
      type: "string",
      label: "Card Style",
      ui: {
        component: ColorPickerInput(cardColors),
        options: ["Glass", "Transparent"],
      },
    },
    {
      type: "object",
      label: "Cards",
      name: "cards",
      description: "The list of cards to be displayed.",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.heading ?? "Card" };
        },
        defaultItem: defaultCardItem,
      },
      fields: [
        {
          type: "string",
          label: "guid",
          name: "guid",
          ui: {
            component: "hidden",
          },
        },
        mediaTypeField,
        youtubeEmbedField,
        {
          name: "heading",
          type: "string",
          label: "Heading",
          description: "The heading for the card.",
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
          type: "image",
          label: "Image",
          name: "image",
          description: "Image source for the card.",
        },
        {
          type: "string",
          label: "Alt Text",
          name: "altText",
          description: "Alternative text for the card.",
        },
        {
          name: "chips",
          label: "Chips",
          type: "object",
          description: "Add chips to the bottom of the media text block.",
          fields: pillGroupSchema,
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "featureList",
          label: "Feature List",
          description:
            "A list of text-icon entries to go under the description.",
          type: "object",
          fields: [
            {
              list: true,
              type: "object",
              label: "Features",
              name: "features",
              description: "Add an item to the the feature columns.",
              fields: listItemSchema,
              ui: {
                defaultItem: {
                  heading: "Lorem Ipsum",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                },
              },
            },
          ],
        },
        {
          type: "object",
          label: "Embedded Button",
          name: "embeddedButton",
          description: "The link appearing at the bottom of each card.",
          fields: [
            {
              type: "string",
              label: "Button Text",
              name: "buttonText",
              description: "Text to appear on the button.",
            },
            {
              type: "string",
              label: "Button Link",
              name: "buttonLink",
              description: "Link to the page the button will navigate to.",
            },
            {
              type: "string",
              label: "Icon",
              name: "icon",
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
