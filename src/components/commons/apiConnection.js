import { getSession } from "@/authentication/lib"

const BASE_URL = "http://127.0.0.1:8000/"
export async function UPDATE_BOOKS(bodyData) {
    const session = await getSession();
    console.log(session);

    return await fetch(BASE_URL+"update/book",{
        method : "PUT",
        body : JSON.stringify(bodyData),
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },  
        mode : 'cors'

    })
}