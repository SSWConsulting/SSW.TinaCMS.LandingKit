import * as AntIcons from "react-icons/ai";
import { Template, TinaField } from "tinacms";
import {
  buttonColors,
  ColorPickerInput,
  IconPickerInput,
} from "../../node_modules/ssw-tinacms-landingkit/dist";

const buttonSchema = [
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

const buttonBlock: Template = {
  label: "Button Block",
  name: "button",
  fields: buttonSchema as TinaField[],
};

export { buttonBlock, buttonSchema };
