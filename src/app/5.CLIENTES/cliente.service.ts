import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {



  url = environment.urlhostname;

    // Headers
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    }



 // injetando o HttpClient
 constructor(private httpClient: HttpClient) { }


   // Obtem todos os carros
   listarAtivo(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+'/cliente/estado/'+'1')

  }



     // Obtem todos os carros
     localizar(cpf:  string): Observable<Cliente> {
      return this.httpClient.get<Cliente>(this.url+'/cliente/localizar/'+cpf)

    }

   // salva um carro
   saveCar(car: any): Observable<any> {
//console.log("SALVAR", car._id)

    return this.httpClient.post<any>(this.url+'/cliente', JSON.stringify(car), this.httpOptions)

  }


    // deleta um carro
    deleteCar(car: any) {
     // console.log("ffffffffffffffff")
      return this.httpClient.delete<any>(this.url+'/cliente/'+car, this.httpOptions)
    }

    atualizar(_id: any,car: any): Observable<any> {
    //  console.log("ATUALIZAR", _id)
      return this.httpClient.put<any>(this.url+'/cliente/'+_id, JSON.stringify(car), this.httpOptions)
    }










}
