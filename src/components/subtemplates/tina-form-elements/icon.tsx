"use client";

import React, { HtmlHTMLAttributes } from "react";
type IconProps = {
  data: {
    name: string;
  };
  className?: string;
  tinaField?: string;
  icons: { [key: string]: React.FC<HtmlHTMLAttributes<HTMLBaseElement>> };
}

export const Icon = ({ data, className = "", tinaField = "", icons} : IconProps) => {


  const IconOptions = {
    ...icons,
  }
  if (IconOptions[data.name] === null || IconOptions[data.name] === undefined) {
    return <></>;
  }

  const { name } = data;

  const IconSVG = IconOptions[name];

  return (
    <IconSVG data-tina-field={tinaField} className={`${className} shrink-0`} />
  );
};
