import React, { useState } from 'react'
import { Input } from '../ui/input'
import { extraerDataSinRepetir } from '../commons/tableFunctions';
import { Button } from '../ui/button';

export default function DialogProyectos({
  initialDataDialog,
  dataDialog : dataDialogProyectos, 
  handleChangeExistChanges,
  setDataDialog : setDataDialogProyectos,
  dataCoordinator=[],
}) 
{
  console.log(dataCoordinator);
  
  const [mostrarDropdownCoordinador, setMostrarDropdownCoordinador] = useState(false);
  
  const [filterSearchCoordinator, setFilterSearchCoordinator] = useState(dataCoordinator);


  const handleChangeInput=(evt, keyValue)=>{
    const inputValue = evt.target.value;
    if (inputValue!==dataDialogProyectos[keyValue]) {
      handleChangeExistChanges();
    }
    setDataDialogProyectos({
      ...dataDialogProyectos,
      [keyValue] : inputValue
    })
  }
  return (
    <section className='max-h-[400px] h-full overflow-auto py-2 px-2'>
      <div className='my-2'>
        <h1>Proyectos</h1>
        <Input
          name="project"
          value={dataDialogProyectos?.project}
          onChange={evt=>handleChangeInput(evt, "project")}
        />
      </div>
      <div className='my-2'>
        <h1>Coordinador</h1>
        <Input
          name="coordinator"
          value={dataDialogProyectos?.coordinator}
          onChange={(evt)=>{
            handleChangeInput(evt, "coordinator");
            setMostrarDropdownCoordinador(evt.target.valie !== initialDataDialog?.coordinator)
            setFilterSearchCoordinator(dataCoordinator.filter(item=>item.toUpperCase().includes(evt.target.value.toUpperCase())))
          }}
          required
        />
        {
          (mostrarDropdownCoordinador && filterSearchCoordinator.length > 0) &&
          <div className='absolute mt-2 z-10 shadow-lg rounded-lg p-2 bg-white w-full'>
            {
              filterSearchCoordinator.map((item,key)=>{
                if (idx < 4) {
                    return (
                      <Button
                        key={key}
                        className="w-full"
                        variant="ghost"
                        onClick={(evt)=>{
                          evt.preventDefault();
                          setDataDialogProyectos({
                            ...dataDialogProyectos,
                            coordinator : item
                          });
                          setMostrarDropdownCoordinador(false);
                        }}
                      >
                        {item}
                      </Button>
                    )
                }
                return null;
              })
            }
          </div>
        }
      </div>
    </section>
  )
}
