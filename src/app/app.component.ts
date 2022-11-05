import { Component, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { ProdutoService } from './2.PRODUTO/produto.service';
import { Registro } from './4.LIVROCAIXA/registro';


import { UsuarioService } from './8.USUARIO/usuario.service';
import { EstatisticaService } from './estatistica.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


  executavenda = {} as Registro;  // usado no executaexecutavenda() executavenda = {} as Registro;  // usado no executaexecutavenda()


  resolucao: number=( window.innerWidth)


  nomeUsuarioAtivo: string=''

  formLogin!: FormGroup;
  token: string = '';


  senhacorreta: boolean=false

  ocutarmenuopcoes: boolean=false


  constructor(                    //para eu navegar nas rotas via typescript
    private router: Router,
    private formBuilder: FormBuilder,
    // PARA O LOGIN
    private consumirService: ProdutoService,         // injetada para fazermos a autenticacao na API;
    // PARA O LOGIN
    private usuarioService: UsuarioService,





   ) { }



   // IP: string=""
  //  LAT: string=""
  //  LONG: string=""
  //  velocidade: string=""
  //  resolucao: string=""
  //  NAVEGADOR: string=""
  //  usuario: string=""



   ngOnInit(): void
   {




























   this.formLogin = this.formBuilder.group({
    email: ['', [Validators.email]],
    password: [],
  });


    //  PARA OCULTAR A TELA DE LOGIN CASO ESTEJA COM TOKEN



    if (sessionStorage.getItem('token')){   //localStorage.getItem('token') retornar null entao nao entra
         this.senhacorreta=true



       }
       else{
        this.senhacorreta=false
        this.router.navigate([''])
       }








    //  PARA OCULTAR A TELA DE LOGIN CASO ESTEJA COM TOKEN

    if(sessionStorage.getItem('perfil')=='caixa'){
      this.ocutarmenuopcoes=false
     }
     if(sessionStorage.getItem('perfil')=='administrador'){
      this.ocutarmenuopcoes=true
     }

   }





  entrar() {

    this.formLogin.value.email=this.formLogin.value.email.toUpperCase()

    this.consumirService.logar(this.formLogin.value).subscribe(
      (x: any) => {



        this.token = x.access_token;




      sessionStorage.setItem('token', this.token);


     // console.log(" lllllllllllllllllllllllllluuuuuuuuuuuuuuuuuuUUUUUUUUUUUUUU", this.formLogin.value.email)



        this.usuarioService.listar(this.formLogin.value.email).subscribe((item: any) => {

          sessionStorage.setItem('perfil', item.perfil);
          sessionStorage.setItem('name', item.name);


         if(sessionStorage.getItem('perfil')=='caixa'){
          this.ocutarmenuopcoes=false
         }
         if(sessionStorage.getItem('perfil')=='administrador'){
          this.ocutarmenuopcoes=true
         }


      //   console.log("ttttttttttYYYYYYYYYYY", this.ocutarmenuopcoes)







         if ((this.resolucao>=900))  {
          this.router.navigate(['/venda'])
        }



        if((sessionStorage.getItem('perfil')=='administrador')&&((this.resolucao<900)))
        {
      //    console.log("2222222222222222")
          this.router.navigate(['/gestao'])
        }


        this.senhacorreta=true

        sessionStorage.setItem('menu', '/venda')



        });






      },
      (erro) => {
        if (erro.status == 401) {
          this.token = 'SENHA OU EMAIL INCORRETOS';
        }
      }
    );



    this.nomeUsuarioAtivo= String(sessionStorage.getItem('name'))
  }

  sair() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('perfil');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('menu');
    this.senhacorreta=false
    this.router.navigate(['/'])
  }





//////////NOVO MENU///

   menunovo(valor: number){
    if (valor==0)          {  this.router.navigate(['/venda']);  }
    if (valor==1)          {  this.router.navigate(['/produto']);  }
    if (valor==2)          {  this.router.navigate(['/historico']);  }
    if (valor==3)          {  this.router.navigate(['/livrocaixa']);  }
    if (valor==5)          {  this.router.navigate(['/cliente']);  }
    if (valor==6)          {  this.router.navigate(['/pessoal']);  }
    if (valor==7)          {  this.router.navigate(['/gestao']);  }
    if (valor==8)          {  this.router.navigate(['/usuario']);  }
    if (valor==9)          {  this.router.navigate(['/compra']);  }





  // PARA O MENU NO CELULAR RECUPAR APOS ESCOLHER A OPCAO  11
  let element: HTMLElement = document.getElementsByClassName( 'navbar-toggler' )[ 0 ] as HTMLElement;
  if ( element.getAttribute( 'aria-expanded' ) == 'true' ) {
      element.click();
  // PARA O MENU NO CELULAR RECUPAR APOS ESCOLHER A OPCAO  11
  }



  }


//////////NOVO MENU///











@HostListener('click') onClick() {
this.nomeUsuarioAtivo = String(sessionStorage.getItem('name'))
}




@HostListener('window:keyup', ['$event']) // PARA OBTER AS TECLAS DE ATALHO
keyEvent(event: KeyboardEvent) {
  this.nomeUsuarioAtivo = String(sessionStorage.getItem('name'))

}




}
