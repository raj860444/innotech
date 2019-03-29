import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
                          {path: '', 'redirectTo':'/list', pathMatch:'full'},
                          {path:'list', component: ListComponent},
                          {path:'add', component: AddComponent},
                          {path:'edit/:id', component: EditComponent},
                          {path:'view/:id', component: ViewComponent}
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }
