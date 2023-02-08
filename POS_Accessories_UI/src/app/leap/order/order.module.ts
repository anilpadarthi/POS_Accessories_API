import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { InputFileModule } from 'ngx-input-file';
import { OrdernListComponent } from '../order/ordern-list/ordern-list.component';
//import { AddConfigurationComponent } from '../configuration/add-configuration/add-configuration.component';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [ 
  { path: '', component: OrdernListComponent, pathMatch: 'full' },
  // { path: 'create', component: AddConfigurationComponent },
  // { path: 'edit/:id', component: AddConfigurationComponent, data: { breadcrumb: 'Edit Configuration' } }, 
];

@NgModule({
  declarations: [
    OrdernListComponent
    //AddConfigurationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    SwiperModule,
    InputFileModule,
    FormsModule
  ]
})
export class OrderModule { }
