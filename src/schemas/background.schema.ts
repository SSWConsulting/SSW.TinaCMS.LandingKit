import {
  ColorPickerInput,
  ColorPickerOptions,
} from '../components/sub-templates/tina-form-elements/color-selector';
export function backgroundSchema(backgroundOptions: ColorPickerOptions) {
  return {
    type: 'object',
    label: 'Background',
    name: 'background',
    component: 'group',
    fields: [
      {
        type: 'number',
        label: 'Background Colour',
        name: 'backgroundColor',
        component: ColorPickerInput(backgroundOptions),
      },
      {
        type: 'image',
        label: 'Background Image',
        name: 'backgroundImage',
        component: 'image',
        ui: {
          validate: (value) => {
            const lastSegment = value?.split('/')?.slice(-1)[0];
            if (!lastSegment) {
              return;
            }
            if (lastSegment?.indexOf(' ') > -1) {
              return 'image names cannot have spaces';
            }
          },
        },
        description:
          'An optional background image, overlay on top of the colour. Streched to fit. File names cannot contain spaces.',
      },
      {
        type: 'boolean',
        label: 'Bleed',
        name: 'bleed',
        description: 'If true, the background will bleed into lower blocks.',
        component: 'toggle',
      },
    ],
  };
}
