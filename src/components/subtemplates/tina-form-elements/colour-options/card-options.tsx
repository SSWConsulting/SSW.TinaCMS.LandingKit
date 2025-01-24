import { ColorPickerOptions } from "../color-selector";

export const cardOptions: ColorPickerOptions = 
{
    "Glass": {
    classes: "bg-glass text-gray-600 border-1 border-gray-600 p-4 lg:p-6",
    //Note: this is necessary as Tina doesn't recognise tailwind config settings
    editorClasses:
      "bg-[linear-gradient(152.97deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)] text-gray-800",

    },
    "Transparent": {
      classes: "bg-transparent text-black"
    } 
};
