import { Template, TinaField } from "tinacms";
import { IconDictionary } from "../components/sub-templates/tina-form-elements/icon";
import buttonSchema from "./sub-schemas/button-field.schema";

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
    fields: buttonSchema(icons) as TinaField[],
  };
};

export default buttonBlock;
