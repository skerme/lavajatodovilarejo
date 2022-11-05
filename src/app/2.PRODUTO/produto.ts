import { TamanhoQuantidade } from "./tamanho-quantidade";

export interface Produto {
  _id: string,

  codigo: number,  // so por causa do historico
  descricao: string,
  valor: number,
  data: string,
  precoCompra:number,
  precoVendaVarejo: number,
  precoVendaAtacado: number,
  dataCriacao: Date,
  tamanhos: Array<TamanhoQuantidade>
  quantAjustada: number,

}



