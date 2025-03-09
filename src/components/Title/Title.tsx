import { roboto } from "@/utils/fonts";

type TitleProps = {
  text: string;
};
export default function Title({ text }: TitleProps) {
  return (
    <h1
      className={`${roboto.className} text-base font-bold text-gray-800 md:text-3xl`}
    >
      {text}
    </h1>
  );
}
