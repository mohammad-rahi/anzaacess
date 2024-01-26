import React from 'react'
import { Button } from '..'

type Props = {
  setShowCartModal: React.Dispatch<React.SetStateAction<boolean>> 
}

export default function CartModal({ setShowCartModal }: Props) {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/25 backdrop-blur-sm' onClick={() => setShowCartModal(false)}>
      <div className='bg-white w-[450px] fixed inset-y-0 right-0 rounded-l-md' onClick={(ev) => ev.stopPropagation()}>
        <div className='border-b border-gray-100 flex items-center justify-between gap-8'>
        
        </div>
      </div>
    </div>
  )
}
