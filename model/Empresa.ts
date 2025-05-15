export class Empresa {
  
  constructor(
    public uid: string,
    public nome: string,
    public tecnologias: string,
    public endereco: string,
    public latitude: number,
    public longitude: number,
    public urlFoto: string,
  ) {
    this.uid = uid;
    this.nome = nome;
    this.tecnologias = tecnologias;
    this.endereco = endereco;
    this.latitude = latitude;
    this.longitude = longitude;
    this.urlFoto = urlFoto;
  }
}
