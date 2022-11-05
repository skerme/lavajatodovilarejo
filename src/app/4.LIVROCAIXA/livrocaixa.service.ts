import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivrocaixaService {



  url = environment.urlhostname;

    // Headers
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    }



 // injetando o HttpClient
 constructor(private httpClient: HttpClient) { }


   // Obtem todos os carros
   listar(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+'/livrocaixa')

  }

   // Obtem todos os carros
   listarAtivos(datas:any): Observable<any[]> {
    return this.httpClient.post<any[]>(this.url+'/livrocaixa/estado/',JSON.stringify(datas), this.httpOptions)






  }



   // Obtem todos os carros
   listarAtivosAberturaCaixa(datas:any): Observable<any[]> {
    return this.httpClient.post<any[]>(this.url+'/livrocaixa/aberturacaixa/', JSON.stringify(datas), this.httpOptions )

  }








   // salva um carro
   saveCar(car: any): Observable<any> {
console.log("SALVArrrrrrrrrrrrrrrrrrrrrrrR", car)

    return this.httpClient.post<any>(this.url+'/livrocaixa', JSON.stringify(car), this.httpOptions)

  }

   // salva um carro
   saveCarAberturaCaixa(car: any): Observable<any> {
  //  console.log("SALVArrrrrrrrrrrrrrrrrrrrrrrR", car)

        return this.httpClient.post<any>(this.url+'/livrocaixa', JSON.stringify(car), this.httpOptions)

      }




    // deleta um carro
    deleteCar(car: any) {
  //    console.log("ffffffffffffffff")
      return this.httpClient.delete<any>(this.url+'/livrocaixa/'+car, this.httpOptions)
    }

    atualizar(_id: any,car: any): Observable<any> {
  //    console.log("ATUALIZAR", _id)
      return this.httpClient.put<any>(this.url+'/livrocaixa/'+_id, JSON.stringify(car), this.httpOptions)
    }










}
