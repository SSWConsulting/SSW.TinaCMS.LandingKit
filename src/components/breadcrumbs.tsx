"use client";

import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { tinaField } from "tinacms/dist/react";
import { ColorPickerOptions } from "../interfaces/color-options";
import ComponentWrapper, { BackgroundData } from "../internal/component-wrapper";
import { defaultBackgroundOptions } from "../internal/default-config/default-bg-options";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../internal/shadcn/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../internal/shadcn/dropdown-menu";
import { cn } from "../internal/shadcn/utils";

function getLinks(
  paths: string[],
  data,
  finalNode?: string,
  firstNode?: string,
  breadcrumbReplacements?: { from: string; to: string }[]
): React.ReactNode[] {
  const placeholder = "Lorem Ipsum";

  // Replace paths with character replacements
  console.log('Debugging values:', {
    paths,
    breadcrumbReplacements
});
  const displayNames = paths.map(
    (path) =>
      breadcrumbReplacements?.find((value) => value.from === path)?.to ||
      path
  );
  switch (paths.length) {
    case 0:
      return [];
    case 1:
      return [
        <BreadcrumbPage
          key={"breadcrumb-item-1"}
          data-tina-field={tinaField(data, "finalBreadcrumb")}
        >
          {finalNode || firstNode || placeholder}
        </BreadcrumbPage>,
      ];
    //may need to seperate out case 2 later
    case 2:
    case 3:
    case 4:
      return [
        <BreadcrumbLink key={"breadcrumb-item-1"} href={"/"}>
          {firstNode}
        </BreadcrumbLink>,
        ...paths.slice(1, -1).map((path, index) => (
          <BreadcrumbLink
            key={`breadcrumb-item-${index + 1}`}
            href={`/${path}`}
          >
            {displayNames[index + 1]}
          </BreadcrumbLink>
        )),
        <BreadcrumbPage
          key={"breadcrumb-last-item"}
          data-tina-field={tinaField(data, "finalBreadcrumb")}
        >
          {finalNode || placeholder}
        </BreadcrumbPage>,
      ];
    default:
      return [
        <BreadcrumbLink key={"breadcrumb-item-1"} href={"/"}>
          {firstNode}
        </BreadcrumbLink>,
        <DropdownMenu key={"breadcrumb-dropdown"}>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <BreadcrumbEllipsis className="size-4" />
            <span className="sr-only">Toggle menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {paths.slice(1, -1).map((path, index) => (
              <DropdownMenuItem key={`breadcrumb-dropdown-${index}`}>
                {displayNames[index + 1]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>,
        <BreadcrumbPage key={"breadcrumb-last-item"}>
          {finalNode || placeholder}
        </BreadcrumbPage>,
      ];
  }
}


type BreadcrumbData = BackgroundData & {
  finalBreadcrumb: string;
}

const Breadcrumbs: FC<{
  data: BreadcrumbData;
  options?: {
    backgroundColors: ColorPickerOptions[];
    breadcrumbReplacements: { from: string; to: string }[];
    firstBreadcrumb: string;
    contentWidth: number;
  }
  children?: React.ReactNode;
}> = (props) => {
  const { data, options } = props;
  const paths = usePathname().split("/").filter(path => path !== "");
  // Index 0 is an empty string if the path starts with a slash
  const links = getLinks(paths, data, options?.firstBreadcrumb, data.finalBreadcrumb, options?.breadcrumbReplacements);


  return (
    <div className="pt-8 sm:pt-12 w-full">
      <ComponentWrapper data={data} backgroundOptions={options?.backgroundColors ?? defaultBackgroundOptions}>
        <div style={{ maxWidth: options?.contentWidth }} className="w-full">
          <Breadcrumb className="text-gray-300">
            <BreadcrumbList>
              {links.map((link, index) => (
                // react fragments don't appear in the dom
                <React.Fragment key={`breadcrumb-${index}`}>
                  {index !== 0 ? (
                    <BreadcrumbSeparator>
                      <Separator />
                    </BreadcrumbSeparator>
                  ) : null}
                  <BreadcrumbItem>{link}</BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </ComponentWrapper>
    </div>
  );
};

export default Breadcrumbs;

const Separator = () => {
  return (
    <svg
      className={cn("h-4 w-4", "dark:stroke-gray-300")}
      strokeWidth={1}
      width="10"
      height="10"
      viewBox="0 0 20 20"
      sharp-rendering="auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 2L6.2384 18.5754" strokeLinecap="round" />
    </svg>
  );
};
