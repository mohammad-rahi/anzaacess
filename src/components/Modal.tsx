import React from 'react'

const Modal = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
    return (
        <div className='fixed inset-x-0 inset-y-0 z-10 bg-black/60 backdrop-blur-md flex items-center justify-center' onClick={onClose}>
            <div className='bg-white w-full max-w-xl mx-auto rounded-md ' onClick={(ev) => ev.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal