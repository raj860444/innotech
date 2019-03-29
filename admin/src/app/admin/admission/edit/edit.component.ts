import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder ,Validators, FormArray } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  genders: string[]=['Male', 'Female', 'Other']
  religions: string[]=['Hindu', 'Muslim', 'Sikh', 'Jain', 'Buddh', 'Christian']
  countries: string[]=['Indian', 'Napal', 'Bhutan', 'Afganistan', 'Dubai']
  classArray: string[]=['Nursary', 'LKG', 'UKG', '1','2','3','4','5','6','7','8','9','10','11','12']
  sections: string[]=['A', 'B', 'C', 'D']
  branches: string[]
  data: any;
  serverError: string=''
  private id='';
  constructor(private _router:Router, private _adminservice:AdminService,private fb: FormBuilder,  private toastr: ToastrService, private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {

    this.fetchData()
    console.log(this.data)

  }
  fetchData() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this._adminservice.getSingleAdmissionData(this.id).
    subscribe(
              res=>{
                //console.log(JSON.parse(data.createdBranch.sibling[0]))
                res.createdBranch.sibling = JSON.parse(res.createdBranch.sibling[0]);

                this.data = res.createdBranch;
                this.admissionForm.patchValue({
                                                firstName: this.data.firstName,
                                                middleName: this.data.middleName,
                                                lastName: this.data.lastName,
                                                dob: this.data.dob,
                                                gender: this.data.gender,
                                                religion: this.data.religion,
                                                nationality: this.data.nationality,
                                                class: this.data.class,
                                                section: this.data.section,
                                                branch: this.data.branch._id,
                                                previousSchool: this.data.previousSchool,
                                                previousClass: this.data.previousClass,
                                                previousSchoolAddress: this.data.previousSchoolAddress,
                                                aadhar: this.data.aadhar,
                                             });
                        this.data.sibling.forEach(x=>{
                            this.siblingFormGroup.push(
                                this.fb.group({
                                  name: [x.name, Validators.required],
                                  class: [x.class, Validators.required],
                                  school: [x.school, Validators.required]
                                })
                            );
                       });
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
    this._adminservice.getAllBranch()
    .subscribe(
      res => {
        this.branches = res.result.branches
        //console.log(this.branches)
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
                    studentImage: [null],
                    sibling: this.fb.array([
                                // this.fb.group({
                                //     name: ['', Validators.required],
                                //     class: ['', Validators.required],
                                //     school: ['', Validators.required]
                                //   })
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
                    formData.append('_id', this.id);
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
                    this._adminservice.updateAdmissionData(formData, this.id).subscribe(data=>{
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
                     console.log(this.admissionForm.value);
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
