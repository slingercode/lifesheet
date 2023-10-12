import type { ReactNode } from "react";

type LinkProps = JSX.IntrinsicElements["a"] & {
  children: ReactNode;
};

export const Link = ({
  children,
  rel = "noreferrer",
  className,
  ...props
}: LinkProps) => (
  <a rel={rel} className={`hover:underline ${className}`} {...props}>
    {children}
  </a>
);
