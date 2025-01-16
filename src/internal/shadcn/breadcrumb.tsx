import { Slot } from "@radix-ui/react-slot";
import { MoreHorizontal, Slash } from "lucide-react";
import * as React from "react";

import { useBreadcrumbStyleContext } from "../../component-providers";
import { cn } from "./utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
  
>(({ className, ...props }, ref) => {
  const {textSize, textColor} = useBreadcrumbStyleContext()
  return <ol
    ref={ref}
    className={cn(
      "unstyled flex flex-wrap items-center gap-1 break-words pb-1 font-light" ,textSize, textColor,
      className
    )}
    {...props}
  />
});
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => {
  return <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
});
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const {hoverColor, textColor, textUnderlineOffset} = useBreadcrumbStyleContext()
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      ref={ref}
      className={cn(
        "unstyled underline underline-offset-3 transition-colors", textUnderlineOffset,
        textColor,
        hoverColor,
        className
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => {


  return <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn(className, "min-h-4 min-w-1")}
    {...props}
  />
});
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => {
  const {separatorColor } = useBreadcrumbStyleContext();
  return <li
    role="presentation"
    aria-hidden="true"
    className={cn(className, separatorColor)}
    {...props}
  >
    {children ?? <Slash />}
  </li>
  }
;
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
};

