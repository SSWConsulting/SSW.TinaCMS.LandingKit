import { Template, TinaField } from "tinacms";
import buttonFieldSchema from "./sub-schemas/button-field.schema";
import { IconDictionary } from "../components/sub-templates/tina-form-elements/icon";

const buttonRowSchema = ({
  icons,
  previewSrc,
}: {
  icons: IconDictionary;
  previewSrc: string;
}): Template => {
  return {
    name: "buttonRowSchema",
    label: "Button Row",
    ui: {
      previewSrc: previewSrc,
    },
    fields: [
      {
        name: "buttons",
        label: "Button Row",
        list: true,
        type: "object",
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
    ],
  };
};

export default buttonRowSchema;
