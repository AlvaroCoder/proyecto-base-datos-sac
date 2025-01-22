'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react';
import React, { useState } from 'react'
function CopyButton({ textToCopy }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy); // Copia el texto al portapapeles
      setIsCopied(true);

      // Restablece el estado después de 2 segundos
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar al portapapeles:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      {isCopied ? '¡Copiado!' : 'Copiar al portapapeles'}
    </button>
  );
}
export default function Page() {
  const params = useSearchParams();
  const link = params.get('link');
  console.log(link);
  
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <section
        className='p-8 rounded-lg bg-gray-50 shadow-lg flex flex-col justify-center items-center'
      >
        <h1 className='font-semibold mb-4'>LINK DE FORMULARIO</h1>
        <QRCodeSVG
          value={link}
          width={200}
          height={200}
        />
        <div className='mt-2'>
        <CopyButton
          textToCopy={link}
        />
        </div>
      </section>
    </div>
  )
};