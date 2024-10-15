"use client";

import { forwardRef } from "react";
import { getSizeStyles, Size } from "../ui-config";
import { ButtonProps } from './types';
import { classes } from './classes';

type Ref = HTMLAnchorElement;
type AllProps = React.ComponentPropsWithoutRef<"a"> & Omit<ButtonProps, "isLoading"> & { href: string; size?: Size };
const LinkButton = forwardRef<Ref, AllProps>(function (
  {
    className,
    size = "md",
    preStyled = true,
    variant,
    href,
    children,
    iconButton = false,
    rounded = false,
    ...props
  },
  ref
) {
  const cls = `inline-flex items-center justify-center  ${classes.base} ${classes[variant]}
      ${rounded ? "rd-full" : "rd-0.5em"}
      ${!iconButton ? "min-w-6em" : ""}
  `;

  return (
    <a
      ref={ref}
      href={href}
      className={`${preStyled ? cls : ""} ${className}`}
      style={{
        textDecoration: "none",
        ...getSizeStyles(size, iconButton),
        paddingInline: iconButton ? undefined : `calc(3 * ${getSizeStyles(size, iconButton).padding})`,
      }}
      {...props}
    >
      {children}
    </a>
  );
});

LinkButton.displayName = "LinkButton";
export default LinkButton;
