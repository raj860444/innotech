import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormControl , FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public id: string;
  private data=[];
  serverError: any;
  constructor(private _router:Router, private activatedRoute: ActivatedRoute, private _http:HttpClient, private _adminservice:AdminService, private fb: FormBuilder, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this._adminservice.getSingleAdmissionData(this.id).
    subscribe(
              res=>{
                //console.log(JSON.parse(data.createdBranch.sibling[0]))
                res.createdBranch.sibling = JSON.parse(res.createdBranch.sibling[0]);
                console.log(res.createdBranch)
                this.data = res.createdBranch;
              },
              err=>{
                console.log(err)
                          if( err instanceof HttpErrorResponse ) {
                            if (err.status === 409) {
                              this.serverError = err.error.message
                            }
                            if (err.status === 401) {
                              this.serverError = 'Unauthorization Error plz logout and login again',
                              this.toastr.error('Unauthorization Error plz logout and login again', 'Error');
                              this._router.navigate(['/login'])
                            }
                          }
              }
        );
  }

}
