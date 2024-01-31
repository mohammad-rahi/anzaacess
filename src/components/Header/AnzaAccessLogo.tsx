import Image from 'next/image';
import React from 'react';

const AnzaAccessLogo = () => {
  return (
    <div className='relative aspect-[16/9] w-24'>
      <Image
        src="/anzaacess_logo.png"
        alt='AnzaAccess Logo'
        fill
        objectFit='cover'
      />
    </div>
  );
};

export default AnzaAccessLogo;
