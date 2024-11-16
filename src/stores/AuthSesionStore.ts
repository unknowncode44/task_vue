// TODO: RENOVAR TOKEN


import { defineStore } from "pinia";
// utilizaremos router para navegar a la pagina de tareas cuando nos hayamos loggeado
import router from "@/router";

// importamos modelos con los que trabajaremos
import type { SesionStateModel } from "@/models/SesionStateModel";
import type { CredentialsModel } from "@/models/CredentialsModel";

// importamos nuestro indice de metodos CRUD
import { API } from "@/services";
import { apiInstance } from "@/services/api";


export const useSesionStore = defineStore({
    id: "sesion",
    state: (): SesionStateModel => ({
        loading: false,
        // nuestro estado inicial no tendra datos
        data: {
            user: undefined,
            crsfToken: undefined,
            jwtExpires: undefined
        },
        error: ''
    }),
    actions: {
        // accion cambia en nuestro estado nuestro token crsf
        changeCrsfToken() {
            const headers = apiInstance.defaults.headers // obtenemos los headers de nuestra instancia apiInstance
            this.data!.crsfToken = headers["csrf-token"]?.toString() // pareaseamos a string el token y actualizamos el estado
            console.info('[SesionStore] CRSF Token Actualizado') // noficamos por consola
        },

        // accion asincrona para registrar un nuevo usuario
        async registerUser(userData: CredentialsModel) {
            this.loading = true; // como es un proceso asincrono, indicamos que estamos cargando
            try {
                const response = await API.CreateUser(userData) // la constante response sera la respuesta de nuestra solicitud

                if(response.status === 201) {
                    this.data!.user = userData // si la respuesta es exitosa, actualizamos el estado con el usuario
                    console.info('[Sesion Store] Usuario Creado, codigo de respuesta: '+response.status)
                    this.login(userData) // luego corremos nuestro metodo login para logearlo directamente
                    this.loading = false // detenemos la carga
                }
            } catch (e) {
                // si tenemos errores los manejamos por consola y actualizamos nuestro estado con el error
                console.error('[Sesion Store] Error al registrar usuario', e)
                this.error = e!.toString()
            }
        },

        // accion asincrona para logear usuario
        async login(userData: CredentialsModel) {
            this.loading = true; // como es un proceso asincrono, indicamos que estamos cargando
            try {
                // la constante response sera la respuesta de nuestra solicitud
                const response = await API.Login(userData)
                if(response.status === 200) {
                    this.data!.user = userData // si la respuesta es exitosa, actualizamos el estado con el usuario
                    const currentEpochTime = Math.floor(Date.now() / 1000) // obtenemos la fecha actual
                    this.data!.jwtExpires = currentEpochTime + 3 * 60 // nuestro token vence en tres minutos, actualizamos el estado
                    console.info('[Sesion Store] Usuario Logeado, codigo de respuesta: '+response.status)
                    console.info('[Sesion Store] Ruteando a Tareas')
                    this.loading = false
                    router.push('/tasks')
                }
            } catch (e) {
                // si tenemos errores los manejamos por consola y actualizamos nuestro estado con el error
                console.error('[Sesion Store] Error al loggear al usuario', e)
                this.error = e!.toString()
            }
        }
    }
})