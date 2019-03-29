import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder ,Validators, FormArray } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  genders: string[]=['Male', 'Female', 'Other']
  religions: string[]=['Hindu', 'Muslim', 'Sikh', 'Jain', 'Buddh', 'Christian']
  countries: string[]=['Indian', 'Napal', 'Bhutan', 'Afganistan', 'Dubai']
  classArray: string[]=['Nursary', 'LKG', 'UKG', '1','2','3','4','5','6','7','8','9','10','11','12']
  sections: string[]=['A', 'B', 'C', 'D']
  branches: string[]
  serverError: string=''

  constructor(private _router:Router, private _adminservice:AdminService,private fb: FormBuilder, private cd: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchData()
  }
  fetchData() {
    this._adminservice.getAllBranch()
    .subscribe(
      res => {
        this.branches = res.result.branches
        console.log(this.branches)
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
  admissionForm = this.fb.group({
                    firstName: ['', Validators.required],
                    middleName: [''],
                    lastName: [''],
                    dob: ['', Validators.required],
                    gender: ['', Validators.required],
                    religion: ['', Validators.required],
                    nationality: ['', Validators.required],
                    class: ['', Validators.required],
                    section: ['', Validators.required],
                    branch: ['', Validators.required],
                    previousSchool: [''],
                    previousClass: [''],
                    previousSchoolAddress: [''],
                    aadhar: ['', Validators.required],
                    studentImage: [null, Validators.required],
                    sibling: this.fb.array([
                                this.fb.group({
                                    name: ['', Validators.required],
                                    class: ['', Validators.required],
                                    school: ['', Validators.required]
                                  })
                                ])
                  });
          onFileChange(event) {
            if(event.target.files && event.target.files.length) {
              const file: File = event.target.files[0];
              this.admissionForm.patchValue({studentImage: file});

            }
          }


    get siblingFormGroup() {
      return this.admissionForm.get('sibling') as FormArray;
    }
    addSibling() {
      this.siblingFormGroup.push(
            this.fb.group({
              name: ['', Validators.required],
              class: ['', Validators.required],
              school: ['', Validators.required]
            })
        );
    }
    removeSibling(index) {
      var minHeight = $(document).height()-30;
      var maxHeight = $(document).height()-30;

      //$('.left_col').css("min-height", minHeight-30);
      $('.left_col').css("max-height", maxHeight);
      this.siblingFormGroup.removeAt(index);
    }
    onSubmit(){
      const formData = new FormData();
      formData.append('firstName', this.admissionForm.get('firstName').value);
      formData.append('middleName', this.admissionForm.get('middleName').value);
      formData.append('lastName', this.admissionForm.get('lastName').value);
      formData.append('dob', this.admissionForm.get('dob').value);
      formData.append('gender', this.admissionForm.get('gender').value);
      formData.append('religion', this.admissionForm.get('religion').value);
      formData.append('nationality', this.admissionForm.get('nationality').value);
      formData.append('class', this.admissionForm.get('class').value);
      formData.append('section', this.admissionForm.get('section').value);
      formData.append('branch', this.admissionForm.get('branch').value);
      formData.append('previousSchool', this.admissionForm.get('previousSchool').value);
      formData.append('previousClass', this.admissionForm.get('previousClass').value);
      formData.append('previousSchoolAddress', this.admissionForm.get('previousSchoolAddress').value);
      formData.append('aadhar', this.admissionForm.get('aadhar').value);
      formData.append('studentImage', this.admissionForm.get('studentImage').value);
      formData.append('sibling', JSON.stringify(this.admissionForm.get('sibling').value));
      this._adminservice.addAdmissionData(formData).subscribe(data=>{
                        this.toastr.success('Branch Added Successfully', 'Success!');
                        this._router.navigate(['/admin/admission/list'])
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
       console.log(formData);
    }
    get firstName() { return this.admissionForm.get('firstName'); }
    get dob() { return this.admissionForm.get('dob'); }
    get gender() { return this.admissionForm.get('gender'); }
    get religion() { return this.admissionForm.get('religion'); }
    get nationality() { return this.admissionForm.get('nationality'); }
    get class() { return this.admissionForm.get('class'); }
    get section() { return this.admissionForm.get('section'); }
    get branch() { return this.admissionForm.get('branch'); }
    get aadhar() { return this.admissionForm.get('aadhar'); }
    get studentImage() { return this.admissionForm.get('studentImage'); }
}
