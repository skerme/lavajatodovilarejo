import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

import { Produto } from '../2.PRODUTO/produto';
import { ProdutoService } from '../2.PRODUTO/produto.service';
import { HistoricoService } from '../3.HISTORICO/historico.service';
import { LivrocaixaService } from '../4.LIVROCAIXA/livrocaixa.service';
import { Registro } from '../4.LIVROCAIXA/registro';
import { Cliente } from '../5.CLIENTES/cliente';
import { ClienteService } from '../5.CLIENTES/cliente.service';
import { PessoalService } from '../6.PESSOAL/pessoal.service';
import { GestaoService } from '../7.GESTAO/gestao.service';
import { Estatistica } from '../estatistica';
import { EstatisticaService } from '../estatistica.service';
import { Compra } from './compra';
import { CompraService } from './compra.service';

@Component({
  selector: 'app-compra',
  templateUrl:'./compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  //////////////////////////////////////////////////////////////////////////////////
  ocutarmenuopcoes: boolean=false
  detalhes: any[]=[]
  codigoDaVenda:number=0















  step = 0;



  acesso = {} as Estatistica;



  formListarVendas = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  registro = {} as Registro;  // usado no executaexecutavenda()

  vendedores: any[]=[]

  vendaPorVendedor:any[]=[]

  vendaPorForma: any[]=[]


  venda = {} as Compra;

  opcao: string = '0';

  produto = {} as Produto; // usado no executaexecutavenda()

  panelOpenState = false;
  _id_produto: string = '0';
  descricao: string = '';
  precoCompra: number = 0;
  precoVendaVarejo: number = 0;
  precoVendaAtacado: number = 0;
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

  formLogin!: FormGroup;
  _id: string = '0';
  tiposDeCargos: any[] = [];
  token: string = '';

  displayedColumns = [
    'acao',
    'codigo',
    'descricao',

  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
















  displayedColumns2 = [
    'acao',
    'codigo',
    'frete',
    'tributo',
    'outros',
    'total',
    'dataDaCompra',

  ];
  dataSource2!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator2!: MatPaginator;
  @ViewChild(MatSort) matSort2!: MatSort;



  ///////////////////////////////////////////////////////////////////////////////////

  constructor(
    private formBuilder: FormBuilder,
    private compraService: CompraService,
    private consumirService: ProdutoService,
    private pessoalService: PessoalService,
    private clienteService: ClienteService,
    private livroCaixaService: LivrocaixaService,

    private gestaoService: GestaoService,
    private estatisticaService: EstatisticaService
  ) {}

  formVenda!: FormGroup;


  totalPrecoCompra: number=0
  totalPvVarejo: number=0
  totalPvAtavado: number=0

  ngOnInit() {



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     this.gestaoService.getEstoquePrecoDecusto().subscribe((itens: any) => { this.totalPrecoCompra =itens


      this.gestaoService.getPvvarejo().subscribe((itens: any) => {  this.totalPvVarejo=itens

        this.gestaoService.getPvAtacado().subscribe((itens: any) => {   this.totalPvAtavado =itens


         //////////////LOCALIZACAO///////////////////////////////
  this.acesso.valor=111
  this.acesso.data= new  Date()
  this.acesso.perfil="VENDA"
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

        });

      });

    })
   //////////////////////////////////////////////////////////////////////////////////








    window.document.getElementById("item")?.focus()

  //  this.listar();

    this.formLogin = this.formBuilder.group({
      email: ['skerme@gmail.com', [Validators.email]],
      password: ['123456'],
    });

    this.formVenda = this.formBuilder.group({
      demanda: ['atacado', [Validators.required]],
      vendedor: [, [Validators.required]],
      cpf: [null,[Validators.required,Validators.pattern('(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))')]],
      cliente: ['NÃO INFORMADO', [Validators.required]],
      codigo: [, [Validators.required]],
      forma: ['PIX', [Validators.required]],
      tamanho: ['U', [Validators.required]],
      quantidade: [1, [Validators.required]],

    });

    this.venda.totalItens = 0;

    this.venda.tributo = 0;
    this.venda.outros=0;
    this.venda.custoDosItens=0


    this.venda.valorRecebido = 0;
    this.venda.frete = 0;
    this.venda.troco = 0;
    this.venda.custoVenda = 0;








    this.listarAtivos();

   this.listarAtivosCompras();










  }

  setStep(index: number) {
    this.step = index;
  }


  nextStep() {
        this.step++;
  }

  prevStep() {
      this.step--;
  }


  ////////////////////////////////////////////////////

  @HostListener('click') onClick() {
    this.atualizarCesta()
  }








  atualizarCesta(){


    if(this.venda.itens){
      this.venda.totalItens = 0;

      this.venda.total=this.venda.frete+this.venda.tributo+this.venda.outros+this.venda.custoDosItens


    for (var i = 0; i < this.venda.itens.length; i++) {
      this.venda.totalItens += this.venda.itens[i].quantidade;






    }




  }


  }



  @HostListener('window:keyup', ['$event']) // PARA OBTER AS TECLAS DE ATALHO
  keyEvent(event: KeyboardEvent) {



 if(event.key=='Enter'){
 //PESQUISA O PRODUTO  PARA O INSERIR NA CESTA///////////////////////////////////////////////////////////////////////
 this.consumirService.listarAtivos().subscribe((itens: any) => {
  this.formVenda.value.codigo.trim()

var verificador=0
 for(var i=0; i<itens.length; i++){
   if(itens[i].codigo==this.formVenda.value.codigo.trim()){
       this.incluirCesta(itens[i])
       verificador++
   }
 }

 if(verificador==0){ {Swal.fire({icon: 'error',text:'CÓDIGO INEXISTENTE!!!'})                  } }
 this.atualizarCesta()
 });
 // //PESQUISA O PRODUTO  PARA O INSERIR NA CESTA//////////////////////////////////////////////////////////////////////////
   }
   this.atualizarCesta()  // eu repito porque se nao tiver esse nao atualiza o valor total quando dou o desconto e nao clico no mouse
  }







  incluirCesta(item: any) {
    if(this.formVenda.value.quantidade<=0){this.formVenda.value.quantidade=1}
    if (this.venda.itens == undefined) {
      this.venda.itens = new Array();
    }
    var verificaSeExisteNaCesta: boolean=false

   for (var i=0; i<this.venda.itens.length; i++){

     if((this.venda.itens[i].codigo==item.codigo)&&(this.venda.itens[i].tamanho== this.formVenda.value.tamanho)){
      verificaSeExisteNaCesta=true
     }else{
     }

   }



// ENTRA QUI S EO PRODUTO NAO EXIST ENA CESTA
if(!verificaSeExisteNaCesta){


  var verificador=0








// se oprosuto existe na cesta ele vai adioncar 1 na quantidade
  for (var i = 0; i < this.venda.itens.length; i++) {
 //   console.log('tttttttttttttt2', item, this.venda.itens[i]);


    if((this.venda.itens[i].codigo==item.codigo)&&(this.venda.itens[i].tamanho==this.formVenda.value.tamanho)){
      verificador+=2
      this.venda.itens[i].quantidade+=1

     }



  }
// se oprosuto existe na cesta ele vai adioncar 1 na quantidade

//console.log('VERIFICADORrrrrrrrrrrrrrrrrrrrrRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR', verificador);
  if(verificador==0){   // so entra aqui se for produto novo;
 //   console.log('AAAAAAAAAAAAAAAAAAAAAAA2', this.venda.itens[i]);
  var aux: number = 0;
  if (this.formVenda.value.demanda == 'atacado') {
    aux = item.precoVendaAtacado;
//    console.log("1111", item.precoVendaAtacado)
  } else {
    aux = item.precoVendaVarejo;
//     console.log("2222", item.precoVendaVarejo)
  }

   var subtotal = aux * 1;
 this.venda.itens.push({
    codigo: item.codigo,
    tamanho: this.formVenda.value.tamanho,
    quantidade: this.formVenda.value.quantidade,
    descricao: item.descricao
  });

  this.formVenda.value.quantidade=1


  //console.log('BBBBBBBBBBBBBBBBBBBBBBBB', this.venda.itens[i]);
   }   // so entra aqui se for produto novo;

}
// ENTRA QUI S EO PRODUTO NAO EXIST ENA CESTA
this.formVenda.value.codigo=''
  }












  comprar() {
    this.venda.total=this.venda.frete+this.venda.tributo+this.venda.outros+this.venda.custoDosItens

console.log('sem itens na cestarrrrrrrrrrrrrr', this.venda);



  this.compraService.vender(this.venda).subscribe((x: any) => {
    this.venda.itens = [];


    this.venda.totalItens = 0;

    this.venda.tributo = 0;

    this.venda.total = 0;
    this.venda.valorRecebido = 0;
    this.venda.frete = 0;
    this.venda.outros=0
     this.venda.troco = 0;
    this.venda.custoVenda=0

    this.listarAtivosCompras();
console.log("ddddddddd")


     //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
     this.acesso.valor=111
     this.acesso.data= new  Date()
     this.acesso.perfil="NOVACOMPRA"
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

    window.document.getElementById("item")?.focus()

    this.listarAtivos()
  }






  listarAtivos() {
    this.consumirService.listarAtivos().subscribe((itens: any) => {
      this.dataSource = new MatTableDataSource(itens);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
  }








  editar(item: any) {
   // console.log('ggggggggggg', item._id);
    this._id_produto = item._id;
    this.descricao = item.descricao;
    this.precoCompra = item.precoCompra;
    this.precoVendaVarejo = item.precoVendaVarejo;
    this.precoVendaAtacado = item.precoVendaAtacado;
    this.tamanho_P = item.tamanhos[0].quantidade;
    this.tamanho_M = item.tamanhos[1].quantidade;
    this.tamanho_G = item.tamanhos[2].quantidade;
    this.tamanho_GG = item.tamanhos[3].quantidade;
    this.tamanho_36 = item.tamanhos[4].quantidade;
    this.tamanho_38 = item.tamanhos[5].quantidade;
    this.tamanho_40 = item.tamanhos[6].quantidade;
    this.tamanho_42 = item.tamanhos[7].quantidade;
    this.tamanho_44 = item.tamanhos[8].quantidade;
    this.tamanho_46 = item.tamanhos[9].quantidade;
    this.tamanho_48 = item.tamanhos[10].quantidade;
  }

  excluir(item: any) {
    this.consumirService.deleteCar(item._id).subscribe((x) => {});
  }

  limpar() {
    this._id = '0';
    //  this.formTask.reset();

    this.descricao = '';
    this.precoCompra = 0;
    this.precoVendaVarejo = 0;
    this.precoVendaAtacado = 0;
    this.tamanho_P = 0;
    this.tamanho_M = 0;
    this.tamanho_G = 0;
    this.tamanho_GG = 0;
    this.tamanho_36 = 0;
    this.tamanho_38 = 0;
    this.tamanho_40 = 0;
    this.tamanho_42 = 0;
    this.tamanho_44 = 0;
    this.tamanho_46 = 0;
    this.tamanho_48 = 0;
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }


   Aumentaritem(i:number) {
    this.venda.itens[i].quantidade++
    this.atualizarCesta()
  }

  Diminuiritem(i:number) {
    this.venda.itens[i].quantidade--
    if(this.venda.itens[i].quantidade==0){
      this.excluiritem(i)
   }
    this.atualizarCesta()
  }

  excluiritem(i: number) {

    this.venda.itens.splice(i, 1);
    this.atualizarCesta()


  }

excluircesta(){
  this.venda.itens.length=0
}







//////////////HISTORICO

listarAtivosCompras() {



  console.log("gggg",  this.formListarVendas.value.start )


        this.formListarVendas.value.end.setFullYear((this.formListarVendas.value.end.getFullYear()+1))
        this.formListarVendas.value.start.setFullYear(2021)



      this.compraService.listarAtivos(

        {
          "inicio":this.formListarVendas.value.start,
          "fim":this.formListarVendas.value.end
      }


      ).subscribe((itens: any) => {



        console.log("gggg",  this.formListarVendas.value.start, itens )


  //   for(var i=0; i<itens.length;i++){
    //    itens[i].dataDaVenda=itens[i].dataDaVenda.  new  Date().   .toISOString()
    //  }



        this.dataSource2 = new MatTableDataSource(itens);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.matSort;
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

  desativarVenda(item: any) {



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

          this.listarAtivosCompras()
        });

      }
    })






  }

  filterData2($event: any) {
    this.dataSource2.filter = $event.target.value;
  }
}
