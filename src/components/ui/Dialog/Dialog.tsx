import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import FormHeader from "@/components/ui/FormsComponents/FormHeader";
import { inter } from "@/styles/fonts";

type MyModalProps = {
  isTrue: boolean;
  errorMessage: string;
  closeFn: Dispatch<SetStateAction<boolean>>;
};

export default function MyModal(props: MyModalProps) {
  return (
    <>
      <Dialog
        open={props.isTrue}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => props.closeFn(!props.isTrue)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-6 drop-shadow-xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <FormHeader>Ошибка</FormHeader>
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
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
