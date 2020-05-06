import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusquedaApiComponent } from './components/busqueda-api/busqueda-api.component';

const routes: Routes = [
	{
		path: '',
		component: BusquedaApiComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
