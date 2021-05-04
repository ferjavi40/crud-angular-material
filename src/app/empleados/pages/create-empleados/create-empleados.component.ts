import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


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
    private fb: FormBuilder) { }

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
    console.log(empleado);
  }

  goToHome() {
    this.router.navigate(['/list-empleados']);
  }

}
