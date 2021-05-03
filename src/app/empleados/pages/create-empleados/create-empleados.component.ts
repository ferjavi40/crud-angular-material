import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {
  // clientesForm: FormGroup;

  clientesForm = new FormGroup({
    nombre: new FormControl('', [Validators.required,Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required,Validators.minLength(3)]),
    documento: new FormControl('', [Validators.required]),
    salario: new FormControl('', Validators.required),
  })


  constructor( private router: Router) { }

  ngOnInit() {

  }


  get nombre() {
    return this.clientesForm.get('nombre');
  }

  get apellido() {
    return this.clientesForm.get('apellido');
  }

  get documento() {
    return this.clientesForm.get('documento');
  }

  get salario() {
    return this.clientesForm.get('salario');
  }


  onSubmit(): void {
    if (this.clientesForm.valid) {
      console.log(this.clientesForm.value);
      this.clientesForm.reset();
    } else {
      console.log('Form not valid');
    }
  }

  goToHome(){
    this.router.navigate(['/list-empleados']);
  }

}
