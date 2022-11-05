import { Itens } from "../1.VENDA/itens";
export interface  Historico {
  cliente: string,
  vendedor:string,
  itens: Array<Itens>,
  formaPagamento: string,
  custoVenda: number,
  total: number,
  valorRecebido: number,
  acrescimo: number,
  desconto: number,
  troco: number,
  dataDaVenda: string
}


