// importamos los metodos de nuestros controladores
import { Login, CreateUser, Logout } from "./auth/AuthController";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "./task/TaskController";

// exportamos una variable que tiene todos los metodos,
// de esa manera llamando a la variable podemos acceder a todos los metodos
export const API = {
    // metodos auth
    Login,
    CreateUser,
    Logout,

    // metodos task
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask
}

