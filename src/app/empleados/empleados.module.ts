import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ListEmpleadosComponent } from './pages/list-empleados/list-empleados.component';
import { CreateEmpleadosComponent } from './pages/create-empleados/create-empleados.component';

import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    ListEmpleadosComponent,
    CreateEmpleadosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports:[
    ListEmpleadosComponent,
    CreateEmpleadosComponent
  ]
})
export class EmpleadosModule { }
