import React, { useState } from 'react'
import { Input } from '../ui/input';
import Image from 'next/image';
import UploadIcon from '@mui/icons-material/Upload';

export default function formUploadImage({
  previewImage=null,
  handleChange,
}) {
    const [preview, setPreview] = useState(previewImage);
    const [image, setImage] = useState(null)
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Generamos una URL para la vista previa de la imagen
        setPreview(URL.createObjectURL(file));
        setImage(file);
      }
      handleChange(file)
    };
  return (
    <div className="w-full">
      <section
        className='space-y-2 text-sm w-full'
      >
      <Input
        id="picture"
        type="file"
        placeholder="Imagen"
        accept="image/*"
        onChange={handleImageChange}
      />
      </section>
      {
        preview?
        <Image
          src={preview}
          width={100}
          height={100}
          alt='Imagen de previsualizacion'
          className="w-full rounded-lg mt-2 h-40 object-cover  border-2 border-gray-300"
          />:
        <div  className="w-full mt-2 shadow-sm h-40 flex items-center rounded-lg justify-center bg-gray-100 text-gray-400 hover:bg-gray-50  border-2 border-dashed border-gray-300">
          <span><UploadIcon className='opacity-50'/> Subir Imagen</span>
        </div>
      }
    </div>
  )
};