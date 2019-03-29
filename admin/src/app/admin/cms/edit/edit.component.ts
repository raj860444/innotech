import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormControl , FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public id: string;
  private data=[];
  serverError: any;
    public Editor = ClassicEditor;
  constructor(private _router:Router, private activatedRoute: ActivatedRoute, private _http:HttpClient, private _adminservice:AdminService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id)
    this._adminservice.getSingleCms(this.id).subscribe(
      res=>{
        console.log(res)
        this.data = res.createdCms
        this.editCmsForm.patchValue({
            page_name:res.createdCms.page_name,
            title:res.createdCms.title,
            url:res.createdCms.url,
            meta_keyword:res.createdCms.meta_keyword,
            meta_desc:res.createdCms.meta_desc,
            content:res.createdCms.content,
        });
      },
      err =>{
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 404) {
            this.serverError = err.error.message
          }
          if (err.status === 500) {
            this.serverError = 'Unauthorization Error plz logout and login again'
          }
        }
      }
    )
    //console.log(this.id)
  }

  editCmsForm = this.fb.group({
    page_name: ['', Validators.required],
    title: ['', Validators.required],
    url: ['', Validators.required],
    meta_keyword: ['', Validators.required],
    meta_desc: ['', Validators.required],
    content: ['', Validators.required],
  });

  editCms(){
    console.log(this.editCmsForm.value)
    console.log("id is: "+this.id)
    this._adminservice.updateCms(this.id, this.editCmsForm.value).subscribe(
      res=>{
        this.toastr.success('Cms Updated Successfully', 'Success!');
        this._router.navigate(['/admin/cms/list'])
      },
      err=>{
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 404) {
            this.serverError = err.error.message
          }
          if (err.status === 500) {
            this.serverError = 'Unauthorization Error plz logout and login again'
          }
        }
      }
    )
  }
}
