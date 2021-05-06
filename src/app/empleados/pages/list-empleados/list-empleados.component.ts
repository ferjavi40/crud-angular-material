import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { empleadoInterface } from '../../interfaces/empleado-interface';
import { EmpleadosService } from '../../services/empleados.service';



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
    this._empleadoService.eliminarEmpleado(id).then(()=>{
      this.toastr.success(`Empleado eliminado`,`eliminado exitosamente`,{
        timeOut: 3000,
        tapToDismiss: true
      })
    }).catch(error =>{
      console.log(error);
    });
  }

}
