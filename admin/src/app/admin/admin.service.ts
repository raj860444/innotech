import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }

  addNewBranch(branchData){
    let result = JSON.stringify(branchData)
    return this._http.post<any>('/api/branch/add_branch', JSON.parse(result));
  }
  getAllBranch(){
    return this._http.get<any>('/api/branch')
  }
  deleteBranch(branchid){
    return this._http.delete<any>('/api/branch/delete_branch/'+branchid)
  }
  getSingleBranch(branchid){
      return this._http.get<any>('/api/branch/get_single_branch/'+branchid)
  }
  updateBranch(id, branchData){
    // let result = JSON.stringify(branchData)
    // console.log(branchData)
    return this._http.patch<any>('/api/branch/update_branch/'+id, branchData)
  }
  addAdmissionData(admissionData){
    const options = {
                      headers: new HttpHeaders().append('Accept', 'application/json')
                    }
    return this._http.post<any>('/api/admission/add_admission', admissionData, options)
  }
  getAllAdmission(className, section){
    return this._http.get<any>('/api/admission/'+className+'/'+section)
  }
  getSingleAdmissionData(id){
    return this._http.get<any>('/api/admission/'+id)
  }
  updateAdmissionData(admissionData, id){
    const options = {
                      headers: new HttpHeaders().append('Accept', 'application/json')
                    }
    return this._http.patch<any>('/api/admission/update_admission/'+id, admissionData, options)
  }
  deleteAdmisson(admissionId){
    return this._http.delete<any>('/api/admission/delete_admisson/'+admissionId)
  }
  fetchUserData(){
    return this._http.get<any>('/api/users/admin');
  }
  uploadAdminImage(formData){
    const options = {
                      headers: new HttpHeaders().append('Accept', 'application/json')
                    }
    return this._http.post<any>('/api/users/changeImage', formData, options)
  }
  updateProfile(formData){
    return this._http.post<any>('/api/users/updateProfile', formData)
  }
  changePassword(formData){
    return this._http.post<any>('/api/users/changePassword', formData)
  }
  addCms(formData){
    return this._http.post<any>('/api/cms/addCms', formData)
  }
  getAllCms(){
    return this._http.get<any>('/api/cms/')
  }
  deleteCms(id){
    return this._http.delete<any>('/api/cms/delete_cms/'+id)
  }
  getSingleCms(id){
    return this._http.get<any>('/api/cms/get_single_cms/'+id)
  }
  updateCms(id, cmdData){
    return this._http.patch<any>('/api/cms/update_cms/'+id, cmdData)
  }
  getAllUsers(){
    return this._http.get<any>('/api/users/getall');
  }
}
