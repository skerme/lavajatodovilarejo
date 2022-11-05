
import { Itens } from "./itens";


export interface  Venda {
  cliente: string,
  nome_cliente: string,
  demanda:string,
  vendedor:string,


    pix: number,
    dinheiro: number,
    credito: number,
    debito: number,

  itens: Array<Itens>,
  formaPagamento: string,




  total: number,
  subtotal: number,            //so na cesta
  totalItens: number,            //so na cesta
  acrescimo: number,            //so na cesta


  valorRecebido: number,
  desconto: number,
  troco: number,
  custoVenda: number,
  codigo: number


}




