'use client';

import React from 'react';

export type IconDictionary = {
  [key: string]: React.FC;
};

type IconProps = {
  data: {
    name: string;
  };
  className?: string;
  tinaField?: string;
  icons: {
    [key: string]: React.FC;
  };
};

export const Icon = ({
  data,
  className = '',
  tinaField = '',
  icons,
}: IconProps) => {
  const IconOptions = {
    ...icons,
  };
  if (IconOptions[data.name] === null || IconOptions[data.name] === undefined) {
    return <></>;
  }

  const { name } = data;

  const IconSVG: React.FC<{ className?: string; 'data-tina-field'?: string }> =
    IconOptions[name];

  return (
    <IconSVG data-tina-field={tinaField} className={`${className} shrink-0`} />
  );
};
