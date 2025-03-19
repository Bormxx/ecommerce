type Props = {
  index: number;
  option: string;
  onClick: (value: string) => void,
}

export function ECDropdownItem(props: Props) {
  const { index, option, onClick } = props;

  return(
    <li
      key={index}
      className="px-[12px] py-[9px] text-[14px] cursor-pointer hover:bg-[#F3F4F6]"
      onClick={() => onClick(option)}
    >
      {option}
    </li>
  )
}
