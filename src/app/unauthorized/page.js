import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-4">
        <h1 className="text-3xl font-bold text-guinda">Acceso no autorizado</h1>
        <p className="text-lg text-gray-700">No tienes permisos para acceder a esta página.</p>
      </div>
    </div>
  )
}
