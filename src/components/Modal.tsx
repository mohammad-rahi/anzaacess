import React from 'react'

const Modal = ({ children, onClose, onlyCloseBtn }: { children: React.ReactNode, onClose: () => void, onlyCloseBtn?: boolean }) => {
    return (
        <div className='fixed inset-x-0 inset-y-0 -top-8 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center'
            onClick={() => onlyCloseBtn ? null : onClose()}
        >
            <div className='bg-white w-full max-w-xl mx-auto rounded-md ' onClick={(ev) => ev.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;