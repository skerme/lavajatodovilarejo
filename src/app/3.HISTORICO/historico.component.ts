import { JwtPayload } from './../payload';

import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Historico } from './historico';
import { HistoricoService } from './historico.service';

import jwt_decode from 'jwt-decode';
import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import Swal from 'sweetalert2';
import { EstatisticaService } from '../estatistica.service';
import { Estatistica } from '../estatistica';


@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  acesso = {} as Estatistica;


  ocutarmenuopcoes: boolean=false



  formListarVendas = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  codigoDaVenda:number=0

  detalhes: any[]=[]

  bsRangeValue!: Date[];


  executavenda = {} as Historico;  // usado no executaexecutavenda()


  panelOpenState = false;




  formLogin!: FormGroup;
  _id: string = '0';
  tiposDeCargos: any[] = [];
  token: string = '';

  displayedColumns = [
    'acao',
    'codigo',
    'cliente',
    'nome_cliente',
    'vendedor',
  //  'formaPagamento',
   //  'custoVenda',
    'total',
    // 'valorRecebido',
   // 'acrescimo',
    //'desconto',
    // 'troco',
    'dataDaVenda',
    'dataDaVendaSaida',
    'estadodoPagamento'


  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;


  nome_desativar_apenas_para_administrador=''
  constructor(
    private historicoService: HistoricoService,
    private formBuilder: FormBuilder,
    private estatisticaService: EstatisticaService
    ) {
      var x= new Date()
      x.setHours(x.getHours()-3.5)
     this.bsRangeValue = [x, x];
    }

  ngOnInit() {

     //////////////LOCALIZACAO///////////////////////////////
  this.acesso.valor=111
  this.acesso.data= new  Date()
  this.acesso.perfil="HISTÓRICO"
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
       //   console.log("nao", resposta, "hfghgf",resposta.message)
      })
//////LOCALIZACAO//////////////////////////////////////

   this.listarAtivos();


   if(sessionStorage.getItem('perfil')=='caixa'){
    this.ocutarmenuopcoes=false
   }
   if(sessionStorage.getItem('perfil')=='administrador'){
    this.ocutarmenuopcoes=true
   }

   this.nome_desativar_apenas_para_administrador=String(sessionStorage.getItem('name'))

  }




  @HostListener('click') onClick() {
    this.listarAtivos();
  }

  // inserir() {

  //   console.log('fffffffff', this._id);

  //   this.executavenda.descricao=this.descricao
  //   this.executavenda.valor=this.valor
  //   this.executavenda.data=this.data


  // if(this._id_produto=='0'){

  //   this.historicoService.saveCar(this.executavenda).subscribe((x) => {
  //            this.listar();
  //            this.limpar();
  //          });

  //         }else{
  //           this.historicoService.atualizar(this._id_produto,this.executavenda).subscribe((x) => {
  //             this.listar();
  //             this.limpar();
  //           });


  //         }

  // this._id_produto='0'



  //   this.descricao==''
  //   this.valor=0
  //   this.data=''
  // }









  listarAtivos() {



// se for ADMINISTRADOR PEGAR AS VENDA DE ATE UM ANO ATRAS
    // if(sessionStorage.getItem('perfil')=='administrador'){
    //   this.formListarVendas.value.end.setFullYear((this.formListarVendas.value.end.getFullYear()+1))
    //   this.formListarVendas.value.start.setFullYear(2021)
    //    }
// se for ADMINISTRADOR PEGAR AS VENDA DE ATE UM ANO ATRAS


    this.historicoService.listarAtivos(

      {
        "inicio":  this.bsRangeValue[0],
        "fim":   this.bsRangeValue[1]
    }


    ).subscribe((itens: any) => {


//   for(var i=0; i<itens.length;i++){
  //    itens[i].dataDaVenda=itens[i].dataDaVenda.  new  Date().   .toISOString()
  //  }



      this.dataSource = new MatTableDataSource(itens);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      //  this.dataSource.filter=''






  //    console.log('fdfdf', this.dataSource);
      // this.filterData("aa")
    });
  }



  visualizar(itens: any){
  //  console.log("SHELDONNNNNNNNNtttttttttttttttttttttt")
    this.detalhes=itens.itens

  //  console.log("SHELDONNNNNNNNNtttttttttttttttttttttt", itens.codigo)

    this.codigoDaVenda=itens.codigo



  }







  // editar(item: any) {
  //   console.log("ggggggggggg", item._id)
  //      this._id_produto= item._id
  //      this.descricao=item.descricao
  //      this.valor=item.valor
  //      this.data=item.data







  //    }

  desativarVenda(item: any) {







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




        this.historicoService.reporProduto(item).subscribe((x: any) => {

          this.listarAtivos()


         //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
         this.acesso.valor=111
         this.acesso.data= new  Date()
         this.acesso.perfil="EXCLUSÃOVENDA"
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












      //    console.log("MEU TESTE")
                });

      }
    })






  }







  registrarSaida(item: any) {

 //   Swal.fire({
 //     title: 'SAÍDA REGISTRADA !!!',
      // text: "You won't be able to revert this!",
 //     icon: 'warning',
 //     showCancelButton: true,
 //     confirmButtonColor: '#3085d6',
 //     cancelButtonColor: '#d33',
 //     confirmButtonText: 'SIM'
 //   }).then((result) => {
 //     if (result.isConfirmed) {
        Swal.fire(
          'SAÍDA SUCESSO!!!',
           '',
           'success'
        )



        this.historicoService.registrodaSaida(item).subscribe((x: any) => {

          this.listarAtivos()
                    });


  //    }
 //   })
  }



  ajustarPix(item: any) {

  //  Swal.fire({
  //    title: 'PAGAMENTO NO PIX REGISTRADO !!!',
      // text: "You won't be able to revert this!",
 //     icon: 'warning',
 //     showCancelButton: true,
 //     confirmButtonColor: '#3085d6',
 //     cancelButtonColor: '#d33',
 //     confirmButtonText: 'SIM'
  //  }).then((result) => {
  //    if (result.isConfirmed) {
        Swal.fire(
          'PIX SUCESSO!!!',
           '',
           'success'
        )


        item.estadodoPagamento="PIX"
        item.formaPagamento="PIX"
        item.pix=item.total
        item.dinheiro=0


        this.historicoService.estadodoPagamento(item).subscribe((x: any) => {

          this.listarAtivos()

                });



 //     }
 //   })
  }


  ajustarDinheiro(item: any) {

  //  Swal.fire({
  //    title: 'PAGAMENTO NO DINHEIRO REGISTRADO !!!',
      // text: "You won't be able to revert this!",
   //   icon: 'warning',
  //    showCancelButton: true,
  //    confirmButtonColor: '#3085d6',
 //     cancelButtonColor: '#d33',
//      confirmButtonText: 'SIM'
 //   }).then((result) => {
//      if (result.isConfirmed) {




        Swal.fire(
          'DINHEIRO SUCESSO!!!',
           '',
           'success'
        )



        item.estadodoPagamento="DINHEIRO"
        item.formaPagamento="DINHEIRO"
        item.dinheiro=item.total
        item.pix=0
     console.log("ggggggggggggggggggg",item.estadodoPagamento )

        this.historicoService.estadodoPagamento(item).subscribe((x: any) => {

          this.listarAtivos()

                });











  //    }
 ///   })
  }














  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }




  @HostListener('window:keyup', ['$event'])   // PARA OBTER AS TECLAS DE ATALHO
  keyEvent(event: KeyboardEvent) {

 // console.log(event.key)

  }




      //  PARA OCULTAR A TELA DE LOGIN CASO ESTEJA COM TOKEN


}
