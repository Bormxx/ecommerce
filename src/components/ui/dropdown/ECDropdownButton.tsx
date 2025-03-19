import Image from "next/image";

type Props = {
  value: string,
  open: boolean,
  onClick: () => void,
}

export function ECDropdownButton (props: Props) {
  const { open, value, onClick } = props;

  return(
    <div
      className="w-full px-[12px] py-[9px] border border-gray-400 rounded-[4px] text-[14px] font-normal leading-5 cursor-pointer bg-white flex items-center justify-between"
      onClick={() => onClick()}
    >
      {value}
      <Image
        src="icons/list_arrow.svg"
        alt="Arrow"
        width={16}
        height={16}
        className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      />
    </div>
  )
}
