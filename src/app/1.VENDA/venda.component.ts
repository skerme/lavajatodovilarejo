

import { ThisReceiver } from '@angular/compiler';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { Venda } from './venda';

import { VendaService } from './venda.service';






@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css'],
})
export class VendaComponent implements OnInit {
  //////////////////////////////////////////////////////////////////////////////////
  valor_predicoes: any


  META=0
  valorRCB: number = 0;
  acesso = {} as Estatistica;
  valorDESPESA: number=0;

  formListarVendas = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  registro = {} as Registro;  // usado no executaexecutavenda()

  vendedores: any[]=[]

  vendaPorVendedor:any[]=[]

  vendaPorForma: any[]=[]


  venda = {} as Venda;

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
    'precoVendaVarejo',
    // 'precoVendaAtacado',
   // 'ordem'
  ];





  dataSource!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;




  displayedColumnsClientes = [
    'acao',
    'nome',
  ];


  dataSourceClientes!: MatTableDataSource<any>;
  @ViewChild('paginatorClientes') paginatorClientes!: MatPaginator;
  @ViewChild(MatSort) matSortClientes!: MatSort;


  ///////////////////////////////////////////////////////////////////////////////////

  constructor(
    private formBuilder: FormBuilder,
    private vendaService: VendaService,
    private consumirService: ProdutoService,
    private pessoalService: PessoalService,
    private clienteService: ClienteService,
    private livroCaixaService: LivrocaixaService,
    private historicoService: HistoricoService,
    private gestaoService: GestaoService,
    private estatisticaService: EstatisticaService
  ) {}

  formVenda!: FormGroup;

  totalItensEstoque: number=0
  totalPrecoCompra: number=0
  totalPvVarejo: number=0
  totalPvAtavado: number=0

  ngOnInit() {


      // this.estatisticaService.predicoes( {   "dia":2} ).subscribe((itens: any) => { console.log(itens); this.valor_predicoes=itens});


    var data=new Date()
    var METASEMANA=[0,5351.84,5394.24,5436.63,5479.03,5521.43,5563.83]
    console.log(data.getDay())
    this.META=METASEMANA[data.getDay()]
    this.RCB()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     this.gestaoService.getEstoquePrecoDecusto().subscribe((itens: any) => { this.totalPrecoCompra =itens


      this.gestaoService.getPvvarejo().subscribe((itens: any) => {  this.totalPvVarejo=itens

        this.gestaoService.getPvAtacado().subscribe((itens: any) => {   this.totalPvAtavado =itens



          this.gestaoService.getEstoqueQuantidadeItens().subscribe((itens: any) => { this.totalItensEstoque =itens




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

      });

    })
   //////////////////////////////////////////////////////////////////////////////////









    this.DESPESA()

    window.document.getElementById("item")?.focus()

  //  this.listar();

    this.formLogin = this.formBuilder.group({
      email: ['skerme@gmail.com', [Validators.email]],
      password: ['123456'],
    });

    this.formVenda = this.formBuilder.group({
      demanda: ['varejo', [Validators.required]],
      vendedor: [, [Validators.required]],
      cpf: [null,[Validators.required,Validators.pattern('(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))')]],
      cliente: ['NÃO INFORMADO', [Validators.required]],
      codigo: [, [Validators.required]],
      forma: ['PIX', [Validators.required]],
      tamanho: ['U', [Validators.required]],
      quantidade: [1, [Validators.required]],

    });

    this.venda.totalItens = 0;
    this.venda.subtotal = 0;
    this.venda.acrescimo = 0;

    this.venda.total = 0;
    this.venda.valorRecebido = 0;
    this.venda.desconto = 0;
    this.venda.troco = 0;
    this.venda.custoVenda = 0;


    this.venda.pix =0;
    this.venda.dinheiro=0;
    this.venda.debito=0;
    this.venda.credito=0;





    this.listarAtivos();
    this.carregarVendedores()
    this.listarVendedorTotal();
    this.listarFormaPagamentoTotal();
    this.lerAberturaCaixa();


    this.listarAtivoClientes()







  }



selecionarCliente(item: any){
               this.formVenda.value.cliente=item.nome
               this.formVenda.value.nome_cliente=item.pontoReferencia
            console.log("ffffffffffff", item, item.nome, item.pontoReferencia)

                                                                  }












  ////////////////////////////////////////////////////

  @HostListener('click') onClick() {
    this.RCB()
    this.atualizarCesta()
  }




  atualizarCesta(){
    this.RCB()
  //  console.log("rRRRRRRRRRRRRRRRR111111111111111", this.venda.total)

    if(this.venda.itens){
      this.venda.totalItens = 0;
      this.venda.total=0
      this.venda.custoVenda=0
      this.venda.subtotal=0

    for (var i = 0; i < this.venda.itens.length; i++) {
      this.venda.totalItens += this.venda.itens[i].quantidade;
      this.venda.itens[i].subtotal= this.venda.itens[i].quantidade*this.venda.itens[i].valorUnitario;


      this.venda.total += this.venda.itens[i].subtotal;
      this.venda.custoVenda+=this.venda.itens[i].precoCompra*this.venda.itens[i].quantidade
      this.venda.subtotal+= this.venda.itens[i].subtotal

    }
    this.venda.total=this.venda.subtotal-this.venda.desconto+this.venda.acrescimo



  }




//    this.listarAtivos();


    this.listarVendedorTotal();
     this.listarFormaPagamentoTotal();

  //   console.log("rRRRRRRRRRRRRRRRR222222222", this.venda.total)

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



  carregarVendedores(){
  this.pessoalService.listarVendedores().subscribe((itens: any) => {



    if (this.vendedores == undefined) {
      this.vendedores = new Array();
    }else{
      this.vendedores.length=0
    }



  for(var i=0; i<itens.length;i++){

         this.vendedores.push(   itens[i].nome.split(" ")[0]  )

  }

  this.venda.vendedor=this.vendedores[0]

//console.log("gggggggggggg2222222222222222222", this.formVenda.value.vendedor)




  });

}




  incluirCesta(item: any) {


    if(this.formVenda.value.quantidade<=0){this.formVenda.value.quantidade=1}

  //  console.log('00000000000000000000000000000',  this.venda);

    if (this.venda.itens == undefined) {
      this.venda.itens = new Array();

  //    console.log('111111111111111111111111111111',  this.venda);
    }



    var verificaSeExisteNaCesta: boolean=false


 //   console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",this.venda.itens)
   for (var i=0; i<this.venda.itens.length; i++){

     if((this.venda.itens[i].demanda==this.formVenda.value.demanda)&&(this.venda.itens[i].codigo==item.codigo)&&(this.venda.itens[i].tamanho== this.formVenda.value.tamanho)){
      verificaSeExisteNaCesta=true
     }else{
  //    console.log("naooooooooooooooooooooooooooooooa")
     }

   }



// ENTRA QUI S EO PRODUTO NAO EXIST ENA CESTA
if(!verificaSeExisteNaCesta){
  this.venda.total = 0;
  this.venda.subtotal = 0;
  var verificador=0





//verificar se o item escolhido tem ao menos 1 unidade no tamanho solicitado
for (var i = 0; i < item.tamanhos.length; i++) {



 // console.log('TEM QUANTIDADE SUFICIENTE11',i, item.tamanhos[i], "XX",item.tamanhos[i].tamanho,"YY",this.formVenda.value.tamanho,item.tamanhos[i].quantidade);

  if((this.formVenda.value.tamanho==item.tamanhos[i].tamanho)&&(item.tamanhos[i].quantidade<this.formVenda.value.quantidade))
  {
 //   console.log('SE ENTRAR AQUI EH PORQUE O PRDUTO NAO TEM QUANTIDADE SUFUCIENTE', item.tamanhos[i]);
    verificador++
  }

}
//verificar se o item escolhido tem ao menos 1 unidade no tamanho solicitado





if( verificador){Swal.fire({icon: 'error',text:'ESTOQUE INSUFICIENTE!!!'})                  }






// se oprosuto existe na cesta ele vai adioncar 1 na quantidade
  for (var i = 0; i < this.venda.itens.length; i++) {
 //   console.log('tttttttttttttt2', item, this.venda.itens[i]);


    if((this.venda.itens[i].codigo==item.codigo)&&(this.venda.itens[i].demanda==this.formVenda.value.demanda)&&(this.venda.itens[i].tamanho==this.formVenda.value.tamanho)){
      verificador+=2
      this.venda.itens[i].quantidade+=1
      this.venda.itens[i].subtotal= this.venda.itens[i].quantidade*this.venda.itens[i].valorUnitario
     }

     this.venda.subtotal+=this.venda.itens[i].subtotal
     this.venda.total += this.venda.subtotal;
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
    precoCompra: item.precoCompra,
    valorUnitario: aux,
    demanda: this.formVenda.value.demanda,
    subtotal: subtotal,
    descricao: item.descricao
  });
  this.venda.subtotal+=this.venda.itens[i].subtotal
  this.formVenda.value.quantidade=1


  //console.log('BBBBBBBBBBBBBBBBBBBBBBBB', this.venda.itens[i]);
   }   // so entra aqui se for produto novo;



}
// ENTRA QUI S EO PRODUTO NAO EXIST ENA CESTA

this.formVenda.value.codigo=''

  }

  vender() {
  //  console.log('sem itens na cesta', this.venda);


var quantidadeFormasPagamento=0

    if(this.venda.pix>0){quantidadeFormasPagamento++}
    if(this.venda.dinheiro>0){quantidadeFormasPagamento++}
    if(this.venda.debito>0){quantidadeFormasPagamento++}
    if(this.venda.credito>0){quantidadeFormasPagamento++}


//verifica se foram inseridos valores em ao menos duas formas de pagamento
if(quantidadeFormasPagamento>1){
  if(this.venda.pix+this.venda.dinheiro+this.venda.debito+this.venda.credito>=this.venda.total){

    this.venda.formaPagamento=''

    if(this.venda.pix>0){this.venda.formaPagamento+="PIX "}
    if(this.venda.dinheiro>0){this.venda.formaPagamento+="DINHEIRO "}
    if(this.venda.debito>0){this.venda.formaPagamento+="DÉBITO "}
    if(this.venda.credito>0){this.venda.formaPagamento+="CRÉDITO "}


////EXECUCAO DA VENDA2222

 //   Swal.fire({icon:  'success',text:'VENDA APROVADA!!!'})

this.venda.cliente = this.formVenda.value.cliente;
this.venda.nome_cliente = this.formVenda.value.nome_cliente;
this.venda.demanda = this.formVenda.value.demanda;


//(this.venda.formaPagamento = this.formVenda.value.forma),

console.log("ddddddddd111", this.venda.pix, this.venda.dinheiro, this.venda.debito, this.venda.credito, "fdfd",quantidadeFormasPagamento )
//console.log('sem itens na cestarrrrrrrrrrrrrr', this.venda);

  this.vendaService.vender(this.venda).subscribe((x: any) => {
    this.venda.itens = [];


    this.venda.totalItens = 0;
    this.venda.subtotal = 0;
    this.venda.acrescimo = 0;

    this.venda.total = 0;
    this.venda.valorRecebido = 0;
    this.venda.desconto = 0;
     this.venda.troco = 0;
    this.venda.custoVenda=0


    this.carregarVendedores()


    this.listarAtivos();





console.log("ddddddddd2222", this.venda.pix, this.venda.dinheiro, this.venda.debito, this.venda.credito , "fdfd",quantidadeFormasPagamento)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
this.gestaoService.getEstoquePrecoDecusto().subscribe((itens: any) => { this.totalPrecoCompra =itens


  this.gestaoService.getPvvarejo().subscribe((itens: any) => {  this.totalPvVarejo=itens

    this.gestaoService.getPvAtacado().subscribe((itens: any) => {   this.totalPvAtavado =itens
      this.gestaoService.getEstoqueQuantidadeItens().subscribe((itens: any) => { this.totalItensEstoque =itens

     //////////////LOCALIZACAO///////////////////////////////
this.acesso.valor=111
this.acesso.data= new  Date()
this.acesso.perfil="VENDAEXECUTADA"
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












       this.RCB()

  });


////EXECUCAO DA VENDA222



  }else{    Swal.fire({icon: 'error',text:'VALOR INSUFICIENTE, NO  PAGAMENTO MULTIPLO!!!'})  }


}
 //verifica se foram inseridos valores em ao menos duas formas de pagamento


else{

  console.log("ddddddddd333", this.venda.pix, this.venda.dinheiro, this.venda.debito, this.venda.credito , "fdfd",quantidadeFormasPagamento)
   //vai ser forma de pagamento unica entao desprezar valor e escolher apenaso tipo marcaddo

  if(this.formVenda.value.forma=='PIX'){this.venda.pix= this.venda.total}
  if(this.formVenda.value.forma=='DINHEIRO'){this.venda.dinheiro= this.venda.total}
  if(this.formVenda.value.forma=='DÉBITO'){this.venda.debito= this.venda.total}
  if(this.formVenda.value.forma=='CRÉDITO'){this.venda.credito= this.venda.total}








 ////EXECUCAO DA VENDA111

 //Swal.fire({icon:  'success',text:'VENDA APROVADA!!!'})

 this.venda.cliente = this.formVenda.value.cliente;
 this.venda.nome_cliente = this.formVenda.value.nome_cliente;
 this.venda.demanda = this.formVenda.value.demanda;


 (this.venda.formaPagamento = this.formVenda.value.forma),


 //console.log('sem itens na cestarrrrrrrrrrrrrr', this.venda);

   this.vendaService.vender(this.venda).subscribe((x: any) => {
     this.venda.itens = [];

     console.log("ddddddddd444", this.venda.pix, this.venda.dinheiro, this.venda.debito, this.venda.credito , "fdfd",quantidadeFormasPagamento)
     this.venda.totalItens = 0;
     this.venda.subtotal = 0;
     this.venda.acrescimo = 0;

     this.venda.total = 0;
     this.venda.valorRecebido = 0;
     this.venda.desconto = 0;
      this.venda.troco = 0;
     this.venda.custoVenda=0


     this.carregarVendedores()
     this.RCB()
   });

 ////EXECUCAO DA VENDA111


  //vai ser forma de pagamento unica entao desprezar valor e escolher apenaso tipo marcaddo






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
this.gestaoService.getEstoquePrecoDecusto().subscribe((itens: any) => { this.totalPrecoCompra =itens


  this.gestaoService.getPvvarejo().subscribe((itens: any) => {  this.totalPvVarejo=itens

    this.gestaoService.getPvAtacado().subscribe((itens: any) => {   this.totalPvAtavado =itens
      this.gestaoService.getEstoqueQuantidadeItens().subscribe((itens: any) => { this.totalItensEstoque =itens

     //////////////LOCALIZACAO///////////////////////////////
this.acesso.valor=111
this.acesso.data= new  Date()
this.acesso.perfil="VENDAEXECUTADA"
this.acesso .descricao="NÃOFORNECEU"
this.acesso .pc=this.totalPrecoCompra
this.acesso .pvv= this.totalPvVarejo
this.acesso .pva=this.totalPvAtavado
this.acesso. qdtItens=this.totalItensEstoque
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















}







    this.venda.pix =0;
    this.venda.dinheiro=0;
    this.venda.debito=0;
    this.venda.credito=0;



    this.listarFormaPagamentoTotal();

    window.document.getElementById("item")?.focus()

    this.listarAtivos()

    this.formVenda.value.cliente='NÃO INFORMADO'
    this.formVenda.value.codigo=''
  }





  listarAtivoClientes(){
  this.clienteService.listarAtivo().subscribe((clientes: any) => {






    this.dataSourceClientes = new MatTableDataSource(clientes);
    this.dataSourceClientes.paginator = this.paginatorClientes;
    this.dataSourceClientes.sort = this.matSortClientes;

   });


  }






  listarAtivos() {





    this.consumirService.listarAtivos().subscribe((itens: any) => {



// era para REMOVER TODOS OS PRODUTOS COM ESTOQUE ZERO
      // for (var i=0; i<itens.length;i++)
      // {

      //   var quantidade=itens[i].tamanhos[0].quantidade+itens[i].tamanhos[1].quantidade+itens[i].tamanhos[2].quantidade+itens[i].tamanhos[3].quantidade+itens[i].tamanhos[4].quantidade
      //   +itens[i].tamanhos[5].quantidade+itens[i].tamanhos[6].quantidade+itens[i].tamanhos[7].quantidade+itens[i].tamanhos[8].quantidade+itens[i].tamanhos[9].quantidade
      //   +itens[i].tamanhos[10].quantidade+itens[i].tamanhos[11].quantidade



      //    if(quantidade<1)
      //     {
      //          itens.splice(i,1)
      //     }



      // }
// era para REMOVER TODOS OS PRODUTOS COM ESTOQUE ZERO





 // PARA MANTER A TABELA ORDENA NA FORMA DECRESCENTE
 itens.sort(function(a:any, b:any){return a.ordem-b.ordem});
 itens=itens

 console.log("vvvvvvvvvvv",itens)
////////////////////////////////////fim//////////////////











      this.dataSource = new MatTableDataSource(itens);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;

    });
  }

  listarFormaPagamentoTotal() {

    this.formListarVendas.value.start=new Date()
    this.formListarVendas.value.end=new Date()


    this.formListarVendas.value.start.setHours(this.formListarVendas.value.start.getHours()-4)

    this.formListarVendas.value.end.setHours(this.formListarVendas.value.end.getHours()-4)



    this.vendaService.listarFormaPagamentoTotal(

      {
        "inicio":this.formListarVendas.value.start,
        "fim":this.formListarVendas.value.end
    }


      ).subscribe((itens: any) => {
 //console.log("fffffffffffffKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK", itens, itens.length)

if(itens.length>0){
  this.vendaPorForma = itens
  this.vendaPorForma[0].dinheiro+=this.valorAberturaCaixa
}




    });


  }







  listarVendedorTotal() {

    this.formListarVendas.value.start=new Date()
    this.formListarVendas.value.end=new Date()


    this.formListarVendas.value.start.setHours(this.formListarVendas.value.start.getHours()-4)

    this.formListarVendas.value.end.setHours(this.formListarVendas.value.end.getHours()-4)



    this.vendaService.listarVendedorTotal(


      {
        "inicio":this.formListarVendas.value.start,
        "fim":this.formListarVendas.value.end
    }
    ).subscribe((itens: any) => {
      this.vendaPorVendedor = itens
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

  filterDataClientes($event: any) {
    this.dataSourceClientes.filter = $event.target.value;
  }



   Aumentaritem(item: any) {



         this.consumirService.verificaDisponibilidade({codigo:item.codigo}).subscribe((aux: any) => {

          var verificador=0
        for (let i = 0; i <  aux.tamanhos.length; i++) {

       //   console.log("DISPONIBILIDADE 0000000000000000", "ITEM",item,"AUX",aux)

          if ( (item.tamanho==aux.tamanhos[i].tamanho)&&(item.quantidade<aux.tamanhos[i].quantidade)     ) {


       //     console.log("DISPONIBILIDADE 11111111111111", "ITEM",item,"AUX",aux)

          for(let j=0; j<this.venda.itens.length;j++)
              if((this.venda.itens[j].tamanho==item.tamanho)&&(this.venda.itens[j].codigo==item.codigo)&&(this.venda.itens[j].demanda==item.demanda))

            this.venda.itens[j].quantidade++;

            verificador++
        //    console.log("DISPONIBILIDADE 2222222222222222", "ITEM",item,"AUX",aux)


          }


        }

      //  console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDxxxx", verificador)
        if(verificador==0){
       //   console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDxxx222222222222222222", verificador)
        //  alert("ffffffffff")

          Swal.fire({icon: 'error',text:'ESTOQUE INSUFICIENTEff!!!'})         ;
        //  console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDxxxx3333333333333", verificador)
              }

              this.atualizarCesta()

        });





  }

  Diminuiritem(item: any) {

    for (var i = 0; i < this.venda.itens.length; i++) {
      if (this.venda.itens[i] == item) {
        this.venda.itens[i].quantidade--;
        if(this.venda.itens[i].quantidade==0){
          this.excluiritem(item)
       }
      }
    }

    this.atualizarCesta()


  }

  excluiritem(item: any) {
    for (var i = 0; i < this.venda.itens.length; i++) {
      if (this.venda.itens[i] == item) {

        this.venda.subtotal=this.venda.subtotal -  item.subtotal;
        this.venda.total=this.venda.total - item.subtotal; // ATUALIZA O TOTAL DA COMPRA
        this.venda.itens.splice(i, 1); // REMOVE O ITEM DA CESTA

      }else{
        this.venda.custoVenda+=this.venda.itens[i].precoCompra*this.venda.itens[i].quantidade
      }
    }
  }


valorAberturaCaixa:number=0
abrirCaixa(){
  // Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM COM SUCESSO!!'})

  Swal.fire({
    title: 'VALOR PARA ABERTURA DO CAIXA',
    input: 'text',


    // inputAttributes: {
    //   autocapitalize: 'off'
    // },
    showCancelButton: true,
    confirmButtonText: 'SALVAR',
    showLoaderOnConfirm: true,

    preConfirm: (login) => {

     this.registro.data= new  Date()
     this.registro.valor=login
     this.registro.descricao="ABERTURA DE CAIXA"
     this.registro.perfil=String(sessionStorage.getItem('perfil'))


      this.livroCaixaService.saveCarAberturaCaixa(this.registro).subscribe((x) => {
        if( x.success){ {Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM COM SUCESSO!!'})}


////////
this.lerAberturaCaixa()
///////



      }
             });

    }

  }

  )

}





























lerAberturaCaixa(){




  this.formListarVendas.value.start=new Date()
  this.formListarVendas.value.end=new Date()


  this.formListarVendas.value.start.setHours(this.formListarVendas.value.start.getHours()-4)

  this.formListarVendas.value.end.setHours(this.formListarVendas.value.end.getHours()-4)


  this.livroCaixaService.listarAtivosAberturaCaixa(

    {
      "inicio": this.formListarVendas.value.start,
      "fim":this.formListarVendas.value.end,
      "perfil": "administrador"
  }


  ).subscribe((itens: any) => {

  //  console.log("PPPPPPPPPPPPPP", itens)

  if(itens.length>0){
    this.valorAberturaCaixa=itens[itens.length-1].valor
  }



 //   console.log("PPPPPPPPPPPPPP222", this.valorAberturaCaixa)

  });

}



excluircesta(){
  this.venda.itens.length=0
}



//////////////////////////////////////INERIR  PRODUTO QUANTIDADE///////////////////////////////////////////

inserirCodigo:number=0
inserirTamanho:number=0
inserirQuantidade:number=0
inserirProduto(){
  // Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM COM SUCESSO!!'})

  Swal.fire({
    title: 'CÓDIGO-TAMANHO-QUANTIDADE <BR> EXEMPLO:  125-P-1000 ',
    input: 'text',


    showCancelButton: true,
    confirmButtonText: 'SALVAR',
    showLoaderOnConfirm: true,

    preConfirm: (login) => {





       //PESQUISA O PRODUTO  PARA O INSERIR NA CESTA///////////////////////////////////////////////////////////////////////
 this.consumirService.listarAtivos().subscribe((itens: any) => {



var verificador=0

//PROCURA O CODIGO NA LISTA DE PRODUTOS111111
 for(var i=0; i<itens.length; i++){
 // console.log("UUUUUUUUUUUUUUUUUUUUUUUUU", itens[i].codigo,login.split("-")[0]+'X',"fff",verificador)
  if(itens[i].codigo==login.split("-")[0]){



       ////////////////////inserir historico1111111111111/////////////
     //  console.log("entrouuuuuuuuuuuuuuuuuuuIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",itens[i],"ggggggg",i)

       this.consumirService.saveCar('h',itens[i]).subscribe((x) => {

      //   console.log("entrouuuuuuuuuuuuuuuuuuuIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII222222222222222222222")


         if( x.success){ {Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM SUCESSO!!'})}   }
                    });
       ////////////////////inserir historico111111111111111/////////////




 //console.log("entrou 111111111111")



//PROCURA O TAMANHO DENTRO DO PRODUTO2222222
    for(var j=0; j<itens[i].tamanhos.length; j++){
     // console.log("entrou 222222222222", itens[i].tamanhos[j].tamanho, login.split("-")[1].toUpperCase())









        if(itens[i].tamanhos[j].tamanho==login.split("-")[1].toUpperCase())
            {
               itens[i].tamanhos[j].quantidade+=  Number(login.split("-")[2])



           // ENVIA O PRODUTO PARA ATUALIZACAO3333333333333
           this.consumirService .atualizar(itens[i]._id, itens[i]) .subscribe((x) => {   this.listarAtivos();   this.limpar();

            Swal.fire({icon: 'success',text:'ATUALIZADO COM SUCESSO!!!'})

           // this.salvacodigoparahistotico=item.codigo

          });
          // ENVIA O PRODUTO PARA ATUALIZACAO333333333333


           ////////////////////inserir historico22222/////////////
         //  console.log("entrouuuuuuuuuuuuuuuuuuuIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",itens[i],"ggggggg",i)

           this.consumirService.saveCar('h',itens[i]).subscribe((x) => {

           //  console.log("entrouuuuuuuuuuuuuuuuuuuIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII222222222222222222222")


             if( x.success){ {Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM SUCESSO!!'})}   }
                        });
           ////////////////////inserir historico222222222/////////////

          }
   }
//PROCURA O TAMANHO DENTRO DO PRODUTO22222222222
verificador++
 }



 // SE NAO ACHOU O CODIGO ENTAO DIZ QUE O CODIGO NAO EXISTE
 if(verificador==0) {Swal.fire({icon: 'error',text:'CÓDIGO INEXISTENTE!!!'})                  }
 // SE NAO ACHOU O CODIGO ENTAO DIZ QUE O CODIGO NAO EXISTE

 }
//PROCURA O CODIGO NA LISTA DE PRODUTOS111111111

});

  },

})


//////////////////////////////////////INERIR  PRODUTO QUANTIDADE///////////////////////////////////////////

}





DESPESA() {

  this.formListarVendas.value.start=new Date()
  this.formListarVendas.value.end=new Date()


  this.formListarVendas.value.start.setHours(this.formListarVendas.value.start.getHours()-4)

  this.formListarVendas.value.end.setHours(this.formListarVendas.value.end.getHours()-4)


  //console.log("ffffffffffffffffffffffRRRRRRRRRRRRRRRRRRR5555555555555555555", this.formListarVendas.value.end )

   this.gestaoService.obterDespesaTotalPeriodo(
     {
       "inicio":this.formListarVendas.value.start,
       "fim":this.formListarVendas.value.end
   }
   ).subscribe((valor: any) => {
    // console.log("ffffffffffffffSHELDONYYYYYYYYYYYYYYYYYYYYDESPESA", valor)

     this.valorDESPESA =valor
    // this.valorDESPESA=this.valorDESPESA.replace('.',',')


   });
 }


 RCB() {

  var x= new Date()
     x.setHours(x.getHours())


   this.valorRCB =0


  this.gestaoService.listar(
    {

      //ngx-bootrstrap55555555555/total 6
    "inicio":  x,
    "fim":   x
}
).subscribe((valor: any) => {
//console.log("ffffffffffffffSHELDON", valor)


if(valor.length>0){

this.valorRCB = valor[0].RCB;
}

 console.log("recb", this.valorRCB)


  });
}




}
