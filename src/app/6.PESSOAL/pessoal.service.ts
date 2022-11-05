import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoalService {



  url = environment.urlhostname;

    // Headers
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    }



 // injetando o HttpClient
 constructor(private httpClient: HttpClient) { }


   // Obtem todos os carros
   listar(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+'/pessoal/estado/1')

  }


    // Obtem todos os carros
    listarVendedores(): Observable<any[]> {
      return this.httpClient.post<any[]>(this.url+'/pessoal/estadocargo', JSON.stringify({"estado":1,"cargo":'vendedor'}), this.httpOptions)

    }


   // salva um carro
   saveCar(car: any): Observable<any> {
//console.log("SALVAR", car._id)

    return this.httpClient.post<any>(this.url+'/pessoal', JSON.stringify(car), this.httpOptions)

  }


    // deleta um carro
    deleteCar(car: any) {
    //  console.log("ffffffffffffffff")
      return this.httpClient.delete<any>(this.url+'/pessoal/'+car, this.httpOptions)
    }

    atualizar(_id: any,car: any): Observable<any> {
   //   console.log("ATUALIZAR", _id)
      return this.httpClient.put<any>(this.url+'/pessoal/'+_id, JSON.stringify(car), this.httpOptions)
    }










}
