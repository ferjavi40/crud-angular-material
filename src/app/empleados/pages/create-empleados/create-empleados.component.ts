import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';


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
    private _empleadoService: EmpleadosService) { }

  ngOnInit() {

  }

  onSubmit(): void {

    if (this.clientesForm.invalid) {
      return
    }
    const empleado: any = {
      nombre: this.clientesForm.value.nombre,
      apellido: this.clientesForm.value.apellido,
      documento: this.clientesForm.value.documento,
      salario: this.clientesForm.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this._empleadoService.agregarEmpleado(empleado)
      .then(() => {
        console.log('Empleado registrado con exito');
        this.goToHome()
      }).catch(error => {
        console.log(error);
      });
    
  }

  goToHome() {
    this.router.navigate(['/list-empleados']);
  }

}
