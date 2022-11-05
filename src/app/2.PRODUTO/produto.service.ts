import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {



  url = environment.urlhostname;

    // Headers
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    }



 // injetando o HttpClient
 constructor(private httpClient: HttpClient) { }


   // Obtem todos os carros
   listar(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+'/produto')
  }


   // salva um carro
   saveCar(colecao: string,car: any): Observable<any> {
//console.log("SALVAR", car._id)


return this.httpClient.post<any>(this.url+'/produto/colecao/'+colecao, JSON.stringify(car), this.httpOptions)



  }


    // deleta um carro
    deleteCar(car: any) {
  //    console.log("ffffffffffffffff")
      return this.httpClient.delete<any>(this.url+'/produto/'+car, this.httpOptions)
    }

    atualizar(_id: any,car: any): Observable<any> {
   //   console.log("ATUALIZAR", _id)
      return this.httpClient.put<any>(this.url+'/produto/'+_id, JSON.stringify(car), this.httpOptions)
    }


    logar(car: any): Observable<any> {
      return this.httpClient.post<any>(this.url+'/auth/login', JSON.stringify(car), this.httpOptions)
    //  http://localhost:3000
    //https://apiskerme.herokuapp.com
    }


       // Obtem todos os carros
   listarAtivos(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+'/produto/estado/'+'1')

  }



   // Obtem todos os carros
   verificaDisponibilidade(car: any): Observable<any> {
    return this.httpClient.post<any[]>(this.url+'/produto/verificaDisponibilidade', JSON.stringify(car), this.httpOptions)

  }



 // Obtem todos os carros
 getCodigoEntrada(car: any): Observable<any> {
  return this.httpClient.post<any[]>( this.url+'/produto/getCodigoEntrada', JSON.stringify(car), this.httpOptions)

}





}
