import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Estatistica } from '../estatistica';
import { EstatisticaService } from '../estatistica.service';
import { Pessoal } from './pessoal';
import { PessoalService } from './pessoal.service';

@Component({
  selector: 'app-pessoal',
  templateUrl: './pessoal.component.html',
  styleUrls: ['./pessoal.component.css']
})
export class PessoalComponent implements OnInit {

  QUANTIDADEDEPESSOAL: number=0

  acesso = {} as Estatistica;

  pessoal = {} as Pessoal;


  panelOpenState = false;


  _id_produto: string='0'



  nome: string=''
  cpf: string=''
//  pis: string=''
//  ctps: string=''
//  vinculo: string=''
//  situacao: string=''
  cargo: string=''
 // dependentes: number=0
  email: string=''
  dataNascimento: string=''
  dataAdmissao: string=''

  salarioBase: number=0
  bairro: string=''
  cep: string=''
  complemento: string=''

  logradouro: string=''
  numero: string=''
  pontoReferencia: string=''
  telefone: string=''







///////////////////////////////////////////////////

  displayedColumns = [
    'acao',
    'nome',
  'cpf',
 // 'pis',
 // 'ctps',
 // 'vinculo',
 // 'situacao',
  'cargo',
 // 'dependentes',
  'email',
  'dataNascimento',
  'dataAdmissao',

  'salarioBase',
  'bairro',
  'cep',
  'complemento',

  'logradouro',
  'numero',
  'pontoReferencia',
  'telefone',


  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  //////////////////////////////////////////


  constructor(
    private pessoalService: PessoalService,
    private estatisticaService: EstatisticaService

    ) { }

  ngOnInit() {

     //////////////LOCALIZACAO///////////////////////////////
  this.acesso.valor=111
  this.acesso.data= new  Date()
  this.acesso.perfil="PESSOAL"
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
//////LOCALIZACAO//////////////////////////////////////

   this.listar();
  }




  @HostListener('click') onClick() {
    this.listar();
  }

  inserir() {



    this.pessoal.nome=this.nome
    this.pessoal.cpf=this.cpf
   // this.pessoal.pis=this.pis
   // this.pessoal.ctps=this.ctps
   // this.pessoal.vinculo=this.vinculo
   // this.pessoal.situacao=this.situacao
    this.pessoal.cargo=this.cargo
   // this.pessoal.dependentes= this.dependentes
    this.pessoal.email=this.email
    this.pessoal.dataNascimento=this.dataNascimento
    this.pessoal.dataAdmissao=this.dataAdmissao

    this.pessoal.salarioBase=this.salarioBase
    this.pessoal.bairro=this.bairro
    this.pessoal.cep=this.cep
    this.pessoal.complemento=this.complemento

    this.pessoal.logradouro=this.logradouro
    this.pessoal.numero=this.numero
    this.pessoal.pontoReferencia=this.pontoReferencia
    this.pessoal.telefone=this.telefone







  if(this._id_produto=='0'){

    this.pessoalService.saveCar(this.pessoal).subscribe((x) => {

      if( x.success){ {Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM COM SUCESSO!!'}        )                 }}


             this.listar();
             this.limpar();


                //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
     this.acesso.valor=111
     this.acesso.data= new  Date()
     this.acesso.perfil="INSERÇÃOPESSOAL"
     this.acesso .descricao="NÃOFORNECEU"
     this.acesso .pc=0
     this.acesso .pvv=0
     this.acesso .pva=this.QUANTIDADEDEPESSOAL+1
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
            this.pessoalService.atualizar(this._id_produto,this.pessoal).subscribe((x) => {
              this.listar();
              this.limpar();

         //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
         this.acesso.valor=111
         this.acesso.data= new  Date()
         this.acesso.perfil="ATUALIZAÇÃOPESSOAL"
         this.acesso .descricao="NÃOFORNECEU"
         this.acesso .pc=0
         this.acesso .pvv=0
         this.acesso .pva=this.QUANTIDADEDEPESSOAL
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










  listar() {
    this.pessoalService.listar().subscribe((itens: any) => {
      this.QUANTIDADEDEPESSOAL=itens.length

      this.dataSource = new MatTableDataSource(itens);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    //  console.log('fdfdf', this.dataSource);

    });
  }

  editar(item: any) {

       this._id_produto= item._id





       this.nome=item.nome
       this.cpf=item.cpf
    //   this.pis=item.pis
    //   this.ctps=item.ctps
     //  this.vinculo=item.vinculo
    //   this.situacao=item.situacao
       this.cargo=item.cargo
     //  this.dependentes= item.dependentes
       this.email=item.email
       this.dataNascimento=item.dataNascimento
       this.dataAdmissao=item.dataAdmissao

       this.salarioBase=item.salarioBase
       this.bairro=item.bairro
       this.cep=item.cep
       this.complemento=item.complemento

       this.logradouro=item.logradouro
       this.numero=item.numero
       this.pontoReferencia=item.pontoReferencia
       this.telefone=item.telefone






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




    this.pessoalService.atualizar(item._id,item).subscribe((x) => {






                //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
                this.acesso.valor=111
                this.acesso.data= new  Date()
                this.acesso.perfil="EXCLUSÃOPESSOAL"
                this.acesso .descricao="NÃOFORNECEU"
                this.acesso .pc=0
                this.acesso .pvv=0
                this.acesso .pva=this.QUANTIDADEDEPESSOAL-1
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

















      this.listar()


          });

  }
})




  }


  limpar() {


    this.pessoal.nome=''
    this.pessoal.cpf=''
  //  this.pessoal.pis=''
  //  this.pessoal.ctps=''
  //  this.pessoal.vinculo=''
  //  this.pessoal.situacao=''
    this.pessoal.cargo=''
  //  this.pessoal.dependentes=0
    this.pessoal.email=''
    this.pessoal.dataNascimento=''
    this.pessoal.dataAdmissao=''

    this.pessoal.salarioBase=0
    this.pessoal.bairro=''
    this.pessoal.cep=''
    this.pessoal.complemento=''

    this.pessoal.logradouro=''
    this.pessoal.numero=''
    this.pessoal.pontoReferencia=''
    this.pessoal.telefone=''



  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }






  @HostListener('window:keyup', ['$event'])   // PARA OBTER AS TECLAS DE ATALHO
  keyEvent(event: KeyboardEvent) {

 // console.log(event.key)

  }




}
