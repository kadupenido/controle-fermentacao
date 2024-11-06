import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FermentacaoComponent } from './fermentacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    FermentacaoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot()
  ],
  providers:[
    FermentacaoModule
  ]
})
export class FermentacaoModule { }
