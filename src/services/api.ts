// importamos axios
import axios from 'axios'

// en caso de que nuestra app tenga autenticacion con el crfs token podemos conseguir
// el mismo antes de la creacion de la instancia
const csrfToken = await axios.get(import.meta.env.VITE_API_ENDPOINT+'auth/csrf', {withCredentials: true})

// creamos una instancia en una variable constante que exportaremos
// donde usamos el metodo create de axios y 
// pasamos nuestra variable de entorno como url base
export const apiInstance = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    headers: {
        'csrf-token': csrfToken.data.csrfToken
    },
})

















