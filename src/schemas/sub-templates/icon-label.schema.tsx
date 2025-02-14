import { IconPickerInput } from '../../components/sub-templates/tina-form-elements/icon-selector';
const iconLabelSchema = (icons) => [
  {
    type: 'string',
    label: 'Label Text',
    name: 'labelText',
    description: 'Text for the label.',
  },
  {
    type: 'string',
    label: 'Icon',
    name: 'icon',
    description: 'Icon to proceed the label.',
    ui: {
      component: IconPickerInput(icons),
    },
  },
];

export default iconLabelSchema;
