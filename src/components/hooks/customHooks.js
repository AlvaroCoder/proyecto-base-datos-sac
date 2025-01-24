'use client'
import { getSession } from "@/authentication/lib";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
export  function useFetch(url) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [dataResponse, setDataResponse] = useState(null);
    const [sessionUser, setSessionUser] = useState(null);
    useEffect(()=>{
        async function fetchData() {
            try {
                const session = await getSession();
                
                setSessionUser(session);
                const response = session ? await fetch(url, {headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${session?.user?.access_token}`,
                    
                }, mode : 'cors'})  :  await fetch(url);
                
                if (!response.ok) {
                    const jsonResponse = await response.json();
                    setError(jsonResponse?.detail);
                    return;
                };
                
                const jsonResponse = await response.json();          
                      
                setDataResponse(jsonResponse);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[url])
    return { dataResponse, loading, error, sessionUser}
}

export function useSession() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataSession, setDataSession] = useState(null);
    useEffect(()=>{
        async function getSessionData() {
            try {
                const session = await getSession();
                const token = session?.user?.access_token;
                const decode_jwt = jwt.decode(token);

                setDataSession(decode_jwt);
            } catch (err) {
                setError(err);
            }finally{
                setLoading(false);
            }
        }
        getSessionData();
    },[]);
    return {dataSession, loading, error}
}