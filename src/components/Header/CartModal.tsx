"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '..';

type Props = {
  setShowCartModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CartModal({ setShowCartModal }: Props) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    // Retrieve cart items from local storage
    const cartItemsJson = localStorage.getItem('cartItems');
    const storedCartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
    setCartItems(storedCartItems);
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/25 backdrop-blur-sm' onClick={() => setShowCartModal(false)}>
      <div className='bg-white w-[450px] fixed inset-y-0 right-0 rounded-l-md' onClick={(ev) => ev.stopPropagation()}>
        <div className='border-b border-gray-100 flex items-center justify-between gap-8 p-4'>
          <h2 className='text-2xl font-bold'>Shopping Cart</h2>
          <button className='text-gray-500' onClick={() => setShowCartModal(false)}>
            Close
          </button>
        </div>
        <div className='p-4'>
          {cartItems.length === 0 ? (
            <p className='text-gray-500'>Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map((item: any) => (
                <li key={item.id} className='flex items-center justify-between border-b border-gray-100 py-2'>
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='p-4'>
          <Button href='/checkout'>Checkout</Button>
        </div>
      </div>
    </div>
  );
}
