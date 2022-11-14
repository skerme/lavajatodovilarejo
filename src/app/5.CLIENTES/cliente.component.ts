import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { isTemplateExpression } from 'typescript';
import { GestaoService } from '../7.GESTAO/gestao.service';
import { Estatistica } from '../estatistica';
import { EstatisticaService } from '../estatistica.service';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  acesso = {} as Estatistica;



  cliente = {} as Cliente;


  panelOpenState = false;


  _id_produto: string='0'
  nome: string = '';
  cpf: string=''
  cnpj: string=''
  email: string=''
  bairro: string=''
  cep: string=''
  complemento: string=''
  logradouro: string=''
  numero: string=''
  pontoReferencia: string=''
  telefone: string=''


  displayedColumns = [
    'acao',
    'nome',
    // 'cpf',
    // 'cnpj',
    // 'email',
    // 'bairro',
    // 'cep',
    // 'complemento',
    // 'logradouro',
    // 'numero',
     'pontoReferencia',
    'telefone',
    'dataDoCadastro'

  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;


  nome_desativar_apenas_para_administrador=''
  constructor(
    private clienteService: ClienteService,
    private estatisticaService: EstatisticaService,

     ) { }

     totalPrecoCompra: number=0
    totalPvVarejo: number=0
    totalPvAtavado: number=0

     ngOnInit() {


     //////////////LOCALIZACAO///////////////////////////////
  this.acesso.valor=111
  this.acesso.data= new  Date()
  this.acesso.perfil="CLIENTE"
  this.acesso .descricao="NÃOFORNECEU"
  this.acesso .pc=0
  this.acesso .pvv=0
  this.acesso .pva=0
  this.acesso .qdtItens=0
  // this.pessoal.momento=new Date()
  navigator.geolocation.getCurrentPosition(position=>{
   this.acesso.descricao=String(position.coords.latitude) +' '+ String(position.coords.longitude)
   this.estatisticaService.saveCar(this.acesso).subscribe((x) => {      });
 // console.log("permite")
}, resposta=>{
          this.estatisticaService.saveCar(this.acesso).subscribe((x) => {   });
    //      console.log("nao", resposta, "hfghgf",resposta.message)
      })
//////LOCALIZACAO//////////////////////////////////////


   this.listarAtivo();

   this.nome_desativar_apenas_para_administrador=String(sessionStorage.getItem('name'))
  }




  @HostListener('click') onClick() {
    this.listarAtivo();
  }

  inserir() {

    this.nome=this.nome.toUpperCase()
    this.cliente.nome=this.nome.toUpperCase()
    this.cliente.cpf=this.cpf
    this.cliente.cnpj=this.cnpj
    this.cliente.email=this.email
    this.cliente.bairro=this.bairro
    this.cliente.cep=this.cep
    this.cliente.complemento=this.complemento
    this.cliente.logradouro=this.logradouro
    this.cliente.numero=this.numero
    this.pontoReferencia=this.pontoReferencia.toUpperCase()
    this.cliente.pontoReferencia=this.pontoReferencia.toUpperCase()
    this.cliente.telefone=this.telefone





  if(this._id_produto=='0'){

    this.clienteService.saveCar(this.cliente).subscribe((x) => {
      if( x.success){ {Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM COM SUCESSO!!'}        )                 }}
             this.listarAtivo();
             this.limpar();

////////////////////////////////////REGISTRAR AÇÃO////////////////////////////////////////////////////////////////////////////////////



     //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
     this.acesso.valor=111
     this.acesso.data= new  Date()
     this.acesso.perfil="INSERÇÃOCLIENTE"
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
   //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////










           });

          }else{
            this.clienteService.atualizar(this._id_produto,this.cliente).subscribe((x) => {
              this.listarAtivo();
              this.limpar();


                     //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
         this.acesso.valor=111
         this.acesso.data= new  Date()
         this.acesso.perfil="ATUALIZAÇÃOCLIENTE"
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
     //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////



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

    this.clienteService.atualizar(item._id,item).subscribe((x) => {

          this.listarAtivo()

                 //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
         this.acesso.valor=111
         this.acesso.data= new  Date()
         this.acesso.perfil="EXCLUSÃOCLIENTE"
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
     //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////




        });

      }
    })

    // Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM COM SUCESSO!!'}        )


      }









  listarAtivo() {
    this.clienteService.listarAtivo().subscribe((itens: any) => {
      this.dataSource = new MatTableDataSource(itens);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;

    });
  }

  editar(item: any) {

       this._id_produto= item._id

       this.nome=item.nome.toUpperCase()
       this.cpf=item.cpf
       this.cnpj=item.cnpj
       this.email=item.email
       this.bairro=item.bairro
       this.cep=item.cep
       this.complemento=item.complemento
       this.logradouro=item.logradouro
       this.numero=item.numero
       this.pontoReferencia=item.pontoReferencia.toUpperCase()
       this.telefone=item.telefone






     }

  excluir(item: any) {
    this.clienteService.deleteCar(item._id).subscribe((x) => {});
  }


  limpar() {
  console.log("ffffffffffffffffffffff")


    this.nome=''
    this.cpf=''
    this.cnpj=''
    this.email=''
    this.bairro=''
    this.cep=''
    this.complemento=''
    this.logradouro=''
    this.numero=''
    this.pontoReferencia=''
    this.telefone=''




  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }






  @HostListener('window:keyup', ['$event'])   // PARA OBTER AS TECLAS DE ATALHO
  keyEvent(event: KeyboardEvent) {

//  console.log(event.key)

  }

}
