import { Template, TinaField } from "tinacms";
import { cardColors } from "../components/card-carousel/card";
import CarouselCardPicker from "../components/sub-templates/tina-form-elements/card-picker";
import { ColorPickerInput } from "../components/sub-templates/tina-form-elements/color-selector";
import { IconDictionary } from "../components/sub-templates/tina-form-elements/icon";
import { IconPickerInput } from "../components/sub-templates/tina-form-elements/icon-selector";
import buttonFieldSchema from "./sub-schemas/button-field.schema";
import listItemSchema from "./sub-schemas/list-item.schema";
import mediaTypeField from "./sub-schemas/media-type.schema";
import pillGroupSchema from "./sub-schemas/pill-group.schema";

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
  cardBlockBody:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
};

export const cardCarouselBlock = ({
  previewSrc,
  icons,
}: {
  previewSrc?: string;
  icons: IconDictionary;
}): Template => {
  return {
    label: "Card Carousel",
    ui: {
      defaultItem: defaultCardBlock,
      previewSrc,
    },
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
        name: "cardBlockBody",
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
        fields: buttonFieldSchema(icons) as TinaField[],
      },
      categoryGroupField as TinaField,
      {
        name: "cardStyle",
        type: "number",
        label: "Card Style",
        options: ["Glass", "Transparent"],
        ui: {
          // @ts-ignore
          component: ColorPickerInput(cardColors),
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
          mediaTypeField as TinaField,
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
              // @ts-ignore
              component: IconPickerInput(icons),
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
            fields: pillGroupSchema as TinaField[],
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
                fields: listItemSchema(icons) as TinaField[],
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
                  // @ts-ignore
                  component: IconPickerInput(icons),
                },
              },
            ],
          },
        ],
      },
    ],
  };
};
