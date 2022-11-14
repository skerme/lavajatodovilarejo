import { GestaoService } from './gestao.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { VendaService } from '../1.VENDA/venda.service';
import { ProdutoService } from '../2.PRODUTO/produto.service';
import { HistoricoService } from '../3.HISTORICO/historico.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LivrocaixaService } from '../4.LIVROCAIXA/livrocaixa.service';
import { EstatisticaService } from '../estatistica.service';
import { Estatistica } from '../estatistica';



@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrls: ['./gestao.component.css'],
})
export class GestaoComponent implements OnInit {

  quantidadeEntradaNoPeriodo: any[]=[]

  getDiasFuncionando: number=0

  acesso = {} as Estatistica;

  valorAberturaCaixa: number=0


   //ngx-bootrstrap 3333333333/total 5
  bsRangeValue: Date[];

  step = 0;



  resolucao: number=( window.innerWidth)



  quantidadeDeItensVendidosPeriodo: number=0

  totalPrecoCompra: number=0
  totalPvVarejo: number=0
  totalPvAtavado: number=0

  // vendedor = new FormGroup({
  //   start: new FormControl(new Date()),
  //   end: new FormControl(new Date()),
  // });



  // formaPagamento = new FormGroup({
  //   start: new FormControl(new Date()),
  //   end: new FormControl(new Date()),
  // });


  // formResultado = new FormGroup({
  //   start: new FormControl(new Date()),
  //   end: new FormControl(new Date()),
  // });


  // formCodigoProduto = new FormGroup({
  //   start: new FormControl(new Date()),
  //   end: new FormControl(new Date()),
  // });




  vendaPorVendedor:any[]=[]

  vendaPorForma: any[]=[]

  itensVendidos:any[]=[]


  panelOpenState = false;

  valorRCB: number = 0;
  desconto: number=0;
  valorCMV: number=0;
  valorDESPESA: number=0;




///////////////////////////para fazer a tabela

  displayedColumns1 = [
    'codigo',
    'tamanho',
    'descricao',
    'quantidade',
    'custo',
    'receita',
    'media',
    'ganho',
    'ganhoPercentual',
    'duracao'
  ];


  displayedColumns2 = [
    'codigo',
    'descricao',
    'quantidade',
  ];

  dataSource1!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;

 @ViewChild('paginator') paginator1!: MatPaginator;
 @ViewChild(MatSort) matSort1!: MatSort;


  @ViewChild('paginator') paginator2!: MatPaginator;
  @ViewChild(MatSort) matSort2!: MatSort;



//////////////////////////

  constructor(private gestaoService: GestaoService,
    private vendaService: VendaService,
    private historicoService: HistoricoService,
    private livroCaixaService: LivrocaixaService,
    private estatisticaService: EstatisticaService,
    private consumirService: ProdutoService,
    ) {


     //ngx-bootrstrap4444444444/total 5

     var x= new Date()
     x.setHours(x.getHours()-3.5)
    this.bsRangeValue = [x, x];


//console.log("ffdfdfdfVVVVVVVVVVVVVV11111111", x)

    }




  ngOnInit() {

     ////////////LOCALIZACAO///////////////////////////////
  this.acesso.valor=111
  this.acesso.data= new  Date()
  this.acesso.perfil="GESTAO"
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
     //     console.log("nao", resposta, "hfghgf",resposta.message)
      })
////LOCALIZACAO//////////////////////////////////////




    this.vendaPorForma= [{"_id":null,"pix":0,"dinheiro":0,"debito":0,"credito":0}]


//ajuste por causa do fuso


  //  this.bsRangeValue[0].setHours(this.bsRangeValue[0].getHours()+2)
  //  this.bsRangeValue[1].setHours(this.bsRangeValue[1].getHours()+2)
//ajuste por causa do fuso


    this.RCB()




   // this.DESCONTO()
  //  this.CMV()
  //  this.DESPESA()

    this.quantidadeItensVendidosPeriodo()
    this.getTodosItensQuantidadeVendidaCodigoTamanho()
    this.listarFormaPagamentoTotal();
    this.listarVendedorTotal();

    // para pegar os dados do estoque
    this.getEstoquePrecoDecusto()
  //  this.getPvVarejo()
  //  this.getPvAtacado()
     // para pegar os dados do estoque

  

    }



    lerAberturaCaixa(){
      this.livroCaixaService.listarAtivosAberturaCaixa(

        {
          "inicio": new Date(),
          "fim":new Date(),
          "perfil": "administrador"
      }


      ).subscribe((itens: any) => {

     //   console.log("PPPPPPPPPPPPPP", itens)

     if(itens.length>0){

      this.valorAberturaCaixa=itens[itens.length-1].valor
      }

   //     console.log("PPPPPPPPPPPPPP222", this.valorAberturaCaixa)

      });

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



  RCB() {

    //ajuste por causa do fuso
  //  this.bsRangeValue[0].setHours(this.bsRangeValue[0].getHours()-1)
 //   this.bsRangeValue[1].setHours(this.bsRangeValue[1].getHours()-2)
//ajuste por causa do fuso

     this.vendaPorVendedor=[]
     this.vendaPorForma= [{"_id":null,"pix":0,"dinheiro":0,"debito":0,"credito":0}]
     this.valorRCB =0
     this.desconto=0
     this.valorCMV=0
     this.valorDESPESA =0
     this.quantidadeDeItensVendidosPeriodo =0

    this.gestaoService.listar(
      {

        //ngx-bootrstrap55555555555/total 6
      "inicio":  this.bsRangeValue[0],
      "fim":   this.bsRangeValue[1]
  }
  ).subscribe((valor: any) => {
//console.log("ffffffffffffffSHELDON", valor)


if(valor.length>0){

  this.valorRCB = valor[0].RCB;
}


      this.DESCONTO()
      this.CMV()
      this.DESPESA()
      this.quantidadeItensVendidosPeriodo()
      this.getTodosItensQuantidadeVendidaCodigoTamanho()
      this.listarFormaPagamentoTotal()
      this.listarVendedorTotal()
      this.lerAberturaCaixa()

    });
  }


///////////////////////////para fazer a tabela
  filterData2($event: any) {
    this.dataSource2.filter = $event.target.value;
  }


 filterData1($event: any) {
   this.dataSource1.filter = $event.target.value;
 }
///////////////////////////para fazer a tabela



  DESCONTO() {

    this.gestaoService.obterDescontoTotalPeriodo(
      {
        "inicio":  this.bsRangeValue[0],
      "fim":   this.bsRangeValue[1]
    }
    ).subscribe((valor: any) => {
//console.log("ffffffffffffffSHELDON", valor)
if(valor.length>0){

  this.desconto = (valor[0].DESCONTO);
}

    });
  }



  CMV() {

    this.gestaoService.obterCustoVendaTotalPeriodo(
      {
        "inicio":  this.bsRangeValue[0],
        "fim":   this.bsRangeValue[1]
    }

    ).subscribe((valor: any) => {
  //    console.log("ffffffffffffffSHELDONXXXXXXXXXXXXXXXXXXXX", valor)
  if(valor.length>0){

    this.valorCMV = valor[0].CMV;
    }
    });
  }


  DESPESA() {

    this.gestaoService.obterDespesaTotalPeriodo(
      {
        "inicio":  this.bsRangeValue[0],
      "fim":   this.bsRangeValue[1]
    }
    ).subscribe((valor: any) => {
   //   console.log("ffffffffffffffSHELDONYYYYYYYYYYYYYYYYYYYYDESPESA", valor)

      this.valorDESPESA = valor
    });
  }



  quantidadeItensVendidosPeriodo() {
    this.quantidadeDeItensVendidosPeriodo =0
    this.gestaoService.getquantidadeItensVendidos(
      {
        "inicio":  this.bsRangeValue[0],
      "fim":   this.bsRangeValue[1]
    }

    ).subscribe((valor: any) => {
  //    console.log("ffffffffffffffSHELDONXXXXXXXXXXXXXXXXXXXX", valor)

      this.quantidadeDeItensVendidosPeriodo =  valor
    });
  }




  listarFormaPagamentoTotal() {




    this.vendaService.listarFormaPagamentoTotal(

      {
        "inicio":  this.bsRangeValue[0],
        "fim":   this.bsRangeValue[1]
    }
  ).subscribe((itens: any) => {

//console.log("fffffffffsSSSSSSSSSSSSSSSSSSSS")

      this.vendaPorForma = itens

    }

    );
  }





  listarVendedorTotal() {
    this.vendaService.listarVendedorTotal(

      {
        "inicio":  this.bsRangeValue[0],
        "fim":   this.bsRangeValue[1]
    }

  ).subscribe((itens: any) => {
      this.vendaPorVendedor = itens

//console.log("rrrrrrr  rrrrrrrr  RRRRRRRRRRRRRRRRRRRRRRR", this.vendaPorVendedor)

    });
  }






resultado: any[]=[]
resultado2:any[]=[]
getTodosItensQuantidadeVendidaCodigoTamanho() {
this.resultado=new Array()

//console.log("ffffffffffffssssssssss", this.formCodigoProduto.value)

  this.historicoService.listarAtivos(


    {
      "inicio":  this.bsRangeValue[0],
      "fim":   this.bsRangeValue[1]
  }


  ).subscribe((vendas: any) => {


    const diff = Math.abs(this.bsRangeValue[0].getTime() - this.bsRangeValue[1].getTime()); // Subtrai uma data pela outra
    const diferencaEntreDatas = Math.ceil(diff / (1000 * 60 * 60 * 24)) +1;

  //console.log("rrrrrr rrrrrrr RRRRRRRRRRRRRRRRRRRRRRRRRR", vendas,  diferencaEntreDatas)

    this.resultado= new Array()
    this.resultado2= new Array()

    for(var i=0; i<vendas.length;i++){


      //11111111111111 verifico para cada item de todas as   vendas do perido
       for(var j=0; j<vendas[i].itens.length;j++){



           var verificador=-1
           for(var k=0; k<this.resultado.length; k++){
             if((vendas[i].itens[j].codigo==this.resultado[k].codigo)&&(vendas[i].itens[j].tamanho==this.resultado[k].tamanho))             {
                            verificador=k
             }
           }

            if((verificador==-1)){
              this.resultado.push({codigo:vendas[i].itens[j].codigo,tamanho:vendas[i].itens[j].tamanho,inicial:1,entrada:0,quantidade:vendas[i].itens[j].quantidade,final:0,descricao:vendas[i].itens[j].descricao,custo:vendas[i].itens[j].precoCompra*vendas[i].itens[j].quantidade,receita:vendas[i].itens[j].valorUnitario*vendas[i].itens[j].quantidade, media:diferencaEntreDatas, ganho:0, ganhoPercentual:0, duracao:0})
            }
          else{
          this.resultado[verificador].quantidade+=vendas[i].itens[j].quantidade
          this.resultado[verificador].custo+=vendas[i].itens[j].precoCompra*vendas[i].itens[j].quantidade
          this.resultado[verificador].receita+=vendas[i].itens[j].valorUnitario*vendas[i].itens[j].quantidade
            }



            var verificador2=-1
            for(var k=0; k<this.resultado2.length; k++){
              if((vendas[i].itens[j].codigo==this.resultado2[k].codigo))             {
                             verificador2=k
              }
            }



            if((verificador2==-1)){
              this.resultado2.push({codigo:vendas[i].itens[j].codigo,quantidade:vendas[i].itens[j].quantidade,descricao:vendas[i].itens[j].descricao})
            }
          else{
          this.resultado2[verificador2].quantidade+=vendas[i].itens[j].quantidade
            }


       }
       //11111111111111 verifico para cada item de todas as   vendas do perido
    }



    console.log("fffffffffffffffffffffffffffffffffffffffhhhhhhhhhhhh")

    this.estatisticaService.getDiasFuncionando(
      {
        "inicio":  this.bsRangeValue[0],
        "fim":   this.bsRangeValue[1]
    } ).subscribe((itens: any) => {
      this.getDiasFuncionando=itens

    //boto aqui dentro por causa do asincronismo
      for(var i=0; i<this.resultado.length;i++){
        this.resultado[i].media= this.resultado[i].quantidade/this.getDiasFuncionando
        this.resultado[i].ganho= this.resultado[i].receita-this.resultado[i].custo
        this.resultado[i].ganhoPercentual= (this.resultado[i].receita-this.resultado[i].custo)/this.resultado[i].receita*100
    }
    //boto aqui dentro por causa do asincronismo

    });





   this.dataSource1 = new MatTableDataSource(this.resultado);
   this.dataSource1.paginator = this.paginator1;
   this.dataSource1.sort = this.matSort1;



    this.dataSource2 = new MatTableDataSource(this.resultado2);
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.matSort2;






  });
}


ATUALIZA2(){



  console.log("tttttttttt", this.resultado)




     this.consumirService.getCodigoEntrada(

       {
         "inicio":  this.bsRangeValue[0],
         "fim":   this.bsRangeValue[1],
         "codigo":0


     }


     ).subscribe((itens: any) => {
      console.log("gGGGGGGGGGGGGGGGGGGGGGGG",itens)

      this.quantidadeEntradaNoPeriodo=itens





      for(var w=0; w<this.resultado.length;w++){
    //    this.totalItensEstoque=0
        for(var y=0; y<this.quantidadeEntradaNoPeriodo.length;y++){
         if (this.resultado[w].codigo==this.quantidadeEntradaNoPeriodo[y].codigo){
           this.resultado[w].entrada=this.quantidadeEntradaNoPeriodo[y].entrada
           this.resultado[w].final=this.quantidadeEntradaNoPeriodo[y].final
           this.resultado[w].inicial=this.resultado[w].quantidade- this.quantidadeEntradaNoPeriodo[y].entrada+   this.quantidadeEntradaNoPeriodo[y].final
           this.resultado[w].duracao= (this.resultado[w].final /  this.resultado[w].media)



         }
      //   this.totalItensEstoque=this.totalItensEstoque+this.quantidadeEntradaNoPeriodo[y].final
       }

        }



     });
     ///consultar  ENTRADA NO ESTOQUE POR CODIGO





  }





getEstoquePrecoDecusto() {  this.gestaoService.getEstoquePrecoDecusto().subscribe((itens: any) => { this.totalPrecoCompra =itens;

  this.gestaoService.getPvvarejo().subscribe((itens: any) => {  this.totalPvVarejo=itens;

    this.gestaoService.getPvAtacado().subscribe((itens: any) => {   this.totalPvAtavado =itens;



    });

  });



});


}
//getPvVarejo() {    this.gestaoService.getPvvarejo().subscribe((itens: any) => {  this.totalPvVarejo=itens   });  }
//getPvAtacado() {     this.gestaoService.getPvAtacado().subscribe((itens: any) => {   this.totalPvAtavado =itens });   }







// MÉTODO ADICONAL PARA O LAVAJATO
// MÉTODO ADICONAL PARA O LAVAJATO
// MÉTODO ADICONAL PARA O LAVAJATO

codigoPorLavador:any[]=[]
historicoProduto: any[]=[]
getAllCodigosLavador() {


this.gestaoService.getAllCodigosLavador30(
    {
      "inicio":  this.bsRangeValue[0],
      "fim":   this.bsRangeValue[1],
      "nome": "Gabriel"
  }

).subscribe((itens: any) => {
this.codigoPorLavador= itens

    console.log("XXXXXXXXXXXXXXXXXX",this.historicoProduto, this.codigoPorLavador)
  });

}



// MÉTODO ADICONAL PARA O LAVAJATO
// MÉTODO ADICONAL PARA O LAVAJATO
// MÉTODO ADICONAL PARA O LAVAJATO










}




