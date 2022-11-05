import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  url = environment.urlhostname;

    // Headers
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    }



 // injetando o HttpClient
 constructor(private httpClient: HttpClient) { }


   // Obtem todos os carros
   listar(email: string): Observable<any[]> {

    //  console.log("yyyyyAAAAAAAAAAAAAASSSSSSSSSSSSSSSS", email)


    return this.httpClient.get<any[]>(this.url+'/users/usuario/'+email)

  }


   // Obtem todos os carros
   listarAtivo(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+'/users/estado/'+'1')

  }




   // salva um carro
   saveCar(car: any): Observable<any> {
//console.log("SALVAR", car._id)

    return this.httpClient.post<any>(this.url+'/users', JSON.stringify(car), this.httpOptions)

  }


    // deleta um carro
    deleteCar(car: any) {
  //    console.log("ffffffffffffffff")
      return this.httpClient.delete<any>(this.url+'/users/'+car, this.httpOptions)
    }

    atualizar(_id: any,car: any): Observable<any> {
 //     console.log("ATUALIZAR", _id)
      return this.httpClient.put<any>(this.url+'/users/'+_id, JSON.stringify(car), this.httpOptions)
    }










}
