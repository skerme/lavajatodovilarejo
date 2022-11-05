import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { GestaoService } from '../7.GESTAO/gestao.service';
import { Estatistica } from '../estatistica';
import { EstatisticaService } from '../estatistica.service';
import { Produto } from './produto';
import { ProdutoService } from './produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  acesso = {} as Estatistica;

  step =1;

historicoProduto: any[]=[]

  escolhido: any[]=[]

  salvacodigoparahistotico: number=0
  salvaquantidadeparahistotico: number=0

  executavenda = {} as Produto;  // usado no executaexecutavenda()


  panelOpenState = false;
  codigo: number=0;
  _id_produto: string='0'
  descricao: string = '';
  precoCompra: number = 0;
  precoVendaVarejo: number = 0;
  precoVendaAtacado: number = 0;
  dataCriacao: Date=new Date()
  tamanho_P: number = 0;
  tamanho_M: number = 0;
  tamanho_G: number = 0;
  tamanho_GG: number = 0;
  tamanho_36: number = 0;
  tamanho_38: number = 0;
  tamanho_40: number = 0;
  tamanho_42: number = 0;
  tamanho_44: number = 0;
  tamanho_46: number = 0;
  tamanho_48: number = 0;
  tamanho_U: number = 0;



  formLogin!: FormGroup;
  _id: string = '0';
  tiposDeCargos: any[] = [];
  token: string = '';

  displayedColumns = [
    'acao',
   // 'codigo',
    'descricao',
  //  'precoCompra',
    'precoVendaVarejo',
 //   'precoVendaAtacado',
//    'dataAlteracao',
 //   'dataCriacao',
    // 'tamanhos[0].quantidade',
    // 'tamanhos[1].quantidade',
    // 'tamanhos[2].quantidade',
    // 'tamanhos[3].quantidade',
    // 'tamanhos[4].quantidade',
    // 'tamanhos[5].quantidade',
    // 'tamanhos[6].quantidade',
    // 'tamanhos[7].quantidade',
    // 'tamanhos[8].quantidade',
    // 'tamanhos[9].quantidade',
    // 'tamanhos[10].quantidade',
  //  'tamanhos[11].quantidade',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;









////////////////////////////////////////listar historico///////////////////////////////

  displayedColumns2 = [
    'codigo',
    'descricao',
    'precoCompra',
    'precoVendaVarejo',
    'precoVendaAtacado',
    'dataAlteracao',
    'dataCriacao',
    // 'tamanhos[0].quantidade',
    // 'tamanhos[1].quantidade',
    // 'tamanhos[2].quantidade',
    // 'tamanhos[3].quantidade',
    // 'tamanhos[4].quantidade',
    // 'tamanhos[5].quantidade',
    // 'tamanhos[6].quantidade',
    // 'tamanhos[7].quantidade',
    // 'tamanhos[8].quantidade',
    // 'tamanhos[9].quantidade',
    // 'tamanhos[10].quantidade',
    'tamanhos[11].quantidade',
  ];
  dataSource2!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator2!: MatPaginator;
  @ViewChild(MatSort) matSort2!: MatSort;
///////////////////////////////////////////////listar historico///////////////////////////////


  constructor(
    private consumirService: ProdutoService,
    private formBuilder: FormBuilder,
    private estatisticaService: EstatisticaService,
    private gestaoService: GestaoService
    ) { }




    totalItensEstoque: number=0
    totalPrecoCompra: number=0
    totalPvVarejo: number=0
    totalPvAtavado: number=0
  ngOnInit() {

     //////////////LOCALIZACAO///////////////////////////////
  this.acesso.valor=111
  this.acesso.data= new  Date()
  this.acesso.perfil="PRODUTO"
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
  //        console.log("nao", resposta, "hfghgf",resposta.message)
      })
//////LOCALIZACAO//////////////////////////////////////


   this.listar();
   this.listarAtivo();




   this.formLogin = this.formBuilder.group({
     email: ['skerme@gmail.com', [Validators.email]],
     password: ['123456'],
   });




   window.document.getElementById("descricao")?.focus()

  }

  setStep(index: number) {
    this.step = index;
  }


  nextStep() {
    if(this.step<4){
      this.step++;
    }else{
      this.step=0
    }

  }

  prevStep() {
    if(this.step>0){
    this.step--;
    }
    else {
      this.step=4
    }
  }


  @HostListener('click') onClick() {
 //   console.log(
  //    'dsdsd2222222222222222222222222222222222222222222222222222222222222222'
//    );
  //  this.listarAtivo();
  }




  inserir() {

  //  console.log('fffffffff', this._id);
    this.executavenda.codigo=this.codigo
    this.executavenda._id=this._id_produto
    this.executavenda.descricao=this.descricao
    this.executavenda.precoCompra=this.precoCompra
    this.executavenda.precoVendaAtacado=this.precoVendaAtacado
    this.executavenda.precoVendaVarejo=this.precoVendaVarejo
    this.executavenda.dataCriacao= this.dataCriacao
    this.executavenda.tamanhos=new Array()

    this.executavenda.tamanhos.push({tamanho:"P", quantidade:this.tamanho_P})
    this.executavenda.tamanhos.push({tamanho:"M", quantidade:this.tamanho_M})
    this.executavenda.tamanhos.push({tamanho:"G", quantidade:this.tamanho_G})
    this.executavenda.tamanhos.push({tamanho:"GG", quantidade:this.tamanho_GG})
    this.executavenda.tamanhos.push({tamanho:"36", quantidade:this.tamanho_36})
    this.executavenda.tamanhos.push({tamanho:"38", quantidade:this.tamanho_38})
    this.executavenda.tamanhos.push({tamanho:"40", quantidade:this.tamanho_40})
    this.executavenda.tamanhos.push({tamanho:"42", quantidade:this.tamanho_42})
    this.executavenda.tamanhos.push({tamanho:"44", quantidade:this.tamanho_44})
    this.executavenda.tamanhos.push({tamanho:"46", quantidade:this.tamanho_46})
    this.executavenda.tamanhos.push({tamanho:"48", quantidade:this.tamanho_48})
    this.executavenda.tamanhos.push({tamanho:"U", quantidade:this.tamanho_U})



  if(this._id_produto=='0'){

  //  console.log("entrouuuuuuuuuuuuuuuuuuu11111111111111111")
    this.consumirService.saveCar('p',this.executavenda).subscribe((x) => {


            if( x.success){ {Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM SUCESSO!!'})}

            }

             this.listarAtivo();
             this.limpar();






         //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
         this.acesso.valor=111
         this.acesso.data= new  Date()
         this.acesso.perfil="INSERÇÃOPRODUTO"
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
            this.consumirService.atualizar(this.executavenda._id,this.executavenda).subscribe((x) => {






////////////////////inserir historico/////////////
//console.log("entrouuuuuuuuuuuuuuuuuuu2222222222")

this.executavenda.codigo=this.salvacodigoparahistotico



this.executavenda.quantAjustada=this.executavenda.tamanhos[0].quantidade+this.executavenda.tamanhos[1].quantidade+this.executavenda.tamanhos[2].quantidade+this.executavenda.tamanhos[3].quantidade+this.executavenda.tamanhos[4].quantidade+this.executavenda.tamanhos[5].quantidade+this.executavenda.tamanhos[6].quantidade+this.executavenda.tamanhos[7].quantidade+this.executavenda.tamanhos[8].quantidade+this.executavenda.tamanhos[9].quantidade+this.executavenda.tamanhos[10].quantidade+this.executavenda.tamanhos[11].quantidade-this.salvaquantidadeparahistotico





    this.consumirService.saveCar('h',this.executavenda).subscribe((x) => {
      // if( x.success){ {Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM SUCESSO!!'})}
      // }
       this.listar();
     });
////////////////////inserir historico/////////////


this.listarAtivo();
this.limpar();





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


this.gestaoService.getEstoquePrecoDecusto().subscribe((itens: any) => { this.totalPrecoCompra =itens


  this.gestaoService.getPvvarejo().subscribe((itens: any) => {  this.totalPvVarejo=itens

    this.gestaoService.getPvAtacado().subscribe((itens: any) => {   this.totalPvAtavado =itens
      this.gestaoService.getEstoqueQuantidadeItens().subscribe((itens: any) => { this.totalItensEstoque =itens

     //////////////LOCALIZACAO///////////////////////////////
this.acesso.valor=111
this.acesso.data= new  Date()
this.acesso.perfil="ATUALIZAÇÃOPRODUTO"
this.acesso .descricao="NÃOFORNECEU"
this.acesso .pc=this.totalPrecoCompra
this.acesso .pvv= this.totalPvVarejo
this.acesso .pva=this.totalPvAtavado
this.acesso .qdtItens=this.totalItensEstoque
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
});
    });

  });

})
//////////////////////////////////////////////////////////////////////////////////























            });


          }

  this._id_produto='0'

  window.document.getElementById("descricao")?.focus()
  }

   listar() {
    this.consumirService.listar().subscribe((itens: any) => {
      this.historicoProduto=itens
      this.dataSource2 = new MatTableDataSource(itens);
      this.dataSource2.paginator = this.paginator2;
      this.dataSource2.sort = this.matSort2;

    });
   }

  editar(item: any) {
    this.step=0

 this.salvacodigoparahistotico=item.codigo

 this.salvaquantidadeparahistotico=item.tamanhos[0].quantidade+item.tamanhos[1].quantidade+item.tamanhos[2].quantidade+item.tamanhos[3].quantidade+item.tamanhos[4].quantidade+item.tamanhos[5].quantidade+item.tamanhos[6].quantidade+item.tamanhos[7].quantidade+item.tamanhos[8].quantidade+item.tamanhos[9].quantidade+item.tamanhos[10].quantidade+item.tamanhos[11].quantidade

////////////////////inserir historico/////////////
console.log("entrouuuuuuuuuuuuuuuuuuu",item)

    this.consumirService.saveCar('h',item).subscribe((x) => {
      // if( x.success){ {Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM SUCESSO!!'})}
      // }
       this.listar();
     });
////////////////////inserir historico/////////////




  //  console.log("ggggggggggg", item._id)
       this.codigo= item.id
       this._id_produto= item._id
       this.descricao=item.descricao
       this.precoCompra=item.precoCompra
       this.precoVendaVarejo=item.precoVendaVarejo
       this.precoVendaAtacado=item.precoVendaAtacado
       this.dataCriacao=item.dataCriacao
       this.tamanho_P=item.tamanhos[0].quantidade
       this.tamanho_M=item.tamanhos[1].quantidade
       this.tamanho_G=item.tamanhos[2].quantidade
       this.tamanho_GG=item.tamanhos[3].quantidade
       this.tamanho_36=item.tamanhos[4].quantidade
       this.tamanho_38=item.tamanhos[5].quantidade
       this.tamanho_40=item.tamanhos[6].quantidade
       this.tamanho_42=item.tamanhos[7].quantidade
       this.tamanho_44=item.tamanhos[8].quantidade
       this.tamanho_46=item.tamanhos[9].quantidade
       this.tamanho_48=item.tamanhos[10].quantidade
       this.tamanho_U=item.tamanhos[11].quantidade





     }

  excluir(item: any) {
    this.consumirService.deleteCar(item._id).subscribe((x) => {});
  }



  listarAtivo() {
    this.consumirService.listarAtivos().subscribe((itens: any) => {
      this.dataSource = new MatTableDataSource(itens);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;

   //   console.log('fdfdf', itens);

    });
  }



  limpar() {
    this._id = '0';
  //  this.formTask.reset();

    this.descricao = '';
    this.precoCompra = 0;
    this.precoVendaVarejo = 0;
    this.precoVendaAtacado = 0;

    this.tamanho_P=0;
    this.tamanho_M=0
    this.tamanho_G=0
    this.tamanho_GG=0
    this.tamanho_36=0
    this.tamanho_38=0
    this.tamanho_40=0
    this.tamanho_42=0
    this.tamanho_44=0
    this.tamanho_46=0
    this.tamanho_48=0
    this.tamanho_U=0
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  filterData2($event: any) {
    this.dataSource2.filter = $event.target.value;
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




        this.consumirService.atualizar(item._id,item).subscribe((x) => {

//////////////////inserir historico/////////////
item.tamanhos[11].quantidade=-1
    this.consumirService.saveCar('h',item).subscribe((x) => {
        this.listar();
     });
////////////////////inserir historico/////////////


//////REGISTRO  DE DELEÇÃO DE ITEM//////////////////////////////////////
     this.acesso.valor=111
     this.acesso.data= new  Date()
     this.acesso.perfil="EXCLUSÃOPRODUTO"
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
   //////REGISTRO  DE DELEÇÃO DE ITEM//////////////////////////////////////






















          this.listarAtivo()

                  });

      }
    })




      }




  // entrar() {
  //   this.consumirService.logar(this.formLogin.value).subscribe(
  //     (x) => {
  //       console.log('ffffffffff', this.formLogin.value);

  //       this.token = x.access_token;

  //       sessionStorage.setItem('token', this.token);

  //       this.listar();
  //     },
  //     (erro) => {
  //       if (erro.status == 401) {
  //         this.token = 'SENHA OU EMAIL INCORRETOS';
  //         console.log('Senha incorreta');
  //       }
  //     }
  //   );
  // }
  sair() {
    this.dataSource.filter = 'limpartudo';
    this.dataSource2.filter = 'limpartudo';
    this.token = '';
    sessionStorage.removeItem('token');
  }





  @HostListener('window:keyup', ['$event'])   // PARA OBTER AS TECLAS DE ATALHO
  keyEvent(event: KeyboardEvent) {
 if(event.key=='F2'){
 this.inserir()
 }
 // console.log(event.key)

  }




///EM CONSTRUCAO
// titulo=''
// preco=''
// u='U'
//   gerarpdf(item: any){

//     this.titulo= item.descricao
//     this.preco= item.precoVendaVarejo

// // JsBarcode("#barcode")
// // .options({font: "OCR-B"}) // Will affect all barcodes
// // .CODE128(item.codigo,   {height: 85, textPosition: "botom", fontSize: 40, marginTop: 0, displayValue:true})
// // // .blank(147) // Create space between the barcodes
// // // .CODE128("222",  {height: 85, textPosition: "top", fontSize: 16, marginTop: 15})
// // // .blank(150) // Create space between the barcodes
// // // .CODE128("333",  {height: 85, textPosition: "top", fontSize: 16, marginTop: 15})
// // // .blank(143) // Create space between the barcodes
// // // .CODE128("444",  {height: 85, textPosition: "top", fontSize: 16, marginTop: 15})
// // // .blank(150) // Create space between the barcodes
// // // .CODE128("555",  {height: 85, textPosition: "top", fontSize: 16, marginTop: 15})
// // .render();
// }
// ///EM CONSTRUCAO






 }
