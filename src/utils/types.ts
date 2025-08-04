export type Persona = {
    id: string;
    nombre: string;
    rol: 'analista' | 'revisor';
    correo: string,
    especialidad: string,
    experiencia: number;
};

export type Dupla = {
    analista: Persona;
    revisor: Persona;
    match: boolean;
};
