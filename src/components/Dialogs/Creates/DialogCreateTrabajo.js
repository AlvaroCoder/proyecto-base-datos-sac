import React, { useRef, useState } from 'react'
import { useToast } from '../../ui/use-toast'
import { Input } from '../../ui/input';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { DialogClose, DialogFooter } from '../../ui/dialog';
import { Loader2 } from 'lucide-react';
import SaveIcon from '@mui/icons-material/Save';
import { CREATE_TRABAJOS } from '../../commons/apiConnection';
import DropdownMenuComponent from '@/components/elementos/dropdownComponent';


export default function DialogCreateTrabajo({
  dataCourse=[],
  handleClickSaveRegister
}) {  
  const  {toast} = useToast();
  const refNumberYear = useRef(null);

  const [loadingData, setLoadingData] = useState(false);
  const [dataDialog, setDataDialog] = useState({
    title : '',
    course : dataCourse[0],
    year : "",
    link : ""
  });
  const semesters=[
    {id : 1, value : "I"},
    {id : 2, value : "II"},
    {id : 3, value : "Verano"},
  ]
  const [semesterSelected, setSemesterSelected] = useState(semesters[0]);

  const handleChangeInput=(evt)=>{
    const target = evt.target;
    setDataDialog({
      ...dataDialog,
      [target.name] : target.value
    })
  }
  const handleClickSave =async()=>{
    const year = String(refNumberYear.current.value) + "-" + semesterSelected.value
    const jsonToSend={
      ...dataDialog,
      year
    }
    
    console.log(jsonToSend);
        // const response = await CREATE_TRABAJOS(jsonToSend);
    
    
  }
  const handleChangeDropdownSemester=(idSemester)=>{
    const jsonSelected = semesters.filter(item=>item.id == idSemester)[0];
    setSemesterSelected(jsonSelected)
  }
  const handleChangeDropdownCourse=(idCourse)=>{
    const idSelected = dataCourse.filter(item=>item.id === idCourse)[0]?.id
    setDataDialog({
      ...dataDialog,
      course : idSelected
    })    
    
  }
  return (
    <section  >
      <div className='my-2'>
        <h1 className='font-bold'>Titulo</h1>
        <Input
          name="title"
          value={dataDialog.title}
          onChange={handleChangeInput}
          required
        />
      </div>
      <section
        className='flex flex-row items-center'
      >
        <div className='flex-1'>
          <h1 className='font-bold'>Link</h1>
          <Input
            name="link"
            value={dataDialog.link}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className='ml-2 min-w-40'>
          <h1 className='font-bold'>Curso</h1>
          <DropdownMenuComponent
            data={dataCourse}
            initialValue={dataDialog?.course}
            changeData={(data)=>
              setDataDialog({
                ...dataDialog,
                course : data
              })
            }
          />
        </div>
      </section>
      <div className='flex flex-row w-full items-center'>
        <div className='mr-2 flex-1'>
            <h1 className='font-bold'>Año</h1>
            <Input
              className="w-full "
              type="number"
              ref={refNumberYear}
              required
            />
        </div>
        <div className='flex flex-col justify-center'>
            <h1 className='font-bold'>Semestre</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full border-gray-100 border-[1px] shadow-sm"
                  >
                  <span>{semesterSelected.value}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {
                  semesters.map(item=>
                    <DropdownMenuCheckboxItem 
                      key={item.id}
                      className="capitalize"
                      checked={item.id === semesterSelected.id}
                      onCheckedChange={()=>handleChangeDropdownSemester(item.id)}
                    >
                      {item.value}
                    </DropdownMenuCheckboxItem>
                  )
                }
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
      <DialogFooter className='flex flex-row items-center my-4'>
        <DialogClose asChild>
            <Button
             className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
              onClick={handleClickSave}
            >
              {loadingData ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <><SaveIcon/><span className='ml-2'>Guardar Registro</span></>}
            </Button>
        </DialogClose>
      </DialogFooter>
    </section >
  )
};