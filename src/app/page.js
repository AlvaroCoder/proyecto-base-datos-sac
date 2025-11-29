"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import BookIcon from '@mui/icons-material/Book';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const URL_IMG_UDEP = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319328/udep_logo_eqcizp.png";
const URL_IMG_LABSAC = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319348/logo_lab_sac_guinda_xefpo1.png";
const URL_IMG_SAC_DASHBOARD = "https://res.cloudinary.com/dabyqnijl/image/upload/v1727218255/Screenshot_2024-09-24_at_17.48.39_y6ohso.png"

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const principalFeatures = [
    { title: "Gestión de Libros", icon: BookIcon, desc: "Control de inventario bibliográfico." },
    { title: "Gestión de Papers", icon: ListAltIcon, desc: "Repositorio de investigaciones." },
    { title: "Gestión de Equipos", icon: ComputerIcon, desc: "Administración de hardware." },
    { title: "Gestión de Usuarios", icon: PersonIcon, desc: "Control de accesos y roles." },
    { title: "Gestión de Proyectos", icon: LightbulbIcon, desc: "Seguimiento de iniciativas." },
    { title: "Gestión de Trabajos", icon: BookIcon, desc: "Registro de tesis y trabajos." },
  ];

  return (
    <main className="w-full min-h-screen flex flex-col bg-gray-50/50">
      
      <header className="w-full h-24 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Image
              src={URL_IMG_UDEP}
              alt='Logo UDEP'
              width={160}
              height={80}
              className="object-contain h-12 w-auto"
            />
            <div className="h-8 w-[1px] bg-gray-300 hidden sm:block"></div>
            <Image
              src={URL_IMG_LABSAC}
              alt='Logo LABSAC'
              width={160}
              height={80}
              className="object-contain h-12 w-auto"
            />
          </div>
          <Link 
            href="/dashboard"
            className="hidden md:block text-guinda font-semibold hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
          >
            Acceder
          </Link>
        </div>
      </header>

      <section className="w-full flex flex-col items-center pt-16 pb-12 px-4 overflow-hidden">
        <div className={`flex flex-col items-center transition-all duration-1000 ease-out transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-guinda font-semibold tracking-wider uppercase text-sm mb-4 bg-red-50 px-3 py-1 rounded-full">
            Laboratorio de SAC
          </span>
          <h1 className="font-extrabold text-4xl md:text-6xl max-w-4xl text-center text-gray-900 leading-tight">
            Gestión interna del <span className="text-guinda">Laboratorio</span> de la UDEP
          </h1>
          <p className="text-center text-gray-600 text-lg md:text-xl max-w-2xl mt-6 leading-relaxed">
            Plataforma centralizada para gestionar, monitorear y optimizar los recursos e información académica del laboratorio.
          </p>
          
          <Link
            className="mt-8 bg-guinda text-white font-medium text-lg px-8 py-3 rounded-full shadow-lg shadow-red-900/20 hover:bg-red-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            href={"/dashboard"}
          >
            Ir al Dashboard
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="relative w-full max-w-5xl mt-16 z-10 group">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-guinda/30 rounded-full blur-[100px] -z-10 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}></div>
          
          <div className={`relative bg-white p-2 rounded-xl shadow-2xl border border-gray-200 transition-all duration-1000 delay-200 transform ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Image
              className="rounded-lg w-full h-auto object-cover"
              alt="Vista previa Dashboard SAC"
              src={URL_IMG_SAC_DASHBOARD}
              width={1200}
              height={800}
              priority
            />
          </div>
        </div>
      </section>

      <section className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900">Características del Sistema</h2>
            <p className="text-gray-500 mt-4 text-lg">Todo lo que necesitas para administrar el laboratorio en un solo lugar</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {principalFeatures.map(({ title, icon: IconFeature, desc }, index) => (
              <div 
                key={title} 
                className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-guinda/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-guinda transition-colors duration-300">
                  <IconFeature 
                    className="text-guinda group-hover:text-white transition-colors duration-300" 
                    sx={{ fontSize: 30 }} 
                  />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full bg-guinda py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-white/80">
          <div className="mb-4 md:mb-0">
            <p className="font-medium text-white">Laboratorio de Sistemas Automáticos de Control</p>
            <p className="text-sm mt-1">Universidad de Piura</p>
          </div>
          <p className="text-sm font-light">
            © {new Date().getFullYear()} Desarrollado por <span className="font-medium text-white"><a href="https://www.alvacode.dev/">AlvaCode</a></span>
          </p>
        </div>
      </footer>
    </main>
  );
}