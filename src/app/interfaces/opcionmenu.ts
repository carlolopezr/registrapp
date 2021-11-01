export interface Opcionmenu {
    destino:string;
    texto:string;
    icono:string;
}

export interface Asignatura{
    nombre:string;
    codigo:string;
    porcentaje:number;
    seccion:string;
}

export interface Usuario{
    username:string;
    password:string;
}

export interface Asistencia{
    id: string;
    username:string;
    idasig: string;
}

