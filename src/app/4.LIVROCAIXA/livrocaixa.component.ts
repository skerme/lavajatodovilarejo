import { LivrocaixaService } from './livrocaixa.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from '../2.PRODUTO/produto';
import { ProdutoService } from '../2.PRODUTO/produto.service';
import Swal from 'sweetalert2';
import { GestaoService } from '../7.GESTAO/gestao.service';
import { EstatisticaService } from '../estatistica.service';
import { Estatistica } from '../estatistica';
import { Registro } from './registro';

@Component({
  selector: 'app-livrocaixa',
  templateUrl: './livrocaixa.component.html',
  styleUrls: ['./livrocaixa.component.css']
})
export class LivrocaixaComponent implements OnInit {
  acesso = {} as Estatistica;

  step=0


  // para ter o total das despesas no dia
  valorDESPESA: number=0;

  formResultado = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });
// para ter o total das despesas no dia



  formListarVendas = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
    perfil: new FormControl(sessionStorage.getItem('perfil')),
  });



  escolhido: any[]=[]



  executavenda = {} as Registro;  // usado no executaexecutavenda()


  panelOpenState = false;


  _id_produto: string='0'
  descricao: string = '';
  tipo: string = '';
  valor: number=0
  data: Date=new Date()
  perfil: string=''





  displayedColumns3 = [
    'acao',
    'descricao',
    'valor',
    'data',
    'tipo'
   // 'perfil'
  ];
  dataSource3!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator3!: MatPaginator;
  @ViewChild(MatSort) matSort3!: MatSort;


  nome_desativar_apenas_para_administrador=''
  constructor(
    private livroCaixaService: LivrocaixaService,
    private formBuilder: FormBuilder,
    private gestaoService: GestaoService,
    private estatisticaService: EstatisticaService
    ) { }



    totalPrecoCompra: number=0
    totalPvVarejo: number=0
    totalPvAtavado: number=0
  ngOnInit() {
    this.formListarVendas.value.end.setFullYear(2030)

     //////////////LOCALIZACAO///////////////////////////////
  this.acesso.valor=111
  this.acesso.data= new  Date()
  this.acesso.perfil="DESPESA"
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
      //    console.log("nao", resposta, "hfghgf",resposta.message)
      })
//////LOCALIZACAO//////////////////////////////////////


    this.data= new  Date()
    this.DESPESA()


   this.listarAtivo();






   window.document.getElementById("selecaoDeProduto")?.focus()
   this.nome_desativar_apenas_para_administrador=String(sessionStorage.getItem('name'))
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
    this.listarAtivo();
    this.DESPESA()
  }



  DESPESA() {

   this.formResultado.value.start.setFullYear('2020')


    this.gestaoService.obterDespesaTotalPeriodo(
      {
        "inicio":this.formResultado.value.start,
        "fim":this.formResultado.value.end
    }
    ).subscribe((valor: any) => {
    //  console.log("ffffffffffffffSHELDONYYYYYYYYYYYYYYYYYYYYDESPESA", valor)

      this.valorDESPESA =valor
     // this.valorDESPESA=this.valorDESPESA.replace('.',',')


    });
  }





  inserir() {

    this.descricao=this.descricao.toUpperCase()

    this.executavenda.tipo=this.tipo
    this.executavenda.descricao=this.descricao
    this.executavenda.valor=this.valor
    this.executavenda.data= new  Date(this.data)
    this.executavenda.perfil=String(sessionStorage.getItem('perfil'))


  if(this._id_produto=='0'){

    this.livroCaixaService.saveCar(this.executavenda).subscribe((x) => {
      if( x.success){ {Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM COM SUCESSO!!'})}

    }
             this.listarAtivo();
             this.limpar();



         //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
         this.acesso.valor=111
         this.acesso.data= new  Date()
         this.acesso.perfil="INSERÇÃODESPESA"
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
            this.livroCaixaService.atualizar(this._id_produto,this.executavenda).subscribe((x) => {
              this.listarAtivo();
              this.limpar();


                     //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
         this.acesso.valor=111
         this.acesso.data= new  Date()
         this.acesso.perfil="ATUALIZAÇÃODESPESA"
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


    this.tipo=''
    this.descricao=''
    this.valor=0
    this.data=new  Date()
    this.perfil=''
  }











  editar(item: any) {
    this.step=0

      item.descricao=item.descricao.toUpperCase()

       this._id_produto= item._id
       this.descricao=item.descricao
       this.valor=item.valor
       this.data=item.data
       this.tipo=item.tipo
       this.perfil=item.perfil







     }

  excluir(item: any) {
    this.livroCaixaService.deleteCar(item._id).subscribe((x) => {});
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



        this.livroCaixaService.atualizar(item._id,item).subscribe((x) => {

          this.listarAtivo()

         //////REGITRO DE INSERCAO DE ITEM//////////////////////////////////////
         this.acesso.valor=111
         this.acesso.data= new  Date()
         this.acesso.perfil="EXCLUSÃODESPESA"
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






      }



      listarAtivo() {
// se for ADMINISTRADOR PEGAR AS VENDA DE ATE UM ANO ATRAS
if(sessionStorage.getItem('perfil')=='administrador'){
  this.formListarVendas.value.start.setFullYear(2021)
   }
// se for ADMINISTRADOR PEGAR AS VENDA DE ATE UM ANO ATRAS




        this.livroCaixaService.listarAtivos(

          {
            "inicio":this.formListarVendas.value.start,
            "fim":this.formListarVendas.value.end,
            "perfil":this.formListarVendas.value.perfil
        }


        ).subscribe((itens: any) => {
          this.dataSource3 = new MatTableDataSource(itens);
          this.dataSource3.paginator = this.paginator3;
          this.dataSource3.sort = this.matSort3;

        });
      }






  limpar() {
    this.tipo='';
    this.descricao = '';
    this.valor=0
    this.data=new  Date()
    this.perfil=''

  }

  filterData3($event: any) {
    this.dataSource3.filter = $event.target.value;
  }






  @HostListener('window:keyup', ['$event'])   // PARA OBTER AS TECLAS DE ATALHO
  keyEvent(event: KeyboardEvent) {

  //console.log(event.key)

  }











  insereLavador(nome: any) {

    this.descricao=nome

    this.descricao=this.descricao.toUpperCase()




  }




}
