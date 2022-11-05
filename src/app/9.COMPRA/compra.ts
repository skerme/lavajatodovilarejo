
import { Itens } from "./itens";


export interface  Compra {





  itens: Array<Itens>,



  custoDosItens: number,

  total: number,
  subtotal: number,            //so na cesta
  totalItens: number,            //so na cesta
  tributo: number,            //so na cesta


  valorRecebido: number,
  frete: number,
  outros: number,
  troco: number,
  custoVenda: number,
  codigo: number


}




