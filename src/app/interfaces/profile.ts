export interface Profile{
    id: string;
    nome: string;
    perfil: string;
    idade: number;
    email: string;
    ativo?: boolean;
    pais?: string;
    nivelDeExperiencia?: string;
}