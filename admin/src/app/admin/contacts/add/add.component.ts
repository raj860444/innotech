import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder ,Validators, FormArray } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private _router:Router, private _adminservice:AdminService,private fb: FormBuilder, private cd: ChangeDetectorRef, private toastr: ToastrService) { }
  options = ['CNY- Yuan Renminbi', 'AED- UAE Dirham'];

  ngOnInit() {

  }

    contactsForm = this.fb.group({
      customerType: ['', Validators.required],
      salutation: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      contactDisplayName: ['', Validators.required],
      contactEmail: ['', Validators.required],
      workPhone: ['', Validators.required],
      mobile: ['', Validators.required],
      skypeId: [''],
      designation: [''],
      department: [''],
      website: ['', Validators.required],
      currency: ['', Validators.required],
      paymentTerms: ['', Validators.required],
      facebookId: [''],
      twitterId: ['', Validators.required],
      billingAddress: this.fb.group({
        attention: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        country: ['', Validators.required],
        fax: [''],
        phone: ['', Validators.required]
      }),
      shippingAddress: this.fb.group({
        attention: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        country: ['', Validators.required],
        fax: [''],
        phone: ['', Validators.required]
      }),
      notes: ['', Validators.required],
    });

    get currency() { return this.contactsForm.get('currency').value; }
}
