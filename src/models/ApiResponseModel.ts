// Usaremos esta interfaz para asignar la respuesta de nuestro servidor
// usamos tipo generico T para asignar nuestra data
// ya que la misma no sera siempre la misma

export interface APIResponse<T> {
    status: number,
    statusText: string,
    data: T, // <-- tipo generico
}

