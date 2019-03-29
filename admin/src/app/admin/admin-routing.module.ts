import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'admission', loadChildren: './admission/admission.module#AdmissionModule' },
      { path: 'branch', loadChildren: './branch/branch.module#BranchModule' },
      { path: 'cms', loadChildren: './cms/cms.module#CmsModule' },
      { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule'},
      { path: 'currency', loadChildren: './currency/currency.module#CurrencyModule'},
      { path: 'user', loadChildren: './user/user.module#UserModule'}
                        //{ path: 'fee-management', loadChildren: './fee-management/fee.management#FeeManagementModule' },
                        //{ path: 'employee-manager', loadChildren: './employee-manager/employee-manager.module#EmployeeManagerModule' },
                       ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
