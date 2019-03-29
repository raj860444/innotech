import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';

import { CmsRoutingModule, ComponentList } from './cms-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  declarations: [ComponentList],
  imports: [
    CommonModule,
    CmsRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    CKEditorModule,
    //BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ConfirmationPopoverModule.forRoot({
       confirmButtonType: 'danger' // set defaults here
     })
  ]
})
export class CmsModule { }
