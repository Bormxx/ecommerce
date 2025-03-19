import { ReactNode } from "react";
import { inter } from "@/styles/fonts";
import { cn } from "@/shared/utils/frontend/cn";
import Link from "next/link";

// Это дефолтная кнопка, которая используется по всему приложению
// variant: primary - синяя, secondary - белая с границей
// Она играет две роли. Как обычная кнопка и как ссылка. За это отвечает параметр as. По умолчанию button
// Если as = link, то нужно передать href
// По остальным параметр вроде все понятно.

type Props = {
  as?: "button" | "link";
  variant: "primary" | "secondary";
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  extraClass?: string;
  children: ReactNode;
};

export default function ECButton(props: Props) {
  const {
    children,
    variant,
    as = "button",
    type = undefined,
    disabled = false,
    onClick,
    href,
    extraClass,
  } = props;

  const classes = cn(
    `${inter.className} rounded-md px-4 py-2 text-center text-base font-bold disabled:cursor-no-drop`,
    {
      ["bg-blue-800 text-white hover:bg-blue-600"]: variant === "primary",
      ["border-solid border-2 border-blue-800 text-blue-800 hover:text-blue-600 hover:border-blue-600"]:
      variant === "secondary",
    },
    extraClass
  );

  if (as === "link" && href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
