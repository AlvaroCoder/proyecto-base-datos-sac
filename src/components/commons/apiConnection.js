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
export async function CREATE_BOOK(bodyData) {
    const session = await getSession();
    return await fetch(BASE_URL+"create/book",{
        method : "POST",
        headers : {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${session?.user?.access_token}`
        },
        body : JSON.stringify(bodyData),
        mode : 'cors'
    });
    
}
export async function DELETE_BOOK(idBook) {
    const session = await getSession();
    return await fetch(BASE_URL+`delete/book/${idBook}`,{
        method : "DELETE",
        headers : {
            'Authorization':`Bearer ${session?.user?.access_token}`
        },
        mode : 'cors'
    })
}
export async function CREATE_PAPER(data) {
    const session = await getSession();
    return await fetch(BASE_URL+`create/paper`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization':`Bearer ${session?.user?.access_token}`
        },
        body : JSON.stringify(data),
        mode : 'cors'
    })
}