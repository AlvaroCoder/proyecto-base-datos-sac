"use client"
import React, { useState } from 'react'
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';


export default function BotonNavegacion({loading, children}) {
  return (
    <Button
    type="submit"
    className="w-full  cursor-pointer bg-guinda rounded-lg py-6 mt-4 text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'"
    disabled={loading}
    >
        <p >
            {loading ?  <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : children}        </p> 
    </Button>
  )
}
