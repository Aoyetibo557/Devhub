import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";

const Modal = ({children, setOpen, open, title, width, theme }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="z-10"
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={`absolute h-2/4 ${
                width ? width : "w-full"
              } max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl bg-white dark:bg-white rounded-md shadow-xl overflow-hidden`}
            >
              <div className="flex h-full">
                <div className="w-2/4 border-r border-gray-200 dark:border-white p-6">
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="text-lg h-full font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                  )}                  
                </div>
                <div className="w-2/3 bg-gray-100 dark:bg-neutral-200 p-6">
                 {/* Content for left side */}
                  {children}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;