export interface Opcionmenu {
    destino:string;
    texto:string;
    icono:string;
}

export interface Asignatura{
    nombre:string;
    codigo:string;
}

export interface Usuario{
    username:string;
    password:string;
    estado:number;
}

export interface Asistencia{
    id: string;
    idasig: string;
    username:string;
    fecha:number;
    
}

    
