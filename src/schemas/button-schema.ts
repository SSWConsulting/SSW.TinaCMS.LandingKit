import * as AntIcons from "react-icons/ai";
import { ColorPickerInput } from "../components/sub-templates/tina-form-elements/color-selector";
import { IconPickerInput } from "../components/sub-templates/tina-form-elements/icon-selector";
import { buttonColors } from "../components/button";
import { Template, TinaField } from "tinacms";

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

const ButtonBlock: Template = {
  label: "Button Block",
  name: "button",
  fields: ButtonSchema as TinaField[],
};

export { ButtonBlock, ButtonSchema };
