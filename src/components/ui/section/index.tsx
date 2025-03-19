import { ReactNode } from "react";
import { cn } from "@/shared/utils/frontend/cn";
import { roboto } from "@/styles/fonts";

type Props = {
  title: string,
  extraClasses?: string,
  rightContentTitle?: ReactNode,
  children: ReactNode,
}

export function ECSection(props: Props) {
  const {
    title,
    children,
    extraClasses
  } = props;

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl bg-white p-4 shadow-lg self-start",
        extraClasses
      )}
    >
      <div className="flex items-center justify-between">
        <span className={`${roboto.className} text-2xl font-bold text-nowrap`}>{title}</span>
        {props.rightContentTitle}
      </div>
      {children}
    </div>
  )
}
