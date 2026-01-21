import {
  Link as RouterLink,
  type LinkComponentProps,
} from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";
import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { buttonVariants } from "./button-variants";
import { cn } from "@/lib/utils";

type LinkProps = VariantProps<typeof buttonVariants> &
  LinkComponentProps & {
    asChild?: boolean;
  };

export function Link({
  children,
  className,
  size = "link",
  variant = "link",
  ...props
}: LinkProps) {
  return (
    <RouterLink
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </RouterLink>
  );
}

type ExternalLinkProps = VariantProps<typeof buttonVariants> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
  };

export function ExternalLink({
  href,
  children,
  className,
  variant = "link",
  size = "link",
  ...props
}: ExternalLinkProps) {
  <a
    href={href}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  >
    {children}
  </a>;
}
