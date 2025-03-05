"use client";

import React, { FC, useEffect } from "react";
import { tinaField } from "tinacms/dist/react";
import {
  BreadcrumbProps,
  BreadcrumbStyleProvider,
  useBreadcrumbStyleContext,
} from "../component-providers";
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

type GetLinksProps = {
  paths: string[];
  data;
  firstNode?: string;
  finalNode?: string;
  finalNodePlaceholder?: string;
  breadcrumbReplacements?: { from: string; to: string }[];
};

function getLinks({
  paths,
  data,
  firstNode,
  finalNode,
  finalNodePlaceholder = "",
  breadcrumbReplacements,
}: GetLinksProps): React.ReactNode[] {
  const placeholder = finalNodePlaceholder;
  const displayNames = paths.map(
    (path) =>
      breadcrumbReplacements?.find((value) => value.from === path)?.to || path
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

const Breadcrumbs: FC<
  {
    data: {
      breadcrumbReplacements?: { from: string; to: string }[];
      firstBreadcrumb: string;
      finalBreadcrumb: string;
      finalNodePlaceholder?: string;
    };
    className?: string;
    children?: React.ReactNode;
  } & BreadcrumbProps
> = (props) => {
  const { data } = props;

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname) {
      const paths = window.location.pathname
        .split("/")
        .filter((path) => path !== "");

      const links = getLinks({
        paths,
        data,
        firstNode: data?.firstBreadcrumb,
        finalNode: data.finalBreadcrumb,
        finalNodePlaceholder: data.finalNodePlaceholder,
        breadcrumbReplacements: data?.breadcrumbReplacements,
      });
      setLinks(links);
    }
  }, [data]);
  const [links, setLinks] = React.useState<React.ReactNode[]>([]);
  const textColor = props?.textColor ?? "text-[#cccccc]";
  const separatorColor = props?.separatorColor ?? "stroke-[#cccccc]";
  const hoverColor = props?.hoverColor ?? "hover:text-white";
  const textSize = props?.textSize ?? "text-xs";
  const separatorSize = props?.separatorSize ?? "size-4";
  const textUnderlineOffset =
    props?.textUnderlineOffset ?? "underline-offset-3";

  return (
    <BreadcrumbStyleProvider
      value={{
        textColor,
        separatorColor,
        hoverColor,
        textSize,
        separatorSize,
        textUnderlineOffset,
      }}
    >
      <Breadcrumb className={props.className}>
        <BreadcrumbList>
          {links.map((link, index) => (
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
    </BreadcrumbStyleProvider>
  );
};

export default Breadcrumbs;

const Separator = () => {
  const { separatorSize, separatorColor } = useBreadcrumbStyleContext();
  return (
    <svg
      className={cn(separatorSize, separatorColor)}
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
