// del mismo modo que el modelo de respuesta de autenticacion
// usaremos campos opcionales, ya que dependemos de la respuesta
// del servidor para saber cuales utilizar

export interface TaskApiResponse {
    statusCode?: number,
    message?: string | [string],
    error?: string
    id?: number,
    createdAt?: string,
    updatedAt?: string,
    title?: string,
    description?: string,
    userId?: string
}

