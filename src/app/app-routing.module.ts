import { CompraComponent } from './9.COMPRA/compra.component';
import { UsuarioComponent } from './8.USUARIO/usuario.component';
import { PessoalComponent } from './6.PESSOAL/pessoal.component';
import { ClienteComponent } from './5.CLIENTES/cliente.component';
import { HistoricoComponent } from './3.HISTORICO/historico.component';
import { GestaoComponent } from './7.GESTAO/gestao.component';
import { LivrocaixaComponent } from './4.LIVROCAIXA/livrocaixa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendaComponent } from './1.VENDA/venda.component';
import { ProdutoComponent } from './2.PRODUTO/produto.component';

const routes: Routes = [

  {path:'venda', component: VendaComponent },
  {path:'produto', component: ProdutoComponent },
  {path:'historico', component:  HistoricoComponent },
  {path:'livrocaixa', component: LivrocaixaComponent },
  {path:'cliente', component:  ClienteComponent },
  {path:'pessoal', component:  PessoalComponent },
  {path:'gestao', component:  GestaoComponent },
  {path:'usuario', component: UsuarioComponent },
  {path:'compra', component: CompraComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





