export class Empresa {
  
  constructor(
    public nome: string,
    public tecnologias: string,
    public cep: string,
    public endereco: string,
    public latitude: number,
    public longitude: number,
    public urlFoto: string,
    public uid?: string,
  ) {
    this.nome = nome;
    this.tecnologias = tecnologias;
    this.cep = cep;
    this.endereco = endereco;
    this.latitude = latitude;
    this.longitude = longitude;
    this.urlFoto = urlFoto;
    this.uid = uid;
  }
}
