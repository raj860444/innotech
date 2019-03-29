import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';

import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AddComponent, ListComponent, EditComponent, ViewComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    AdmissionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    NgxPaginationModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [ ConfirmationDialogService ]
})
export class AdmissionModule { }
