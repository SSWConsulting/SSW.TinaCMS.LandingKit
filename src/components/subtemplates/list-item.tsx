'use client';
import { HtmlHTMLAttributes } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { Icon } from './tina-form-elements/icon';

type ListItemData = {
  icon?: string | null;
  heading?: string | null;
  description?: string | null;
};
export const ListItem = ({
  data,
  icons,
}: {
  data: ListItemData;
  icons: { [key: string]: React.FC<HtmlHTMLAttributes<HTMLBaseElement>> };
}) => {
  return (
    <div className={'flex gap-1 align-top'}>
      {data.icon && (
        <div className='h-full p-1'>
          <Icon
            icons={icons}
            data={{ name: data.icon }}
            tinaField={tinaField(data, 'icon')}
            className='size-6 text-white'
          />
        </div>
      )}
      <div className='flex flex-col'>
        <h6
          className='w-full p-1 text-base font-semibold text-white'
          data-tina-field={tinaField(data, 'heading')}>
          {data.heading}
        </h6>
        <p
          className='w-full p-1 text-sm font-light text-gray-200'
          data-tina-field={tinaField(data, 'description')}>
          {data.description}
        </p>
      </div>
    </div>
  );
};
