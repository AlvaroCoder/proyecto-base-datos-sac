"use client"
import { getSession } from '@/authentication/lib';
import { useFetch } from '@/components/hooks/customHooks';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const URL_USERS=process.env.NEXT_PUBLIC_URL_USER;

export default function Page() {
    const{dataResponse : user, error, loading} = useFetch(URL_USERS)
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...user });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSave = () => {
      setUser({ ...formData });
      setIsEditing(false);
    };
  if (loading) {
    return <span>Cargando</span>
  }

  return (
   <section
    className='w-full min-h-screen p-8 '
   >
    <h1 className='text-guinda text-3xl font-bold'>Editar Perfil</h1>
     <div className="w-full mt-4 mx-auto p-6 rounded-md shadow-lg">
      <div className="flex items-center gap-4">
        <AccountCircleIcon
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Upload new photo
          </button>
          <p className="text-gray-500 text-sm mt-2">
            At least 800×800 px recommended. JPG or PNG is allowed.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
        <div className="bg-white rounded-lg p-4 shadow-md">
          {isEditing ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
   </section>
  );
}
