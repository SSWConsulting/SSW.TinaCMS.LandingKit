import { Template, TinaField } from "tinacms";
import { IconDictionary } from "../components/sub-templates/tina-form-elements/icon";
import buttonFieldSchema from "./sub-schemas/button-field.schema";
import imageComponentLayoutSchema from "./sub-schemas/image-component-layout.schema";
import tabletTextAlignmentFieldSchema from "./sub-schemas/tablet-text-alignment.schema";

const accordionBlock = ({
  icons,
  previewSrc,
}: {
  icons: IconDictionary;
  previewSrc?: string;
}): Template => {
  return {
    name: "accordion",
    label: "Accordion",
    ui: {
      previewSrc: previewSrc,
      defaultItem: {
        heading: "Lorem Ipsum",
        accordionBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
        name: "accordionBody",
        description: "Flavour text under the block title.",
      },
      tabletTextAlignmentFieldSchema as TinaField,
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
        fields: buttonFieldSchema(icons) as TinaField[],
      },
      //@ts-ignore
      ...imageComponentLayoutSchema,
    ],
  };
};

export default accordionBlock;
