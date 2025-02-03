'use client';

import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';

import { CallbackFunctions } from '../component-providers';
import { cn } from '../internal/shadcn/utils';
import { Button } from './button';
import { Chips } from './card-carousel/card';
import { IconLabel } from './sub-templates/icon-label';
import { ImageComponentLayout } from './sub-templates/image-component-layout';
import { ListItem } from './sub-templates/list-item';
import { PillGroup } from './sub-templates/pill-group';
import { IconDictionary } from './sub-templates/tina-form-elements/icon';

type ImageTextBlockProps = {
  data: {
    heading?: string | null;
    description?: TinaMarkdownContent | null;
    mediaConfiguration?: {
      imageSource?: string | null;
      placement?: string | null;
      mobilePlacement?: string | null;
      verticalPlacement?: string | null;
      mediaType?: string | null;
      youtubeUrl?: string | null;
    } | null;
    topLabel?: {
      icon?: string | null;
      labelText?: string | null;
    } | null;
    isH1?: boolean | null;
    chips: Chips;
    featureColumns?: {
      twoColumns?: boolean | null;
      features?:
        | ({
            heading?: string | null;
            description: string;
            icon: string;
          } | null)[]
        | null;
    };
    buttons: ({
      buttonText?: string | null;
      buttonLink?: string | null;
    } | null)[];
  };
  icons?: IconDictionary;
  callbackFunctions?: CallbackFunctions;
};
export const ImageTextBlock = ({
  data,
  icons,
  callbackFunctions,
}: ImageTextBlockProps) => {
  const headingClasses = 'my-0 py-2 text-gray-200';
  const noImageCenter =
    data.mediaConfiguration?.imageSource || data.mediaConfiguration?.youtubeUrl
      ? ''
      : 'justify-center';
  return (
    <ImageComponentLayout data={data}>
      {data.topLabel && <IconLabel icons={icons} data={data.topLabel} />}
      {data.isH1 ? (
        <h1
          data-tina-field={tinaField(data, 'heading')}
          className={cn(headingClasses, 'text-3xl font-bold lg:text-4xl')}>
          {data.heading}
        </h1>
      ) : (
        <h2
          data-tina-field={tinaField(data, 'heading')}
          className={cn('text-2xl font-semibold lg:text-3xl', headingClasses)}>
          {data.heading}
        </h2>
      )}
      <TinaMarkdown
        content={data.description}
        components={{
          p: (props) => (
            <p
              {...props}
              className={'py-2 text-base font-light text-gray-300'}
              data-tina-field={tinaField(data, 'description')}
            />
          ),
          h6: () => <></>,
          h5: () => <></>,
          h4: () => <></>,
          h3: () => <></>,
          h2: () => <></>,
          h1: () => <></>,
        }}
      />

      {data.chips && <PillGroup data={data.chips} />}
      <div
        className={`grid ${data.featureColumns?.twoColumns ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {data.featureColumns?.features?.map((item, index) => {
          return <ListItem icons={icons} key={index} data={item} />;
        })}
      </div>
      {data.buttons?.length > 0 && (
        <div className={cn('mt-5 flex flex-wrap gap-3', noImageCenter)}>
          {data.buttons?.map((button, index) => {
            return (
              <Button
                icons={icons}
                className='text-base font-semibold'
                key={`image-text-button-${index}`}
                callbackFunctions={callbackFunctions}
                data={button}
              />
            );
          })}
        </div>
      )}
    </ImageComponentLayout>
  );
};
