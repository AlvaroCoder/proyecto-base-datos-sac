import Image from 'next/image'
import React from 'react'

const URL_IMG_UDEP = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319328/udep_logo_eqcizp.png";
const URL_IMG_LABSAC = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319348/logo_lab_sac_guinda_xefpo1.png";

export default function TopBarDashboard() {
  return (
    <div className='h-24 w-full bg-white shadow-lg flex flex-row py-4'>
        <div className='ml-4'>
            <Image
                src={URL_IMG_UDEP}
                alt='Imagen Logo UDEP'
                width={200}
                height={100}
                
            />
        </div>
        <div className='ml-4'>
            <Image
                src={URL_IMG_LABSAC}
                alt='Imagen Logo UDEP'
                width={200}
                height={100}
            />
        </div>
    </div>
  )
};
