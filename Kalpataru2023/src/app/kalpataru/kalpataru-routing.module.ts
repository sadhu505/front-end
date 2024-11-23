import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {HomeComponent} from './home/home.component';
import {MemberComponent} from './member/member.component';
import { AuthComponent } from './auth/auth.component';
import {MemberDetailComponent} from './member/member-detail/member-detail.component';
import {MemberEditComponent} from './admin/admin-member/member-edit/member-edit.component';
import { AdminComponent } from './admin/admin.component';
import {AdminMemberComponent} from './admin/admin-member/admin-member.component';
import {AdminFinanceComponent} from './admin/admin-finance/admin-finance.component';
import { SnapshotComponent } from './admin/admin-finance/snapshot/snapshot.component';
import { FilterComponent } from './admin/admin-finance/filter/filter.component';
import { AdhocComponent } from './admin/admin-finance/adhoc/adhoc.component';
import { TransferComponent } from './admin/admin-finance/transfer/transfer.component';
import { NextComponent } from './admin/admin-finance/adhoc/next/next.component';
import {SnapshotResolver} from './admin/admin-finance/snapshot/snapshot-resolver.service';
import {NextResolver} from './admin/admin-finance/adhoc/next/next-resolver.service';



const kalpataruRoutes: Routes=[
    {path:'', redirectTo:'/home',pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'member', component:MemberComponent, children:[
        {path:':name',component:MemberDetailComponent},
    ]},
    {path:'admin', component:AdminComponent, children:[
        {path:'member', component:AdminMemberComponent, children:[
            {path:'add',component:MemberEditComponent},
            {path:':delete',component:MemberEditComponent},
            {path:':name/edit',component:MemberEditComponent}
        ]},
        {path:'finance', component:AdminFinanceComponent, children:[
            {path:'snapshot', component:SnapshotComponent, resolve:[SnapshotResolver]},
            {path:'adhoc', component:AdhocComponent},
            {path:'filter', component:FilterComponent, resolve:[NextResolver]},
            {path:'event', component:AdhocComponent},
            {path:'transfer', component:TransferComponent,resolve:[NextResolver,SnapshotResolver]},
            {path:'adhoc/:next', component:NextComponent,resolve:[NextResolver,SnapshotResolver]},
            {path:':next', component:NextComponent,resolve:[NextResolver,SnapshotResolver]}
        ]}
    ]},
    {path:'auth', component:AuthComponent},
    {path:'**', redirectTo:'/home'}
]

@NgModule({
    imports:[RouterModule.forRoot(kalpataruRoutes)],
    exports:[RouterModule]
})
export class KalpataruRoutingModule{}