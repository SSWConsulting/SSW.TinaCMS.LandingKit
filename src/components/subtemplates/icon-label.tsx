import { tinaField } from "tinacms/dist/react";
import { Icon } from "./tina-form-elements/icon";
import { IconPickerInput } from "./tina-form-elements/icon-selector";

export const IconLabel = ({ data }) => {
  return (
    <div className="flex gap-1 py-2 align-top">
      {data.icon && (
        <div className="h-full">
          <Icon
            data={{ name: data.icon }}
            tinaField={tinaField(data, "icon")}
            className="size-5 text-gray-300"
          />
        </div>
      )}
      <p
        className="text-sm font-bold dark:text-gray-300"
        data-tina-field={tinaField(data, "labelText")}
      >
        {data.labelText}
      </p>
    </div>
  );
};

export const IconLabelSchema = [
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
