// importamos nuestra instancia de axios
import { apiInstance } from "../api";
// importamos nuestra respuesta generica del servidor 
//(usaremos el tipo T para nuestros modelos de respuesta)
import type { APIResponse } from "@/models/ApiResponseModel";
// importamos nuestros modelos de solicitud (create task)
import type { CreateTask } from "@/models/TaskRequestModels";
// importamos nuestros modelos de respuesta 
import type { TaskApiResponse } from "@/models/TaskApiResponseModel";

// post create task
export async function createTask(task: CreateTask) {
    return await apiInstance.post<APIResponse<TaskApiResponse>>('/task', task)
}

// get all tasks
export async function getTasks() {
    return await apiInstance.get<APIResponse<TaskApiResponse[]>>('/task')
}

// get single task
export async function getTask(id: number) {
    return await apiInstance.get<APIResponse<TaskApiResponse>>(`/task/${id}`)
}

// put update task
export async function updateTask(id: number, task: CreateTask) {
    return await apiInstance.put<APIResponse<TaskApiResponse>>(`/task/${id}`, task)
}

// delete task
export function deleteTask(id: number) {
    return apiInstance.delete(`/task/${id}`)
}


