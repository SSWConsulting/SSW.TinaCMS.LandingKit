import { IconPickerInput } from "../../../node_modules/ssw-tinacms-landingkit/dist";

import * as AntIcons from "react-icons/ai";

const listItemSchema = [
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
      component: IconPickerInput(AntIcons),
    },
  },
];
export default listItemSchema;
