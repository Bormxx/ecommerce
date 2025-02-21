import { Button, Dialog, DialogPanel } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'
import FormHeader from '../FormsComponents/FormHeader'
import { inter } from '@/app/fonts'

type MyModalProps = {
  isTrue: boolean,
  errorMessage: string,
  closeFn: Dispatch<SetStateAction<boolean>>
}

export default function MyModal( props: MyModalProps ) {

  return (
    <>
     <Dialog open={props.isTrue} as="div" className="relative z-10 focus:outline-none" onClose={() => props.closeFn(!props.isTrue)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm bg-black/50">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="flex flex-col gap-4 w-full max-w-md rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 drop-shadow-xl"
            >
              <FormHeader>Ошибка</FormHeader>
              <p className={`${inter.className} font-normal text-base`}>
                {props.errorMessage}
              </p>
              <div className="flex justify-end">
                <Button
                  className={`${inter.className} font-bold py-2 px-8 rounded-md bg-blue-800 hover:bg-blue-600 text-base text-center text-white disabled:bg-slate-400`}
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
  )
}