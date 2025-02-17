import { Template, TinaField } from "tinacms";
import { IconDictionary } from "../components/sub-templates/tina-form-elements/icon";
import buttonFieldSchema from "./sub-schemas/button-field.schema";

const buttonBlock = ({
  icons,
  previewSrc,
}: {
  icons: IconDictionary;
  previewSrc: string;
}): Template => {
  return {
    ui: {
      previewSrc,
    },
    label: "Button Block",
    name: "button",
    fields: buttonFieldSchema(icons) as TinaField[],
  };
};

export default buttonBlock;
