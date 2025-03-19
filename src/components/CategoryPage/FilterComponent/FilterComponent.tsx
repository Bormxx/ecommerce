import { roboto } from "@/styles/fonts";
import { JSX } from "react";
import ShadowSection from "@/components/ui/ShadowSection";
type FilterComponentProps = {
  title: string;
  content: JSX.Element;
};

export default function FilterComponent({
  title,
  content,
}: FilterComponentProps) {
  return (
    <ShadowSection
      content={
        <div className="relative flex flex-col gap-3 p-4">
          <h3
            className={`${roboto.className} text-base font-bold text-gray-800`}
          >
            {title}
          </h3>
          {content}
        </div>
      }
    />
  );
}
