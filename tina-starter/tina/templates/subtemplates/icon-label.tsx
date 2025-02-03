import { IconPickerInput } from "../../../node_modules/ssw-tinacms-landingkit/dist";

const iconLabelSchema = [
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
      component: IconPickerInput,
    },
  },
];

export default iconLabelSchema;
