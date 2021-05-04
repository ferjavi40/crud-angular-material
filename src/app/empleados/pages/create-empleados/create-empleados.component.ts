import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {
  clientesForm: FormGroup;
  submitted: boolean = false;


  constructor(private router: Router,
    private fb: FormBuilder) {
    this.clientesForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    })
  }

  ngOnInit() {

  }

  onSubmit(): void {
    console.log(this.clientesForm);
  }

  goToHome() {
    this.router.navigate(['/list-empleados']);
  }

}
