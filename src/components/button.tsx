import { ButtonProps } from '@headlessui/react';
import Link from 'next/link';
import React, { MouseEvent, useEffect, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { CallbackFunctions } from '../component-providers';
import { cn } from '../internal/shadcn/utils';
import { ColorPickerOptions } from './sub-templates/tina-form-elements/color-selector';
import { Icon, IconDictionary } from './sub-templates/tina-form-elements/icon';
export type ButtonColors = 'Primary' | 'Secondary' | string;
export interface TemplateButtonOptions extends ButtonTinaFields {
  buttonText?: string | null;
  color?: ButtonColors | null;
  iconFirst?: boolean | null;
  callbackFunction?: string | null;
  buttonLink?: string | null;
  icon?: string | null;
  showLeadCaptureForm?: boolean | null;
}
export const Button = ({
  className,
  data,
  callbackFunctions,
  icons,
}: {
  icons?: IconDictionary;
  className?: string;
  callbackFunctions?: CallbackFunctions | null;
  data: TemplateButtonOptions;
} & ButtonProps) => {
  const { iconFirst, buttonText, icon } = data;
  const color = data.color ?? 'Primary';
  const button = (
    <RippleButton
      onClick={(e) => {
        if (!data.callbackFunction) return;
        if (!callbackFunctions) return;
        if (!callbackFunctions[data.callbackFunction]) return;
        callbackFunctions[data.callbackFunction]();
      }}
      textTinaField={tinaField(data)}
      className={className}
      fontClassName={cn('gap-0.5', iconFirst ? 'flex-row' : 'flex-row-reverse')}
      variant={color}>
      <Icon icons={icons} data={{ name: icon }} />
      {buttonText}
    </RippleButton>
  );
  return (
    <>
      {data.buttonLink ? <Link href={data.buttonLink}>{button}</Link> : button}
    </>
  );
};

export type ColorVariant = 'primary' | 'secondary';

export interface ButtonTinaFields {
  textTinaField?: string;
}

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonTinaFields {
  children: React.ReactNode;
  rippleColor?: string;
  fontClassName?: string;
  duration?: string;
  variant: ButtonColors;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      variant = 'Primary',
      className,
      fontClassName,
      children,
      rippleColor = 'rgba(0, 0, 0, 0.25)',
      duration = '600ms',
      textTinaField,
      onClick = () => {},
      ...props
    },
    ref
  ) => {
    const [buttonRipples, setButtonRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([]);

    const isPrimary = variant === 'Primary';
    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple = { x, y, size, key: Date.now() };
      setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
    };

    useEffect(() => {
      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1];
        const timeout = setTimeout(() => {
          setButtonRipples((prevRipples) =>
            prevRipples.filter((ripple) => ripple.key !== lastRipple.key)
          );
        }, parseInt(duration));
        return () => clearTimeout(timeout);
      }
    }, [buttonRipples, duration]);

    return (
      <button
        onClick={(e) => onClick(e)}
        className={cn(
          'text-primary font-semibold relative cursor-pointer items-center justify-center overflow-hidden rounded-md px-6 py-3 text-center',
          '',
          buttonColors[variant].classes,
          className
        )}
        onMouseEnter={isPrimary ? createRipple : undefined}
        ref={ref}
        {...props}>
        <div
          data-tina-field={textTinaField}
          className={cn(
            'relative z-10 flex items-center gap-2',
            fontClassName
          )}>
          {children}
        </div>
        <span className='pointer-events-none absolute inset-0'>
          {buttonRipples.map((ripple) => (
            <span
              className={'absolute animate-rippling rounded-full opacity-30'}
              key={ripple.key}
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                transform: 'scale(0)',
              }}
            />
          ))}
        </span>
      </button>
    );
  }
);
export const buttonColors: ColorPickerOptions = {
  Primary: {
    classes: `bg-sswRed hover:bg-sswDarkRed text-white`,
    editorClasses: 'bg-[#cc4141] text-white',
  },
  Secondary: {
    classes:
      'bg-transparent outline -outline-1.5 outline-white -outline-offset-1.5 hover:outline-gray-200 hover:text-gray-200 text-white',
    editorClasses: 'bg-transparent text-gray-700',
  },
};

export default RippleButton;
