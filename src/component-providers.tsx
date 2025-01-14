'use client';
import React from "react";

export type BreadcrumbProps = { 
    textColor: `text-${string}-${number}` | `text-${string}`,
    textSize: `text-${string}`
    textUnderlineOffset: `underline-offset-${string}`,
    hoverColor: `hover:text-${string}-${number}` | `hover:text-${string}`,
    separatorColor: `stroke-${string}-${number}` | `stroke-${string}`,
    separatorSize: `size-${number}`
}

export type CarouselProps = { 
    LinkComponent : React.ComponentType<any>,
}

const BreadcrumbContext = React.createContext<BreadcrumbProps>({})
const CarouselContext = React.createContext<CarouselProps>({})

function BuildProvider<Type> ({context, children, value}: { context: React.Context<Type>, children: React.ReactNode, value: Type})  {
    return <context.Provider value={value}>{children}</context.Provider>
}

function useStyleContext<Type>(context : React.Context<Type>) {
    return React.useContext<Type>(context)
}

function useBreadcrumbStyleContext() {
    return useStyleContext<BreadcrumbProps>(BreadcrumbContext)
}

const BreadcrumbStyleProvider = ({children, value}: {children: React.ReactNode, value: BreadcrumbProps}) => {
    return BuildProvider<BreadcrumbProps>({context: BreadcrumbContext, children, value})
}
const useCarouselContext = () => {
    return useStyleContext<CarouselProps>(CarouselContext)
}

const CardCarouselProvider = ({children, value}: {children: React.ReactNode, value: CarouselProps}) => {
    return BuildProvider<CarouselProps>({context: CarouselContext, children, value})
}

export { BreadcrumbStyleProvider, CardCarouselProvider, useBreadcrumbStyleContext, useCarouselContext };

