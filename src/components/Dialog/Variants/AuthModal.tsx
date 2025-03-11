import { inter } from "@/styles/fonts";
import { Button } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

type AuthModalProps = {
  isTrue: boolean;
  errorMessage: string;
  closeFn: Dispatch<SetStateAction<boolean>>;
};

export default function AuthModal(props: AuthModalProps) {
  return (
    <>
      <p className={`${inter.className} text-base font-normal`}>
        {props.errorMessage}
      </p>
      <div className="flex justify-end">
        <Button
          className={`${inter.className} rounded-md bg-blue-800 px-8 py-2 text-center text-base font-bold text-white hover:bg-blue-600 disabled:bg-slate-400`}
          onClick={() => props.closeFn(!props.isTrue)}
        >
          Закрыть
        </Button>
      </div>
    </>
  );
}
