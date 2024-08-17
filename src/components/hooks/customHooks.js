'use client'
import { useEffect, useState } from "react";
export  function useFetch(url) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [dataResponse, setDataResponse] = useState(null);
    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Something went wrong with server!")
                
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                setDataResponse(jsonResponse);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[url])
    return { dataResponse, loading, error }
}