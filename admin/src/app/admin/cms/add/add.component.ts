import { Component, OnInit } from '@angular/core';
import { FormControl , FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { AuthGuard } from '../../../auth.guard';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})


export class AddComponent implements OnInit {
  private serverError='';
  public Editor = ClassicEditor;
  constructor(private _auth:AuthService,private _adminservice: AdminService, private _router:Router, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
  }

  addCmsForm = this.fb.group({
    page_name: ['', Validators.required],
    title: ['', Validators.required],
    url: ['', Validators.required],
    meta_keyword: ['', Validators.required],
    meta_desc: ['', Validators.required],
    content: ['', Validators.required],
  });

  onSubmit(){
    console.warn(this.addCmsForm.value);
    this._adminservice.addCms(this.addCmsForm.value)
    .subscribe(result=>{
      this.toastr.success('Cms Added Successfully', 'Success!');
      this._router.navigate(['/admin/cms/list'])
    },
    err=>{
      console.log(err)
                if( err instanceof HttpErrorResponse ) {
                  if (err.status === 409) {
                    this.serverError = err.error.message
                  }
                  if (err.status === 401) {
                    this.serverError = 'Unauthorization Error plz logout and login again'
                  }
                }
    })
  }

}
