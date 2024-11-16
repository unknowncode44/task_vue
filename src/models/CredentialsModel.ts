// modelo para el registro y login de usuarios
// esta informacion la pasaremos en el body de nuestra peticion POST
// al servidor, ya sea para logear o para registrar al usuario
export interface CredentialsModel {
    email: string,
    password: string
    nickname?: string, // <-- campo opcional 
}

