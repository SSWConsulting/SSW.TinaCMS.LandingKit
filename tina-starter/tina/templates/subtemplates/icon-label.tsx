import { IconDictionary } from "../../../../dist/components/sub-templates/tina-form-elements/icon";
import { IconPickerInput } from "../../../node_modules/ssw-tinacms-landingkit/dist";

const iconLabelSchema = (icons: IconDictionary) => [
  {
    type: "string",
    label: "Label Text",
    name: "labelText",
    description: "Text for the label.",
  },
  {
    type: "string",
    label: "Icon",
    name: "icon",
    description: "Icon to proceed the label.",
    ui: {
      component: IconPickerInput(icons),
    },
  },
];

export default iconLabelSchema;
