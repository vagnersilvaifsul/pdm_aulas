import { Curso } from './Curso';
import { Perfil } from './Perfil';

export class Usuario {
  
  constructor(
    public uid: string,
    public email: string,
    public nome: string,
    public urlFoto: string,
    public curso: Curso,
    public perfil: Perfil,
    public senha?: string,
  ) {
    this.uid = uid;
    this.email = email;
    this.nome = nome;
    this.urlFoto = urlFoto;
    this.curso = curso;
    this.perfil = perfil;
    this.senha = senha;
  }
}
