import { Component, OnInit } from '@angular/core';
import { FormControl , FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { AuthGuard } from '../../../auth.guard';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private listItems=[];
  private serverError='';
  public popoverTitle: string = 'Are you sure';
  public popoverMessage: string = 'You want to delete this cms';
  p: number = 1;
  constructor(private _router:Router, private _adminservice:AdminService, private toastr: ToastrService) { }


  ngOnInit() { 
  	this.fetchData();
  }

   fetchData() {
    this._adminservice.getAllUsers()
    .subscribe(
      res => {
      	
        this.listItems = res.result.users;
        console.log(this.listItems);
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
  }

}