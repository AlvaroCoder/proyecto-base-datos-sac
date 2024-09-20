"use server"
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey=process.env.SECRET_TOKEN;
const URL_REGISTER_USER=process.env.REGISTER_USER;
const URL_LOGIN_USER="http://127.0.0.1:8000/login";

const key=new TextEncoder().encode(secretKey)
export async function encrypt(payload) {
    return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + 10 * 60 * 1000))
    .sign(key);
}

export async function decrypt(input){
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  }

export async function login(dataUser) {
    
    const formData = new URLSearchParams()
    formData.append("username",String(dataUser?.username));
    formData.append("password",String(dataUser?.password));
    
    const response= await fetch(URL_LOGIN_USER,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : formData
    });
    
    if (!response.ok) {
       const rpta = await response.json();       
        return {
            error : true,
            message : rpta?.detail
        }
    }
    const responseJson = await response.json();

    const expires = new Date(Date.now() + 10 * 60 * 1000); 
    const user = {username : formData.get("username"), access_token : responseJson?.access_token, refresh_token : responseJson?.refresh_token, token_type : responseJson?.token_type};
    const session = await encrypt({user, expires});
    cookies().set("session",session, {expires, httpOnly : true});
    
    return {
        error : false,
        message : "Ingreso exitoso"
    }
}
export async function logout() {
    cookies().set("session", "", {expires:new Date(0)})
}
export async function getSession() {
    const session = cookies().get("session")?.value;
    if(!session) return null;
    return await decrypt(session);
}
export async function signUp(dataUser) {
    const response = await fetch(URL_REGISTER_USER,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(dataUser)
    });
    const responseJson = await response.json();
    if(responseJson?.detail){
        return {
            error : true,
            message : "El usuario ya existe"
        }
    }
    return {
        error : false,
        message : responseJson
    }
}
export async function updateSession(request) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;
  
    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return res;
  }
  