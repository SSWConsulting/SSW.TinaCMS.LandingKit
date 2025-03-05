import Link from "next/link";
import React, { MouseEvent, useEffect, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { CallbackFunctions } from "../component-providers";
import { cn } from "../internal/shadcn/utils";
import { ColorPickerOptions } from "./sub-templates/tina-form-elements/color-selector";
import { Icon, IconDictionary } from "./sub-templates/tina-form-elements/icon";

// export type ButtonColors = "Primary" | "Secondary" | string;

enum ButtonColors {
  Red = 0,
  Transparent = 1,
}

export interface ButtonTinaFields {
  textTinaField?: string;
}

export interface TemplateButtonOptions extends ButtonTinaFields {
  buttonText?: string | null;
  buttonLink?: string | null;
  colour?: number | null;
  callbackFunction?: string | null;
  icon?: string | null;
  iconFirst?: boolean | null;
  // showLeadCaptureForm?: boolean | null;
  // leadCaptureFormOption?: string;
}

type ButtonProps = {
  className?: string;
  data: TemplateButtonOptions;
  icons?: IconDictionary;
  callbackFunctions?: CallbackFunctions | null;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, icons, callbackFunctions, data }: ButtonProps, ref) => {
    const { iconFirst, buttonText, icon, colour } = data;
    const variants: ColorVariant[] = ["primary", "secondary"];
    console.log(colour);
    console.log(variants[colour]);
    return (
      <RippleButton
        onClick={() => {
          if (!data.callbackFunction) return;
          if (!callbackFunctions) return;
          if (!callbackFunctions[data.callbackFunction]) return;
          callbackFunctions[data.callbackFunction]();
        }}
        ref={ref}
        textTinaField={tinaField(data, "buttonText")}
        className={className}
        fontClassName={cn(
          "gap-0.5",
          iconFirst ? "flex-row" : "flex-row-reverse"
        )}
        variant={variants[colour]}
      >
        <Icon
          icons={icons}
          tinaField={tinaField(data, "icon")}
          data={{ name: icon }}
        />
        {buttonText}
      </RippleButton>
    );
    // return (
    //   <>
    //     {data.buttonLink ? (
    //       <Link href={data.buttonLink}>{button}</Link>
    //     ) : (
    //       button
    //     )}
    //   </>
    // );
  }
);

export type ColorVariant = "primary" | "secondary";

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonTinaFields {
  children: React.ReactNode;
  rippleColor?: string;
  fontClassName?: string;
  duration?: string;
  variant: ColorVariant;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      variant = "primary",
      className,
      fontClassName,
      children,
      rippleColor = "rgba(0, 0, 0, 0.25)",
      duration = "600ms",
      textTinaField,
      onClick = () => {},
      ...props
    },
    ref
  ) => {
    const [buttonRipples, setButtonRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([]);

    const isPrimary = variant === "primary";
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
          "text-primary font-semibold relative cursor-pointer items-center justify-center overflow-hidden rounded-md px-6 py-3 text-center",
          variants[variant],
          className
        )}
        onMouseEnter={isPrimary ? createRipple : undefined}
        ref={ref}
        {...props}
      >
        <div
          data-tina-field={textTinaField}
          className={cn(
            "relative z-10 flex items-center justify-center gap-2",
            fontClassName
          )}
        >
          {children}
        </div>
        <span className="pointer-events-none absolute inset-0">
          {buttonRipples.map((ripple) => (
            <span
              className={"absolute animate-rippling rounded-full opacity-30"}
              key={ripple.key}
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                transform: "scale(0)",
              }}
            />
          ))}
        </span>
      </button>
    );
  }
);

const variants: Record<ColorVariant, string> = {
  primary: "bg-sswRed hover:bg-sswDarkRed text-white",
  secondary:
    "bg-transparent outline -outline-1.5 outline-white -outline-offset-1.5 hover:outline-gray-200 hover:text-gray-200 text-white",
};

// export const buttonColors: ColorPickerOptions[] = [
//   {
//     name: "Primary",
//     classes: `bg-sswRed hover:bg-sswDarkRed text-white`,
//     editorClasses: "bg-[#cc4141] text-white",
//     reference: 0,
//   },
//   {
//     name: "Secondary",
//     classes:
//       "bg-transparent outline -outline-1.5 outline-white -outline-offset-1.5 hover:outline-gray-200 hover:text-gray-200 text-white",
//     editorClasses: "bg-transparent text-gray-700",
//     reference: 1,
//   },
// ];
RippleButton.displayName = "RippleButton";

export default RippleButton;
