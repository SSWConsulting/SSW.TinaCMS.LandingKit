"use client";

import { cn } from "../internal/shadcn/utils";
import Link from "next/link";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";
import { Button, TemplateButtonOptions } from "./button";
import { IconDictionary } from "./sub-templates/tina-form-elements/icon";

type ButtonRowOptions = {
  buttons?: (TemplateButtonOptions | null)[] | null;
};

type ButtonRowProps = {
  data: ButtonRowOptions | null | null;
  className?: string;
  icons?: IconDictionary;
};

export const ButtonRow = forwardRef<HTMLDivElement, ButtonRowProps>(
  ({ data, className, icons }: ButtonRowProps, ref) => {
    const buttonContainerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<HTMLButtonElement[]>([]);

    const [buttonIsFullWidth, setButtonIsFullWidth] = useState(false);
    const [buttonContainerWidth, setButtonContainerWidth] = useState(0);
    const [fullWidthButtonIndex, setFullWidthButtonIndex] = useState<
      number | null
    >(null);

    useEffect(() => {
      const findFullWidthButton = () => {
        for (let i = 0; i < buttonRefs.current.length; i++) {
          const el = buttonRefs.current[i];
          if (!el) return;
          if (
            i === fullWidthButtonIndex &&
            el.clientWidth < buttonContainerWidth
          ) {
            setButtonIsFullWidth(false);
            return;
          }
          if (buttonRefs.current[i].clientWidth === buttonContainerWidth) {
            setButtonIsFullWidth(true);
            if (fullWidthButtonIndex === null) {
              setFullWidthButtonIndex(i);
            }
            return;
          }
        }
        setButtonIsFullWidth(false);
      };
      findFullWidthButton();
    }, [buttonContainerWidth, fullWidthButtonIndex, data.buttons]);

    useResizeObserver({
      ref: buttonContainerRef,
      onResize: () => {
        const width = buttonContainerRef?.current?.clientWidth;
        width && setButtonContainerWidth(width);
      },
    });

    return (
      <>
        {data?.buttons.length > 0 && (
          <div
            ref={(node) => {
              buttonContainerRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            className={cn("mt-5 flex flex-wrap gap-3", className)}
          >
            {data?.buttons.map((button, index) => {
              const buttonElement = (
                <Button
                  data={button}
                  icons={icons}
                  key={`image-text-button-${index}`}
                  ref={(node) => {
                    buttonRefs.current[index] = node;
                    return () => {
                      index === fullWidthButtonIndex &&
                        setFullWidthButtonIndex(null);
                      delete buttonRefs.current[index];
                    };
                  }}
                  className={cn(
                    "text-base font-semibold",
                    index !== fullWidthButtonIndex &&
                      buttonIsFullWidth &&
                      "w-full sm:w-auto"
                  )}
                />
              );

              return button.buttonLink ? (
                <Link
                  className={cn(buttonIsFullWidth && "w-full sm:w-auto")}
                  href={button.buttonLink}
                  key={`link-wrapper-${index}`}
                >
                  {buttonElement}
                </Link>
              ) : (
                <>{buttonElement}</>
              );
            })}
          </div>
        )}
      </>
    );
  }
);
