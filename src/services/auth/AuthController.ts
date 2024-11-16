// importamos nuestra instancia de axios
import { apiInstance } from "../api";
// importamos nuestra respuesta generica del servidor 
//(usaremos el tipo T para nuestros modelos de respuesta)
import type { APIResponse } from "@/models/ApiResponseModel";
// importamos nuestros modelos de solicitud (credenciales)
import type { CredentialsModel } from "@/models/CredentialsModel";
// importamos nuestros modelos de respuesta 
import type { AuthApiResponseModel } from "@/models/AuthApiResponseModel";


// funcion para registrar nuevo usuario
export async function CreateUser(userData: CredentialsModel) {
    return await apiInstance.post<APIResponse<AuthApiResponseModel>>("auth/signup", userData)
}

// funcion para logearnos
export async function Login(credentials: CredentialsModel) {
    const response = await apiInstance.post<APIResponse<AuthApiResponseModel>>(
        "/auth/login", 
        credentials,
        {
            withCredentials: true // necesario para la obtenecion de cookies
        }
        ); 
        // seteamos la cookie en los headers para futuras consultas
        const setCookieHeader = response.headers['set-cookie'];
    return response 
}


// funcion para salir de la aplicacion
export async function Logout() {
    return await apiInstance.post<APIResponse<null>>("/auth/logout");
}



