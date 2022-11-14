import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';
import { LivrocaixaService } from '../4.LIVROCAIXA/livrocaixa.service';
import { Estatistica } from '../estatistica';
import { EstatisticaService } from '../estatistica.service';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';




@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  acesso = {} as Estatistica;



  desabilitarPassword: boolean=false

  hide = true;


  usuario = {} as Usuario;


  panelOpenState = false;


  _id_produto: string='0'
  nome: string = '';
  email: string= '';
  perfil: string='';
  password: string='';



  displayedColumns = [
    'acao',
    'name',
    'email',
    'perfil',
    'dataDaCriacao'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;


  nome_desativar_apenas_para_administrador=''
  constructor(
    private usuarioService: UsuarioService,
    private estatisticaService: EstatisticaService

     ) { }

  ngOnInit() {


     //////////////LOCALIZACAO///////////////////////////////
  this.acesso.valor=111
  this.acesso.data= new  Date()
  this.acesso.perfil="USUARIO"
  this.acesso .descricao="NÃOFORNECEU"
  this.acesso .pc=0
  this.acesso .pvv=0
  this.acesso .pva=0
  this.acesso .qdtItens=0
  // this.pessoal.momento=new Date()
  navigator.geolocation.getCurrentPosition(position=>{
   this.acesso.descricao=String(position.coords.latitude) +' '+ String(position.coords.longitude)
   this.estatisticaService.saveCar(this.acesso).subscribe((x) => {      });
  console.log("permite")
}, resposta=>{
          this.estatisticaService.saveCar(this.acesso).subscribe((x) => {   });
          console.log("nao", resposta, "hfghgf",resposta.message)
      })
//////LOCALIZACAO//////////////////////////////////////

   this.listarAtivo();
   this.limpar()


   this.nome_desativar_apenas_para_administrador=String(sessionStorage.getItem('name'))


  }







  @HostListener('click') onClick() {
    this.listarAtivo();
  }

  inserir() {


    this.usuario.name=this.nome.toUpperCase()
    this.usuario.email=this.email.toUpperCase()
    this.usuario.perfil=this.perfil
    this.usuario.password=this.password




  if(this._id_produto=='0'){

    this.usuarioService.saveCar(this.usuario).subscribe((x) => {
      if( x.success){ {Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM COM SUCESSO!!'}        )                 }}
             this.listarAtivo();
             this.limpar();

                //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
     this.acesso.valor=111
     this.acesso.data= new  Date()
     this.acesso.perfil="INSERÇÃOUSUARIO"
     this.acesso .descricao="NÃOFORNECEU"
     this.acesso .pc=0
     this.acesso .pvv=0
     this.acesso .pva=0
     this.acesso .qdtItens=0
     // this.pessoal.momento=new Date()
     navigator.geolocation.getCurrentPosition(position=>{
      this.acesso.descricao=String(position.coords.latitude) +' '+ String(position.coords.longitude)
      this.estatisticaService.saveCar(this.acesso).subscribe((x) => {      });
   //  console.log("permite")
   }, resposta=>{
             this.estatisticaService.saveCar(this.acesso).subscribe((x) => {   });
        //     console.log("nao", resposta, "hfghgf",resposta.message)
         })

           });

          }else{
            this.usuarioService.atualizar(this._id_produto,this.usuario).subscribe((x) => {
              this.listarAtivo();
              this.limpar();



             //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
             this.acesso.valor=111
             this.acesso.data= new  Date()
             this.acesso.perfil="ATUALIZAÇÃOUSUARIO"
             this.acesso .descricao="NÃOFORNECEU"
             this.acesso .pc=0
             this.acesso .pvv=0
             this.acesso .pva=0
             this.acesso .qdtItens=0
             // this.pessoal.momento=new Date()
             navigator.geolocation.getCurrentPosition(position=>{
              this.acesso.descricao=String(position.coords.latitude) +' '+ String(position.coords.longitude)
              this.estatisticaService.saveCar(this.acesso).subscribe((x) => {      });
           //  console.log("permite")
           }, resposta=>{
                     this.estatisticaService.saveCar(this.acesso).subscribe((x) => {   });
                //     console.log("nao", resposta, "hfghgf",resposta.message)
                 })















            });


          }

  this._id_produto='0'


  this.limpar()





  }





  desativar(item: any) {
    item.estado=0





    Swal.fire({
      title: 'REALMENTE DESEJA EXCLUIR?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SIM'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ITEM EXCLUIDO!',
           '',
           'success'
        )


        this.usuarioService.atualizar(item._id,item).subscribe((x) => {
          this.listarAtivo()


                       //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
     this.acesso.valor=111
     this.acesso.data= new  Date()
     this.acesso.perfil="EXCLUSÃOUSUARIO"
     this.acesso .descricao="NÃOFORNECEU"
     this.acesso .pc=0
     this.acesso .pvv=0
     this.acesso .pva=0
     this.acesso .qdtItens=0
     // this.pessoal.momento=new Date()
     navigator.geolocation.getCurrentPosition(position=>{
      this.acesso.descricao=String(position.coords.latitude) +' '+ String(position.coords.longitude)
      this.estatisticaService.saveCar(this.acesso).subscribe((x) => {      });
   //  console.log("permite")
   }, resposta=>{
             this.estatisticaService.saveCar(this.acesso).subscribe((x) => {   });
        //     console.log("nao", resposta, "hfghgf",resposta.message)
         })

                  });

      }
    })







      }





  listarAtivo() {
    this.usuarioService.listarAtivo().subscribe((itens: any) => {


     // PARA NÃO MOSTRA O CADASTRO GESTÃO NO MENU USUSÁRIOS
     itens = itens.filter((item: { name: string; })  => item.name != "GESTAO");
     // PARA NÃO MOSTRA O CADASTRO GESTÃO NO MENU USUSÁRIOS


      this.dataSource = new MatTableDataSource(itens);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;




    });
  }

  editar(item: any) {

       this._id_produto= item._id



       this.nome=item.name
       this.email=item.email
       this.perfil=item.perfil
       this.password=item.password



  this.desabilitarPassword=true




     }

  excluir(item: any) {
    this.usuarioService.deleteCar(item._id).subscribe((x) => {});
  }


  limpar() {
    this.nome=''
    this.email=''
    this.perfil=''
    this.password=''
    this.desabilitarPassword=false
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }






  @HostListener('window:keyup', ['$event'])   // PARA OBTER AS TECLAS DE ATALHO
  keyEvent(event: KeyboardEvent) {

  console.log(event.key)

  }










}
