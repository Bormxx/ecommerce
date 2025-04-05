import { inter } from "@/styles/fonts";

type ButtonLongProps = {
  text: string | React.ReactElement;
  onClick: () => void;
  type: "button" | "reset" | "submit" | undefined;
};
export default function ButtonLong({ text, onClick, type }: ButtonLongProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${inter.className} flex-grow rounded-[8px] bg-[#1E40AF] px-4 py-2 text-base font-bold text-white`}
    >
      {text}
    </button>
  );
}
