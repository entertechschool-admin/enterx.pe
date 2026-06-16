import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

/**
 * Contenedor central: ancho máximo del manual (1120px) + padding horizontal
 * responsive (mobile-first ~24px → 56px en desktop). Presentacional, Server.
 */
export function Container({
  as: Tag = "div",
  children,
  className = "",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-container px-6 md:px-section-x ${className}`}
    >
      {children}
    </Tag>
  );
}
