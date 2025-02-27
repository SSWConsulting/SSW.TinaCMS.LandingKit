import Image from 'next/image';
import { ReactElement } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { Marquee } from '../internal/shadcn/marquee';
import { cn } from '../internal/shadcn/utils';
import React from 'react';

type Logo = {
  logo?: string | null;
  altText?: string | null;
};

type LogoCarouselData = {
  placeholderImage?: string;
  heading?: string | null;
  logos?: (Logo | null)[] | null;
  maskImages?: boolean | null;
};

export default function LogoCarousel(props: {
  data: LogoCarouselData;
  className?: string;
  textSize?: `text-${string}`;
  textPadding?: `p-${string}`;
  mediumTextSize?: `md:text-${string}`;
  textColor?: `text-${string}`;
  repeat?: number;
}): ReactElement {
  const { data } = props;
  const textSize = props.textSize ?? 'text-xl';
  const mediumTextSize = props.mediumTextSize ?? 'md:text-2xl';
  const textColor = props.textColor ?? 'text-white';
  const textPadding = props.textPadding ?? 'p-2';
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center pb-14',
        props.className
      )}>
      <h2
        className={cn(
          'text-xl font-semibold md:text-2xl',
          textSize,
          textColor,
          mediumTextSize,
          textPadding
        )}
        data-tina-field={tinaField(data, 'heading')}>
        {data.heading}
      </h2>
      <div className='mask-horizontal-fade relative h-17 w-full md:h-40'>
        <Marquee
          repeat={props.repeat}
          pauseOnHover
          className='h-full justify-center overflow-hidden'>
          <div className='flex h-full items-center justify-center gap-3'>
            {data.logos &&
              data.logos.map((logo, index) => {
                const Wrapper = ({
                  children,
                  className,
                }: {
                  children?: React.ReactNode;
                  className?: string;
                }) => {
                  return (
                    <div
                      data-tina-field={tinaField(logo, 'logo')}
                      className={cn(
                        'relative h-17 min-w-36 md:h-22 md:min-w-48',
                        className
                      )}
                      key={`logo-${index}`}>
                      {children}
                    </div>
                  );
                };

                return (
                  <React.Fragment key={`logo-fragment-${index}`}>
                    {logo.logo ? (
                      <Wrapper key={`logo-${index}`}>
                        <Image
                          src={logo?.logo}
                          alt={logo?.altText ?? 'Logo'}
                          fill={true}
                          objectFit='contain'
                          className={
                            data.maskImages ? 'brightness-0 invert' : ''
                          }
                        />
                      </Wrapper>
                    ) : (
                      <Wrapper className='bg-white' />
                    )}
                  </React.Fragment>
                );
              })}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
