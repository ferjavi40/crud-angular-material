import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';
import { ToastrService } from 'ngx-toastr';
import { empleadoInterface } from '../../interfaces/empleado-interface';


@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {
  submitted: boolean = false;

  clientesForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    documento: ['', Validators.required],
    salario: ['', Validators.required],
  });


  constructor(private router: Router,
    private fb: FormBuilder,
    private _empleadoService: EmpleadosService,
    private toastr: ToastrService) { }

  ngOnInit() {

  }

  onSubmit(): void {

    if (this.clientesForm.invalid) {
      return
    }
    const empleado: empleadoInterface = {
      nombre: this.clientesForm.value.nombre,
      apellido: this.clientesForm.value.apellido,
      documento: this.clientesForm.value.documento,
      salario: this.clientesForm.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this._empleadoService.agregarEmpleado(empleado)
      .then(() => {
        this.toastr.success(`Empleado ${empleado.nombre} ha sido registrado`,'Registro exitoso',{
          timeOut: 3000,
          tapToDismiss: true
        });
        this.goToHome()
      }).catch(error => {
        console.log(error);
        this.toastr.error('No ha podido agregarse usuario');
      });
    
  }

  goToHome() {
    this.router.navigate(['/list-empleados']);
  }

}
