import { roboto } from "@/app/fonts";
import { ReactElement } from "react";
type FilterComponentProps = {
  title: string;
  content: ReactElement;
};

export default function FilterComponent({
  title,
  content,
}: FilterComponentProps) {
  return (
    <div className="shadow-custom relative flex flex-col gap-3 rounded-xl bg-white p-4">
      <h3 className={`${roboto.className} text-base font-bold text-gray-800`}>
        {title}
      </h3>
      {content}
    </div>
  );
}
