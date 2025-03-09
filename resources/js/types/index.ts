export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: Auth;
};

export interface Auth {
    user: User;
}
export interface Cliente {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    dni: string;
    vehiculos?: Vehiculo[];
    created_at?: string;
    updated_at?: string;
}

export interface Vehiculo {
    id: number;
    marca: string;
    modelo: string;
    color: string;
    placa: string;
    anio: number;
    kilometraje: number;
    cliente_id: number;
    cliente?: Cliente;
    created_at?: string;
    updated_at?: string;
}

export interface LanguageOption {
    value: string;
    label: string;
}

export interface Translations {
    [key: string]: {
        [language: string]: string;
    };
}
