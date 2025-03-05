"use client";

import { useInView } from "framer-motion";
import Image from "next/image";
import { UseInViewOptions } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { ColorPickerOptions } from "../components/sub-templates/tina-form-elements/color-selector";
import { cn } from "./shadcn/utils";

type BackgroundData = {
  background?: {
    backgroundColour?: number;
    backgroundImage?: string;
    bleed?: boolean;
  };
};

interface ComponentWrapperProps {
  data: BackgroundData;
  children: React.ReactNode;
  fadeInMargin?: UseInViewOptions["margin"];
  className?: string;
  backgroundOptions: ColorPickerOptions[];
}

const ComponentWrapper = ({
  data,
  children,
  fadeInMargin = "-100px",
  className,
  backgroundOptions,
}: ComponentWrapperProps) => {
  const bleedRef = useRef(null);
  const fadeInRef = useRef(null);

  const [backgroundAspectRatio, setBackgroundAspectRatio] =
    React.useState(null);
  const [elementWidth, setElementWidth] = React.useState(null);
  const [isInInitialViewport, setIsInInitialViewport] = React.useState(null);

  useEffect(() => {
    const updateWidth = () => {
      if (bleedRef.current) {
        setElementWidth(bleedRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const isInView = useInView(fadeInRef, { once: true, margin: fadeInMargin });
  useEffect(() => {
    setIsInInitialViewport(isInView);
  }, [isInView]);

  return (
    <section
      className={cn(
        backgroundOptions.find((value) => {
          return value.reference === data.background?.backgroundColour;
        })?.classes,
        "relative w-full overflow-visible",
        className
      )}
    >
      {data.background?.bleed && data.background?.backgroundImage ? (
        <Image
          ref={bleedRef}
          src={data.background?.backgroundImage}
          className="absolute w-full z-0 overflow-visible grid inset-0 place-items-center"
          alt="background image"
          width={
            (elementWidth ||
              bleedRef.current?.getBoundingClientRect()?.width) ??
            0
          }
          height={
            backgroundAspectRatio
              ? backgroundAspectRatio * elementWidth
              : ((elementWidth ||
                  bleedRef.current?.getBoundingClientRect()?.height) ??
                0)
          }
          onLoad={(event) => {
            const target = event.target as HTMLImageElement;
            setBackgroundAspectRatio(
              target.naturalHeight / target.naturalWidth
            );
          }}
        />
      ) : (
        <></>
      )}
      <section
        ref={fadeInRef}
        className={cn(
          "relative transition-opacity duration-300 z-5",
          isInInitialViewport === false && "opacity-0",
          !isInInitialViewport && isInView && "opacity-100"
        )}
        style={
          data.background?.bleed
            ? {}
            : {
                backgroundImage: `url(${data.background?.backgroundImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }
        }
      >
        {children}
      </section>
    </section>
  );
};

export default ComponentWrapper;
