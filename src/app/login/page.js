"use client"
import { FormularioUsuario } from "@/components";
import Image from "next/image";

const URL_IMG_UDEP = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319328/udep_logo_eqcizp.png";
const URL_IMG_LABSAC = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319348/logo_lab_sac_guinda_xefpo1.png";
export default function Page() {
  return (
    <div className="w-full min-h-screen bg-guinda flex flex-col items-center ">
    <div className="w-full h-24 py-4 bg-white flex flex-row items-center  justify-evenly">
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
      <div  className="w-full py-4 flex flex-col justify-center items-center mt-6">
        <h1 className="text-white font-bold text-3xl mb-4">Base de Datos</h1>
        <FormularioUsuario/>
        <p className="text-white mt-2 hover:underline">Olvidaste la contraseña?</p>
      </div>
    </div>
  )
}
