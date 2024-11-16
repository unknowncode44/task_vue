// este modelo tendra campos opcionales, 
// pues depende de la respuesta del servidor se asignaran o no valores.

export interface AuthApiResponseModel {
    statusCode?: number // 400: Bad Request, 200: OK, 401: Unauthorized, 500: Internal Server Error, 201: Created
    message?: string | [string] // dependiendo la respuesta nos puede llegar un string solitario o una lista
    error?: string
}


