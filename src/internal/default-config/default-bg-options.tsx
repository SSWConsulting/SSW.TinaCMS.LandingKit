import { ColorPickerOptions } from '../../components/sub-templates/tina-form-elements/color-selector';

export const defaultBackgroundOptions: ColorPickerOptions = {
  'Soft Left Gradient': {
    classes: 'bg-gradient-to-l from-gray-900 to-[#121212] text-white',
  },
  'Soft Right Gradient': {
    classes: 'bg-gradient-to-r from-gray-900 to-[#121212] text-white',
  },

  'Sheer Top Gradient': {
    classes: 'bg-gradient-to-t from-gray-900 to-black text-white',
  },
  'Sheer Bottom Gradient': {
    classes: 'bg-gradient-to-b from-gray-900 to-black text-white',
  },
  'Dark Gray': {
    classes: 'bg-gray-950 text-white',
    editorClasses: 'bg-[#222222] text-white',
  },
  Gray: {
    classes: 'bg-gray-900 text-white',
  },
  Transparent: {
    classes: 'bg-transparent text-black',
  },
};
