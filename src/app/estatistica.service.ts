import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstatisticaService {


  url = environment.urlhostname;

  // Headers
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json' })
  }




  constructor(private httpClient: HttpClient) { }


     // salva um carro
     saveCar(dados: any): Observable<any> {
      //console.log("SALVAR", dados._id)

          return this.httpClient.post<any>(this.url+'/estatistica', JSON.stringify(dados), this.httpOptions)

        }



            // salva um carro
            getDiasFuncionando(dados: any): Observable<any> {
              console.log("SALVARrrrrrrrrrrrrrrrrrrrrrr",dados)

                  return this.httpClient.post<any>( this.url +'/estatistica/getDiasFuncionando', JSON.stringify(dados), this.httpOptions)

                }

            
            predicoes(dados: any): Observable<any> {
              return this.httpClient.post<any>('https://sitepythonherokuprimeiravez2.herokuapp.com/usuario', JSON.stringify(dados), this.httpOptions)

            }

}
