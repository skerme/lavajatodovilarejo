import { CompraComponent } from './9.COMPRA/compra.component';
import { UsuarioComponent } from './8.USUARIO/usuario.component';
import { PessoalComponent } from './6.PESSOAL/pessoal.component';

import { HistoricoComponent } from './3.HISTORICO/historico.component';













import { GestaoComponent } from './7.GESTAO/gestao.component';
import { LivrocaixaComponent } from './4.LIVROCAIXA/livrocaixa.component';
import { ProdutoComponent } from './2.PRODUTO/produto.component';


import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { MatSliderModule } from '@angular/material/slider';  // PARA PODER USAR O MATERIAL
import { MatTableModule } from '@angular/material/table'    // para poder usar tabelas NO MATERIAL
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { InterceptorService } from './interceptor.service';
import {MatExpansionModule} from '@angular/material/expansion';

import {  VendaComponent } from './1.VENDA/venda.component';


import {MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';


import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule} from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { ClienteComponent } from './5.CLIENTES/cliente.component';
import {MatDatepickerModule} from '@angular/material/datepicker';// para INSERIR O DATA PICKER2244
import { MatNativeDateModule } from '@angular/material/core';// para INSERIR O DATA PICKER2233
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
// **************************************************
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);
// **************************************************


@NgModule({
  declarations: [
    AppComponent,
    VendaComponent,
    ProdutoComponent,
    LivrocaixaComponent,
    GestaoComponent,
    HistoricoComponent,
    ClienteComponent,
    PessoalComponent,
    UsuarioComponent,
    CompraComponent


  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    HttpClientModule, //CHAMADAS AJAX                      //ok
    ReactiveFormsModule, BrowserAnimationsModule,   // para usar formulario reativo  //ok
    MatSliderModule,                                    // PARA PODER USAR O MATERIAL
    MatTableModule,                                     // para poder usar tabelas NO MATERIAL
    MatFormFieldModule,                                 // para fazer minha entrada de dados
    MatInputModule,                                     // para fazer minha entrada de dados
    MatSelectModule,                                     // para fazer minha entrada de dados


    MatPaginatorModule,                                // aqui por causa da paginacao
    MatSortModule,                                     // para ordenar
    FormsModule,                                      //para poder fazer o binding
    MatCardModule,
    MatExpansionModule,


    MatRadioModule,

    MatIconModule,


    MatDatepickerModule,    // para INSERIR O DATA PICKER11
    MatNativeDateModule,     // para INSERIR O DATA PICKER22
    MatProgressBarModule,

    BsDatepickerModule.forRoot(),
  ],

  providers: [


  // PARA MANDTER A COR GLOBAL DO  RADIOBUTTON
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'warn' },
    },



    {
    provide: HTTP_INTERCEPTORS,    // para alterara o cabecalho da requisicao inserindo o token
    useClass: InterceptorService,
    multi: true,
 },

 //{provide: LOCALE_ID, useValue: 'pt-BR'},  // para apresentar MOEDA  e data
 {provide: LOCALE_ID, useValue: 'pt'},


 {provide: LocationStrategy, useClass: HashLocationStrategy}  // 2para nao ter problema ao dar o refrash

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
