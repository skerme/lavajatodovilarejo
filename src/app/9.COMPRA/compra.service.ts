import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  url = environment.urlhostname;

// Headers
httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json' })
}




constructor(private httpClient: HttpClient) { }




   // salva um carro
   vender(car: any): Observable<any> {
  //  console.log("SALVAR", car._id)

        return this.httpClient.post<any>(this.url+'/compra', JSON.stringify(car), this.httpOptions)
      }


   // Obtem todos os carros
   listarVendedorTotal(datas:any): Observable<any[]> {
    return this.httpClient.post<any>(this.url+'/compra/totalVendedor', JSON.stringify(datas), this.httpOptions)
  }




 // Obtem todos os carros
 listarFormaPagamentoTotal(datas:any): Observable<any[]> {
  return this.httpClient.post<any>(this.url+'/compra/totalPorFormaDePagamento', JSON.stringify(datas), this.httpOptions)


}




   // Obtem todos os carros
   listarAtivos(datas:any): Observable<any[]> {

    // console.log("UUUUUUUUUUUUUUUU", datas)


       return this.httpClient.post<any[]>(this.url+'/compra/estado', JSON.stringify(datas), this.httpOptions)

     }




     atualizar(_id: any,car: any): Observable<any> {
      //    console.log("ATUALIZAR", _id)
          return this.httpClient.put<any>(this.url+'/compra/'+_id, JSON.stringify(car), this.httpOptions)
        }





}
