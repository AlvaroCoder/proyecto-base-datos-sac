import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';

export default function listCardsShortPerson({
    data=[],
    handleClickClearMember
}) {
  return (
    <div className='w-full rounded-lg flex flex-wrap gap-x-4 gap-y-2 items-center'>
      {
        data?.map((item, idx)=>{
          return(
            <p 
            key={idx}
            className='p-2 border border-gray-200 hover:bg-gray-100 rounded-lg w-fit text-nowrap'>
              <span className='mr-2 px-2'>
                {item?.first_name}, {item?.last_name}
                <ClearIcon
                  className='cursor-pointer ml-2'
                  onClick={()=>handleClickClearMember(idx)}
                />
              </span>
            </p>
          )
        })
      }      
    </div>
  )
};