import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { empleadoInterface } from '../../interfaces/empleado-interface';
import { EmpleadosService } from '../../services/empleados.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
 

  public empleados: any[] = [];


  constructor(private _empleadoService: EmpleadosService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEmpleados()
  }


  getEmpleados() {
    this._empleadoService.getEmpleados()
      .subscribe((data: empleadoInterface[]) => {
        this.empleados = [];
        data.forEach((element: any) => {
          this.empleados.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
        console.log(this.empleados.sort());
      });
  }


  eliminarEmpleado(id:string) {
    Swal.fire({
      title:'Estas seguro?',
      text:'Este paso es irreversible',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText: 'Si, borrar!'
    }).then(result=>{
      if(result.value){
        this._empleadoService.eliminarEmpleado(id).then(()=>{
          Swal.fire('Eliminado','Empleado ha sido eliminado');
          this.toastr.error(`Empleado eliminado`,`eliminado exitosamente`,{
            timeOut: 3000,
            tapToDismiss: true
          })
        }).catch(error =>{
          console.log(error);
        });
      }
    })
    
  }



}
