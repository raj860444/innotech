import { Component, OnInit } from '@angular/core';
import { FormControl , FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { AuthGuard } from '../../../auth.guard';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  private serverError='';
  constructor(private _auth:AuthService,private _adminservice: AdminService, private _router:Router, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
  }
  // addBranchForm = new FormGroup({
  //   branchName: new FormControl(''),
  //   branchAddress: new FormControl(''),
  // });

  addBranchForm = this.fb.group({
    branchName: ['', Validators.required],
    branchAddress: ['', Validators.required],

  });

  addBranch () {
      this._adminservice.addNewBranch(this.addBranchForm.value)
      .subscribe(
        res => {
          this.toastr.success('Branch Added Successfully', 'Success!');
          this._router.navigate(['/admin/branch/list'])
        },
        err => {  console.log(err)
                  if( err instanceof HttpErrorResponse ) {
                    if (err.status === 409) {
                      this.serverError = err.error.message
                    }
                    if (err.status === 401) {
                      this.serverError = 'Unauthorization Error plz logout and login again'
                    }
                  }
              }
      )
      console.log(this.addBranchForm.value)
    }

}
