import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { DialogClose, DialogFooter } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Loader2 } from 'lucide-react';
import SaveIcon from '@mui/icons-material/Save';
import _ from "lodash";
import { useToast } from '../../ui/use-toast';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import DropdownMenuComponent from '@/components/elementos/dropdownComponent';
import { ButtonCloseDialog } from '@/components';
export default function DialogCreateUsuario({
  handleClickAddMember,
  dataCategoriesUser=[]
}) {
  const {toast} = useToast();
  const [visibilityPassword, setVisibilityPassword] = useState(false);

  const [dataDialog, setDataDialog] = useState({
    user_name : "",
    first_name : "",
    last_name : "",
    email : "",
    role : {
      id : 5,
      value : "Tesista"
    },
    phone : "",
    password : "",
    disabled : false
  });
  const [loadingData, setLoadingData] = useState(false);

  const handleChangeInput=(evt)=>{
    const target = evt.target;
    setDataDialog({
      ...dataDialog,
      [target.name] : target.value
    })
  }
  const handleChangeVisibilityPassword=()=>{
    setVisibilityPassword(!visibilityPassword);
  }
  const handleChangeRol=(data)=>{
    setDataDialog({
      ...dataDialog,
      role : data
    })
  }
  const handleClickSave=async()=>{
    
    console.log(dataDialog);
    
  }
  return (
    <section>
      <h1 className='font-bold  border-t-[1px] border-t-guindaOpaco pt-2'>Información de Usuario</h1>
      <div className='my-2'>
            <h1 className='font-bold'>Usuario</h1>
            <div className='flex flex-row'>
              <PersonIcon
                className='text-guinda mr-2'
              />
              <Input
                name="user_name"
                value={dataDialog.user_name}
                onChange={handleChangeInput}
                required
              />
            </div>
        </div>
        <div>
            <h1 className='font-bold'>Contraseña</h1>
            <div className='flex flex-row items-center justify-center'>
              <LockIcon
                className='text-guinda mr-2'
              />
            <div className='flex-1 relative'>
            <Input
              name="password"
              value={dataDialog.password}
              onChange={handleChangeInput}
              type={visibilityPassword?"text" : "password"}
            />
            {
              visibilityPassword ? 
              <p><VisibilityOffIcon
                onClick={handleChangeVisibilityPassword}
                className='text-guinda absolute top-2 right-4 cursor-pointer'
              /></p> : 
              <p><RemoveRedEyeIcon 
                onClick={handleChangeVisibilityPassword}
                className='text-guinda absolute top-2 right-4 cursor-pointer'
              /></p>
            }
            </div>
            </div>
        </div>
        <h1 className='font-bold mt-4 border-t-[1px] border-t-guindaOpaco pt-2'>Información Personal</h1>
        <div className='grid grid-cols-2 gap-2'>
            <div>
              <h1 className='font-bold'>Nombre</h1>
              <Input
                name="first_name"
                value={dataDialog.first_name}
                onChange={handleChangeInput}
                required
              />
            </div>
            <div>
              <h1 className='font-bold'>Apellido</h1>
              <Input
                name="last_name"
                value={dataDialog.last_name}
                onChange={handleChangeInput}
                required
              />
            </div>
        </div>
        <div>
            <h1 className='font-bold'>Email</h1>
            <Input
              name="email"
              value={dataDialog.email}
              onChange={handleChangeInput}
              type="email"
              required
            />
        </div>
        <section className='flex flex-row items-center'>
          <div className='flex-1'>
              <h1 className='font-bold'>Telefono</h1>
              <Input
                name="phone"
                value={dataDialog.phone}
                onChange={handleChangeInput}
                type="number"
              />
          </div>
          <div className='w-32 ml-2'>
            <h1 className='font-bold'>Categoria</h1>
            <DropdownMenuComponent
              data={dataCategoriesUser}
              initialValue={dataDialog?.role}
              changeData={handleChangeRol}
            />
          </div>
        </section>
      <ButtonCloseDialog
        textButton='Guardar Registro'
        handleClickSave={handleClickSave}
      />
    </section>
  )
}
