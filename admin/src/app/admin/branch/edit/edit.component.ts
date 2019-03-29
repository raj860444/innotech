import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormControl , FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public id: string;
  private data=[];
  serverError: any;
  constructor(private _router:Router, private activatedRoute: ActivatedRoute, private _http:HttpClient, private _adminservice:AdminService, private fb: FormBuilder, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this._adminservice.getSingleBranch(this.id).subscribe(
      res=>{
        console.log(res)
        this.data = res.createdBranch
        this.editBranchForm.patchValue({
            branchName:res.createdBranch.branchName,
            branchAddress:res.createdBranch.branchAddress
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
  editBranchForm = this.fb.group({
    branchName: ['', Validators.required],
    branchAddress: ['', Validators.required],
  });


  editBranch(){
    console.log(this.editBranchForm.value)
    console.log("id is: "+this.id)
    this._adminservice.updateBranch(this.id, this.editBranchForm.value).subscribe(
      res=>{
        this.toastr.success('Branch Updated Successfully', 'Success!');
        this._router.navigate(['/admin/branch/list'])
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
