import { ColorPickerOptions } from "../color-selector";

export const buttonOptions: ColorPickerOptions = 
  {
    "Red": {
    classes: "bg-ssw-red text-white",
    //Note: this is necessary as Tina doesn't recognise tailwind config settings
    editorClasses: "bg-[#cc4141] text-white",
    },
    "Transparent": 
    {
    classes: "bg-transparent text-gray-950",
  },
}

