import { Dialog, DialogPanel } from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";


type MyModalProps = {
  isTrue: boolean;
  closeFn: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  isBlocked?: boolean
};

export default function MyModal(props: MyModalProps) {
  return (
    <>
      <Dialog
        open={props.isTrue}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={props.isBlocked ? () => {} : () => props.closeFn(!props.isTrue)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] min-w-80 duration-300 ease-out data-[closed]:opacity-0"
            >
              {props.children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
