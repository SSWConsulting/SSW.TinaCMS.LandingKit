'use client';
import React from "react";

export type BreadcrumbProps = { 
    textColor: `text-${string}-${number}` | `text-${string}`,
    textSize: `text-${string}`,
    hoverColor: `hover:text-${string}-${number}` | `hover:text-${string}`,
    separatorColor: `stroke-${string}-${number}` | `stroke-${string}`,
    separatorSize: `size-${number}`
}

const BreadcrumbContext = React.createContext<BreadcrumbProps>({})

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

export { BreadcrumbStyleProvider, useBreadcrumbStyleContext };

