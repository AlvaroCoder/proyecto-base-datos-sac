import { getSession } from "@/authentication/lib"

const BASE_URL = "http://127.0.0.1:8000/"

// CRUD de miembros
export async function GET_LINK_FORM(data) {
    const session = await getSession();
    return await fetch(BASE_URL+`login/get_link_form`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(data)
    })
}

export async function REGISTER_MEMBER(dataMember) {
    const session = await getSession();
    return await fetch(BASE_URL+`login/register`,{
        method : 'POST',
        headers : {
            'Content-Type' :'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(dataMember)
    })
}
// CRUD EQUIPOS
export async function CREATE_EQUIPO(data) {
    const session = await getSession();
    return await fetch(BASE_URL+`create/equipment`,{
        method : 'POST',
        headers : {
            'Content-Type':'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(data)
    })
}

export async function UPLOAD_IMAGE_EQUIPO(data) {
    const session = await getSession();
    return await fetch(BASE_URL+`create/equipment_evidence`,{
        method : 'POST',
        headers : {
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : data
    })
}

export async function UPDATE_EQUIPO(data) {
    const session =  await getSession();
    return await fetch(BASE_URL+`update/equipment`,{
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(data)
    })
}

export async function DELETE_EQUIPO(idDeleteData) {
    const session = await getSession();
    return await fetch(BASE_URL+`delete/equipment/${idDeleteData}`,{
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
    })
}

// CRUD DE PAPER
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

export async function DELETE_PAPER(idPaper) {
    const session = await getSession();
    return await fetch(BASE_URL+`delete/paper/${idPaper}`,{
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors'
    })
}

export async function UPDATE_PAPER(data) {
    const session = await getSession();
    return await fetch(BASE_URL+'update/paper',{
        method : 'UPDATE',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(data)
    })
}

// CRUD DE LIBROS
export async function UPDATE_BOOKS(bodyData) {
    const session = await getSession();
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

// CRUD DE TRABAJOS
export async function CREATE_TRABAJOS(data) {
    const session = await getSession();
    return await fetch(BASE_URL+`create/trabajo`,{
        method : 'POST',
        headers : {
            'Content-Type':'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(data)
    })
}

export async function UPDATE_TRABAJOS(dataUpdateTrabajos) {
    const session = await getSession();
    return await fetch(BASE_URL+`update/trabajo`,{
        method : 'PUT',
        headers : {
            'Content-Type':'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(dataUpdateTrabajos)
    })
}

export async function DELETE_TRABAJOS(idTrabajos) {
    const session = await getSession();
    return await fetch(BASE_URL+`delete/trabajo/${idTrabajos}`,{
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors'
    })
}

// CRUD DE PROYECTOS
export async function CREATE_PROYECTS(dataProjects) {
    const session = await getSession();
    return await fetch(BASE_URL+`create/project`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(dataProjects)
    })
}

export async function UPDATE_PROYECTS(dataProjects) {
    const session = await getSession();
    return await fetch(BASE_URL+`update/project`,{
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors',
        body : JSON.stringify(dataProjects)
    })
}

export async function DELETE_PROYECT(idProject) {
    const session = await getSession();
    return await fetch(BASE_URL+`delete/project/${idProject}`,{
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${session?.user?.access_token}`
        },
        mode : 'cors'
    })
}



