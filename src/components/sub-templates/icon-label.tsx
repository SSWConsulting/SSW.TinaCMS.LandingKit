import { tinaField } from 'tinacms/dist/react';
import { Icon, IconDictionary } from './tina-form-elements/icon';

type iconLabelProps = {
  data: {
    icon?: string | null;
    labelText?: string | null;
  };
  icons: IconDictionary;
};

export const IconLabel = ({ data, icons }) => {
  return (
    <div className='flex gap-1 py-2 align-top'>
      {data.icon && (
        <div className='h-full'>
          <Icon
            icons={icons}
            data={{ name: data.icon }}
            tinaField={tinaField(data, 'icon')}
            className='size-5 text-gray-300'
          />
        </div>
      )}
      <p
        className='text-sm font-bold text-gray-300'
        data-tina-field={tinaField(data, 'labelText')}>
        {data.labelText}
      </p>
    </div>
  );
};
