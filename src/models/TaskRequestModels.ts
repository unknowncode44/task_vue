// creamos un type para indicar en descripcion de tarea si la misma esta completa o no
// con esto aseguramos que no enviaremos informacion falsa a la base de datos
type TaskCompl = 'Completada' | 'Incompleta' 

// creamos un modelo para Crear o Modificar tareas en el servidor
export interface CreateTask {
    title: string;
    description: TaskCompl // usamos nuestro tipo
}
