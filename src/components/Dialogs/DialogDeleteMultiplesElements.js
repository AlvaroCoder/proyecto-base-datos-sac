import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

import DeleteIcon from '@mui/icons-material/Delete';

export default function DialogDeleteMultiplesElements({elements=[]}) {
    const handleClickDeleteElements=()=>{

    }
  return (
   <Dialog>
    <DialogTrigger asChild>
    <Button 
        className="border border-gray-400 rounded-md"
        variant="ghost"><p>Elminar elemento(s)</p><DeleteIcon/></Button>
    </DialogTrigger>
    <DialogContent>
        <DialogTitle>Eliminar elementos</DialogTitle>
        <DialogDescription>Estas seguro de eliminar los siguientes elementos, ten en cuenta que no se volverán a recuperar los datos:</DialogDescription>
        <section>
            {
                elements.map((item,key)=><article 
                    key={key}
                    className='w-full shadow-sm rounded-sm p-4'
                    >
                    <h1 className=''>{item?.title}</h1>
                    </article>)
            }
            <Button
                className='w-full cursor-pointer mr-2 bg-guinda rounded-lg py-4 mt-6 text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
                onClick={handleClickDeleteElements}
            >
                <p className='font-bold'>Eliminar</p><DeleteIcon/>
            </Button>
        </section>
    </DialogContent>
   </Dialog>
  )
}
