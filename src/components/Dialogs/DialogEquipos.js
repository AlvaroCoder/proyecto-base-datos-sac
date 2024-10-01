import React from 'react'
import { Input } from '../ui/input'

export default function DialogEquipos({
    dataDialog,
    handleChangeExistChanges,
    setDataDialog : setDataDialogEquipos,
}) {
    const handleChangeTitleDialog=()=>{
        const inputValue = evt.target.value;
        if (inputValue !== dataDialog.title) {
            handleChangeExistChanges()
        }
        setDataDialogEquipos({
            ...dataDialog,
            title : inputValue
        })
    }
  return (
    <section>
        <div className='my-2'>
            <h1>Titulo</h1>
            <Input
                name="title"
                value={dataDialog?.title}
                onChange={handleChangeTitleDialog}
            />
        </div>
    </section>
  )
};
