import React, { ReactNode } from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {

    return (
        <div
            onClick={onClose}
            className={` block absolute lg:fixed inset-0 lg:flex justify-center items-center transition-colors z-10 ${open ? "visible lg:bg-black/40 " : "invisible"
                }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-skin-base max-w-3xl  rounded-3xl mx-auto lg:rounded-3xl shadow p-5 transition-all ease-in-out duration-1000  w-full ${open
                    ? "lg:scale-100 opacity-100 max-lg:top-0"
                    : "lg:scale-125 opacity-0 max-lg:top-[-1000px]"
                    }`}
            >
                <div className="header-modal flex flex-row justify-between items-center mb-4">
                    <div></div>
                    <div className="">
                        <p className="text-white font-bold text-2xl">
                            Title
                        </p>

                    </div>
                    <button onClick={onClose}>
                        <svg width="31" height="31" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.9062 15.9062L25.0938 25.0938M25.0938 15.9062L15.9062 25.0938M38.875 20.5C38.875 30.6482 30.6482 38.875 20.5 38.875C10.3518 38.875 2.125 30.6482 2.125 20.5C2.125 10.3518 10.3518 2.125 20.5 2.125C30.6482 2.125 38.875 10.3518 38.875 20.5Z" stroke="white" strokeWidth="3.0625" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </button>
                </div>

                <div className="body-Modal">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
