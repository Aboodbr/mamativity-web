/* eslint-disable react/prop-types */
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import oops from "@/assets/oops.png"
import success from "@/assets/success.png"

export default function StatusModal({isOpen, close, type} ) {


  return (
    <>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full flex justify-center items-center flex-col  md:w-[60%] rounded-xl bg-gradient-to-b from-[rgba(255,207,250,1)] to-[rgba(203,243,255,1)] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <img src={type === "oops" ? oops : success} />
              <DialogTitle as="h1" className={`font-bold text-4xl ${type === "oops" ? "text-red-500" : "text-green-500"}`} >
              {type === "oops" ? "Oops" : "Success"}
              </DialogTitle>
              <p className="mt-2 text-lg font-medium text-gray-900">
              {type === "oops" ? "Something went wrong!" : "Everything is working normally."}
              </p>
              <div className="mt-4 w-full text-center">
                <Button
                  className="bg-gradient-to-r from-[rgba(137,221,247,1)] via-[rgba(137,221,247,1)] to-[rgba(255,255,255,1)] shadow-xl hover:shadow-lg duration-300 rounded-full py-2.5 px-34 font-bold text-xl"
                  onClick={close}
                >
                  Next
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}