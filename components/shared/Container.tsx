import React from "react";
import { cn } from "@/lib/utils";

type ContainerElement = "div" | "section" | "main" | "nav" | "footer" | "article" | "header";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: ContainerElement;
  children?: React.ReactNode;
  className?: string;
}

export function Container({
  as: Component = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return React.createElement(
    Component,
    {
      className: cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className),
      ...props,
    },
    children
  );
}

export default Container;
