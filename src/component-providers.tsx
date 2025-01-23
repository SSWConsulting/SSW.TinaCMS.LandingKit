'use client';
import React, { AnchorHTMLAttributes } from "react";

export type BreadcrumbProps = { 
    textColor?: `text-${string}-${number}` | `text-${string}`,
    textSize?: `text-${string}`
    textUnderlineOffset?: `underline-offset-${string}`,
    hoverColor?: `hover:text-${string}-${number}` | `hover:text-${string}`,
    separatorColor?: `stroke-${string}-${number}` | `stroke-${string}`,
    separatorSize?: `size-${number}`
}

export type LinkComponentType = React.FC<AnchorHTMLAttributes<HTMLAnchorElement>>;

type CallbackFunctions = { 
    [key: string]: ()=> void;
}

export type CardCarouselProps = { 
    LinkComponent : LinkComponentType
    placeholderImage? : string;
    callbackFunctions?: CallbackFunctions | null;
    iconColor?: `text-${string}`;
    icons?: { [key: string]: React.FC}
}

const BreadcrumbContext = React.createContext<BreadcrumbProps>(null)

const CardCarouselContext = React.createContext<CardCarouselProps>(null)

function BuildProvider<Type> ({context, children, value}: { context: React.Context<Type>, children: React.ReactNode, value: Type})  {
    return <context.Provider value={value}>{children}</context.Provider>
}

function createTypedContext<Type>(context : React.Context<Type>) {
    return React.useContext<Type>(context)
}

function useBreadcrumbStyleContext() {
    return createTypedContext<BreadcrumbProps>(BreadcrumbContext)
}

const BreadcrumbStyleProvider = ({children, value}: {children: React.ReactNode, value: BreadcrumbProps}) => {
    return BuildProvider<BreadcrumbProps>({context: BreadcrumbContext, children, value})
}
const useCarouselContext = () => {
    return createTypedContext<CardCarouselProps>(CardCarouselContext)
}

const CardCarouselProvider = ({children, value}: {children: React.ReactNode, value: CardCarouselProps}) => {
    return BuildProvider<CardCarouselProps>({context: CardCarouselContext, children, value})
}

export { BreadcrumbStyleProvider, CardCarouselProvider, useBreadcrumbStyleContext, useCarouselContext };

