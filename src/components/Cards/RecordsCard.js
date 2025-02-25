import React from 'react'

export default function RecordsCard({dataRecords=[]}) {
    console.log(dataRecords);
    
  return (
    <div className='w-full h-40 mb-5 border border-neutral-500 p-4 rounded-lg shadow-lg flex justify-center items-center mt-4'>
        {
           dataRecords?.length > 0 ?
           dataRecords?.map(item,key=> <p key={key}></p>)
           : 
          <p>No hay notificaciones</p>
        }
    </div>
  )
}