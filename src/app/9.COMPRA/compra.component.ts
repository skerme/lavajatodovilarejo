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
import { Compra } from './compra';
import { CompraService } from './compra.service';


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  acesso = {} as Estatistica;



  compra = {} as Compra;


  panelOpenState = false;


  _id_produto: string='0'
  nome: string = '';
  cpf: string=''
  cnpj: string=''
  email: string=''
  bairro: string=''
  cep: string=''
  preco: number = 0
  logradouro: string=''
  numero: string=''
  pontoReferencia: string=''
  telefone: string=''
  dataInicio: Date=new Date()
  dataFim: Date=new Date()

  displayedColumns = [
    'acao',
    'nome',
    'dataInicio',
    'dataFim',
    // 'cpf',
    // 'cnpj',
    // 'email',
    // 'bairro',
    // 'cep',


     'numero',
     'preco',
     'pontoReferencia',
    'telefone',
    'logradouro',

  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;



  constructor(
    private compraService: CompraService,
    private estatisticaService: EstatisticaService,

     ) { }

     totalPrecoCompra: number=0
    totalPvVarejo: number=0
    totalPvAtavado: number=0


    nome_desativar_apenas_para_administrador=''

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
    this.compra.nome=this.nome.toUpperCase()
    this.compra.cpf=this.cpf
    this.compra.cnpj=this.cnpj
    this.compra.email=this.email
    this.compra.bairro=this.bairro
    this.compra.cep=this.cep
    this.compra.preco=this.preco
    this.compra.logradouro=this.logradouro
    this.compra.numero=this.numero
    this.pontoReferencia=this.pontoReferencia.toUpperCase()
    this.compra.pontoReferencia=this.pontoReferencia.toUpperCase()
    this.compra.telefone=this.telefone
    this.compra.dataInicio=this.dataInicio
    this.compra.dataFim=this.dataFim





  if(this._id_produto=='0'){

    this.compraService.saveCar(this.compra).subscribe((x) => {
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
            this.compraService.atualizar(this._id_produto,this.compra).subscribe((x) => {
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

    this.compraService.atualizar(item._id,item).subscribe((x) => {

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



    this.compraService.listarAtivo().subscribe((itens: any) => {
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
       this.preco=item.preco
       this.logradouro=item.logradouro
       this.numero=item.numero
       this.pontoReferencia=item.pontoReferencia.toUpperCase()
       this.telefone=item.telefone






     }

  excluir(item: any) {
    this.compraService.deleteCar(item._id).subscribe((x) => {});
  }


  limpar() {
  console.log("ffffffffffffffffffffff")


    this.nome=''
    this.cpf=''
    this.cnpj=''
    this.email=''
    this.bairro=''
    this.cep=''
    this.preco=0
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
