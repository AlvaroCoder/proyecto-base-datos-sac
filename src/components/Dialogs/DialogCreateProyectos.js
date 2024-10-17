import React, { useState } from 'react'
import { useToast } from '../ui/use-toast'

export default function DialogCreateProyectos({
  
}) {
  const  {toast} = useToast();
  const [loadingData, setLoadingData] = useState(false);
  const [dataDialog, setDataDialog] = useState({
    title : ""
  });
  return (
    <div>

    </div>
  )
}
