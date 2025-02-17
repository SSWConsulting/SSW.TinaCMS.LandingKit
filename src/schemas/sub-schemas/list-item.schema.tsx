import { IconDictionary } from "../../components/sub-templates/tina-form-elements/icon";
import { IconPickerInput } from "../../components/sub-templates/tina-form-elements/icon-selector";

const listItemSchema = (icons: IconDictionary) => [
  {
    type: "string",
    label: "Heading",
    name: "heading",
  },
  {
    type: "string",
    label: "Description",
    name: "description",
  },
  {
    type: "string",
    label: "Icon",
    name: "icon",
    ui: {
      component: IconPickerInput(icons),
    },
  },
];

export default listItemSchema;
