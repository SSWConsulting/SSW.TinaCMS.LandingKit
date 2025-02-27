import { buttonColors } from "../../components/button";
import { ColorPickerInput } from "../../components/sub-templates/tina-form-elements/color-selector";
import { IconDictionary } from "../../components/sub-templates/tina-form-elements/icon";
import { IconPickerInput } from "../../components/sub-templates/tina-form-elements/icon-selector";

const buttonFieldSchema = (icons: IconDictionary) => [
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
      component: IconPickerInput(icons),
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

export default buttonFieldSchema;
