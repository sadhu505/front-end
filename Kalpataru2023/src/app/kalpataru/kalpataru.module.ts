import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { KalpataruRoutingModule } from './kalpataru-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { MemberComponent } from './member/member.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { AuthComponent } from './auth/auth.component';
import { AdminFinanceComponent } from './admin/admin-finance/admin-finance.component';
import { AdminMemberComponent } from './admin/admin-member/admin-member.component';
import { AdhocComponent } from './admin/admin-finance/adhoc/adhoc.component';
import { FilterComponent } from './admin/admin-finance/filter/filter.component';
import { SnapshotComponent } from './admin/admin-finance/snapshot/snapshot.component';
import { NextComponent } from './admin/admin-finance/adhoc/next/next.component';
import { MemberEditComponent } from './admin/admin-member/member-edit/member-edit.component';
import {AuthIntrceptorService} from './shared/auth-interceptor.service';
import {LoadingComponent} from './shared/loading-spinner/loading.component';
import { IEPipe } from './admin/admin-finance/filter/ie.pipe';
import { IEPipe2 } from './admin/admin-finance/filter/ie2.pipe';
import { MaterialModule } from './material.module';
import { TransferComponent } from './admin/admin-finance/transfer/transfer.component';


@NgModule({
    declarations: [
        HomeComponent,
        AdminComponent,
        MemberComponent,
        MemberDetailComponent,
        AuthComponent,
        AdminFinanceComponent,
        AdminMemberComponent,
        AdhocComponent,
        FilterComponent,
        TransferComponent,
        SnapshotComponent,
        NextComponent,
        MemberEditComponent,
        LoadingComponent,
        IEPipe,
        IEPipe2
    ],
    imports:[
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BsDatepickerModule.forRoot(),
        KalpataruRoutingModule,
        MaterialModule
    ],
    providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthIntrceptorService,multi:true}]
})
export class KalpataruModule { }