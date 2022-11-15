import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {



  url = environment.urlhostname;

    // Headers
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    }



 // injetando o HttpClient
 constructor(private httpClient: HttpClient) { }


   // Obtem todos os carros
   listarAtivos(datas:any): Observable<any[]> {

 // console.log("UUUUUUUUUUUUUUUU", datas)


    return this.httpClient.post<any[]>(this.url+'/venda/estado', JSON.stringify(datas), this.httpOptions)

  }









   // salva um carro
reporProduto(car: any): Observable<any> {
//  console.log("SALVAR", car._id)

    return this.httpClient.post<any>(this.url+'/venda/repor', JSON.stringify(car), this.httpOptions)


  }



     // salva um carro
     registrodaSaida(car: any): Observable<any> {
  //  console.log("SALVAR", car._id)

      return this.httpClient.post<any>(this.url+'/venda/registrodaSaida', JSON.stringify(car), this.httpOptions)


    }


     // salva um carro
     trocarVendedor(car: any): Observable<any> {
      //  console.log("SALVAR", car._id)

          return this.httpClient.post<any>(this.url+'/venda/trocarVendedor', JSON.stringify(car), this.httpOptions)


        }




   // salva um carro
   estadodoPagamento(car: any): Observable<any> {
    //  console.log("SALVAR", car._id)



        return this.httpClient.post<any>(this.url+'/venda/estadodoPagamento', JSON.stringify(car), this.httpOptions)


      }



//     // deleta um carro
//     deleteCar(car: any) {
//       console.log("ffffffffffffffff")
//       return this.httpClient.delete<any>(this.url+'/livrocaixa/'+car, this.httpOptions)
//     }

//     atualizar(_id: any,car: any): Observable<any> {
//       console.log("ATUALIZAR", _id)
//       return this.httpClient.put<any>(this.url+'/livrocaixa/'+_id, JSON.stringify(car), this.httpOptions)
//     }










}
