import { defineStore } from "pinia";
// importamos nuestros modelos de tareas
import type { Task, TaskState } from "@/models/TaskModel";
// importamos nuestro modelo de tareas para la API
import type { CreateTask } from "@/models/TaskRequestModels";
// importamos nuestro indice de metodos API
import { API } from "@/services";

// extendemos el estado de nuestro modelo para darle la capacidad de filtrar tareas
interface TaskFilterState extends TaskState {
    completed: Task[],
    pending: Task[],
    all: Task[]
}

// creamos nuestro store de tareas
export const useTaskStore = defineStore({
    id: 'tasks',
    state: (): TaskFilterState  => ({
        loading: false,
        data: [],
        all: [],
        completed: [],
        pending: [],
    }),
    actions: {
        // accion asincrona para agregar tareas 
        async addTask(task: Task) {
            this.loading = true; // mostrar el loading
            console.info('[Task Store 💾] Intentando crear una nueva tarea')
            try {
                // creamos una tarea que siga el modelo para agregar tareas al servidor
                let apiTask: CreateTask = { title: task.tarea, description: task.completada? 'Completada' : 'Incompleta'};
                const response = await API.createTask(apiTask); // llamamos a la api para agregar la tarea
                if( response.status === 201 ) {
                    // asignamos el id que nos devuelve el servidor 
                    let tId: number = response.data.id!
                    // creamos una tarea que siga el modelo para agregar tareas al estado
                    let newTask: Task =  { ...task, id: tId }
                    this.data.push(newTask) // agregamos la tarea al estado
                    console.info('[API 🌐] Nueva tarea agregada')
                    this.all.push(newTask) // agregamos la tarea a todas las tareas
                    await this.getAllTasks() // refrescamos todas las tareas
                }
            }catch (e){
                console.error('[API 🌐] Error creando la tarea', e) // informamos el error
                this.loading = false // paramos el loading
            }
        },

        // funcion asincrona para obtener todas las tareas
        async getAllTasks() {
            // mostrar el loading solo si no esta cargando
            if(this.loading === false) {
                this.loading = true;
            }
            console.info('[Task Store 💾] Intentando obtener todas las tareas')
            try { 
                const response = await API.getTasks(); // llamamos a la api para obtener todas las tareas
                // si la respuesta es positiva
                if( response.status === 200 ) {
                    // por cada item de la data de la respuesta
                    response.data.forEach( task => {
                        // creamos una tarea que siga el modelo de nuestro estado
                        const retrievedTask: Task = {
                            id: task.id!, // asignamos id de la tarea del servidor
                            tarea: task.title!, // 
                            completada: task.description === 'Completada'? true : false // 
                        } 
                        this.data.push(retrievedTask) // agregamos la tarea al estado
                        this.all.push(retrievedTask) // agregamos la tarea a todas las tareas
                    });
                    // aseguramos que no estamos repitiendo ninguna tarea
                    const uniqueTasks = this.all.filter((task, index, self) => self.findIndex(t => t.id === task.id) === index);
                    this.data = uniqueTasks
                    this.all = uniqueTasks
                    this.completed = uniqueTasks.filter(task => task.completada) // agregamos las completas
                    this.pending = uniqueTasks.filter(task => !task.completada) // agregamos la incompletas
                    console.info('[API 🌐] Se obtuviveron y organizaron todas las tareas')
                    this.loading = false // paramos el loading una vez finalice la iteracion
                }
            } catch (e) {
                console.error('[API 🌐] Error Obteniendo las tarea', e) // informamos el error
                this.loading = false // paramos el loading
            }
        },

        // accion asincrona para eliminar una tarea
        async removeTask(task: Task) {
            this.loading = true; // mostrar el loading
            console.info('[Tasks Store 💾] Intentando eliminar la tarea', task)
            try {
                const response = await API.deleteTask(task.id!); // llamamos a la api para eliminar
                if(response.status === 200) {
                    console.info('[API 🌐] Tarea eliminada con exito')
                }
            } catch (e) {
                console.error('[API 🌐] Error eliminando la tarea', e) // informamos el error
                this.loading = false // paramos el loading
            }
            this.data = this.data.filter(t => t.id !== task.id) // eliminamos la tarea
            this.all = this.all.filter(t => t.id !== task.id) // eliminamos la tarea
            await this.getAllTasks() // refrescamos las tareas
        },
        async changeStatus(task: Task) {
            this.loading = true; // mostrar el loading
            const index = this.data.findIndex((item) => item.id === task.id) // encontramos el indice de la tarea
            this.data[index].completada = !this.data[index].completada // cambiamos el status en el estado
            // creamos un objeto con la tarea siguiendo el model de la API
            const apiToBeUpdateTask: CreateTask = {
                title: this.data[index].tarea,
                description: this.data[index].completada? 'Completada' : 'Incompleta'
            }
            // actualizamos en el servidor
            console.info('[Tasks Store 💾] Intentando actualizar la tarea')
            try {
                const response = await API.updateTask(task.id!, apiToBeUpdateTask)
                console.info('[API 🌐] Tarea con id: ',response.data.id,' actualizada', )
                this.loading = false // paramos el loading
            } catch (e) {
                console.error('[API 🌐] Error actualizando la tarea', e) // informamos el error
                this.loading = false // paramos el loading
            }
            // refrescamos las tareas pendientes / completas
            if(this.data[index].completada) {
                this.completed.push(this.data[index])
            }
            else {
                this.completed = this.completed.filter((item) => item.id !== this.data[index].id)
            }
        },
        showCompleted() {
            this.data = this.completed
        },
        showPending() {
            this.data = this.pending
        },
        showAll() {
            this.data = this.all
        }
    }
})