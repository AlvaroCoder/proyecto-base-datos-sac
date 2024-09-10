import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey=process.env.NEXT_PUBLIC_SECRET_TOKEN;
const URL_REGISTER_USER=process.env.REGISTER_USER;
const URL_LOGIN_USER=process.env.LOGIN_USER;

const key=new TextEncoder().encode(secretKey)
export async function encrypt(payload) {
    return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input){
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  }

export async function login(formData) {
    const expires = new Date(Date.now() + 10 * 1000);

    const response= await fetch(URL_LOGIN_USER,{
        method : 'POST',
        body : formData
    });
    const responseJson = await response.json();
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