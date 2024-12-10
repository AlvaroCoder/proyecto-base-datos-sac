"use client"

import Image from "next/image";
import Link from "next/link";

import BookIcon from '@mui/icons-material/Book';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { useEffect, useState } from "react";

const URL_IMG_UDEP = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319328/udep_logo_eqcizp.png";
const URL_IMG_LABSAC = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319348/logo_lab_sac_guinda_xefpo1.png";
const URL_IMG_SAC_DASHBOARD="https://res.cloudinary.com/dabyqnijl/image/upload/v1727218255/Screenshot_2024-09-24_at_17.48.39_y6ohso.png"
  
export default  function Home() {
  const [visibleDashboardImage, setVisibleDashboardImage] = useState(false);
  useEffect(()=>{
    setVisibleDashboardImage(true)
  },[])
  const principalFeatures = [
    {title : "Gestión de Libros", icon : BookIcon},
    {title : "Gestión de Papers", icon : ListAltIcon},
    {title : "Gestión de Equipos", icon : ComputerIcon},
    {title : "Gestión de Miembros", icon : PersonIcon},
    {title : "Gestión de Proyectos", icon : LightbulbIcon},
    {title : "Gestión de Trabajos", icon : BookIcon},
  ]
  return (
    <main className="w-full min-h-screen flex flex-col items-center ">
      <div className="w-full h-20 shadow-sm flex flex-row items-center">
        <div className="ml-4">
          <Image
            src={URL_IMG_UDEP}
            alt='Imagen Logo UDEP'
            width={200}
            height={100}
          />
        </div>
        <div className="ml-4">
          <Image
            src={URL_IMG_LABSAC}
            alt='Imagen Logo UDEP'
            width={200}
            height={100}
          />
        </div>
      </div>
      <section className="w-full min-h-screen flex flex-col justify-center pt-12">
        
        <div className="relative flex flex-col items-center ">
          <h1 className="font-bold text-6xl w-[600px] text-center z-20">Gestión interna del laboratorio de SAC de la UDEP</h1>
          <p className="text-center text-lg w-[600px] my-8 z-20">Plataforma centrada en gestionar y monitorear la información interna del laboratorio de SAC de la Universidad de Piura. </p>
          <Link
            className="bg-guinda mt-4  h-9 p-6 px-6 hover:bg-red-800 w-fit flex flex-row items-center text-white rounded-lg text-lg "
            href={"/dashboard"}
              >
            Ver Dashboard
          </Link>
        </div>
        <div className=" relative w-full min-h-[500px] flex items-center justify-center mt-10 z-20">
          <div className={`absolute bg-guinda h-[500px] w-[500px]  z-0 rounded-full filter blur-2xl ease-in-out transition-opacity duration-1000 ${visibleDashboardImage ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className={`z-30 bg-white rounded-lg shadow-lg h-fit  ease-in-out transition-opacity duration-500 ${visibleDashboardImage ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              className={`object-cover z-20 p-4 rounded-lg ease-in-out transition-opacity duration-500 ${visibleDashboardImage ? 'opacity-100' : 'opacity-0'}`}
              alt="Imagen dashboard SAC "
              src={URL_IMG_SAC_DASHBOARD}
              width={800}
              height={600}
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-32">
          <h1 className="font-bold text-3xl">Características del Software</h1>
          <p>Principales características de la plataforma</p>
          <div className="w-[600px] p-4 mt-4 flex flex-row  flex-wrap gap-x-8 gap-y-20 items-center">
            {
              principalFeatures.map(({title, icon : IconFeature})=>(<div key={title} className="w-40 flex flex-col items-center justify-center">
                <div className="p-2 shadow-sm rounded-lg flex justify-center items-center text-6xl w-24">
                  <IconFeature className=" text-guinda" fontSize="20px"/>
                </div>
                <h1 className="mt-4">{title}</h1>
              </div>))
            }
          </div>
        </div>
      </section>
      <footer className="h-32 flex items-center justify-center bg-guinda w-full mt-32">
            <p className="text-gray-300">@ Derechos reservados a COSAI</p>
      </footer>
    </main>
  );
}
