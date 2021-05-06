import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  loading: boolean = false;
  id: string | null;
  titulo: string = 'Agregar empleado';



  clientesForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    documento: ['', Validators.required],
    salario: ['', Validators.required],
  });


  constructor(private router: Router,
    private fb: FormBuilder,
    private _empleadoService: EmpleadosService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.onEditar();
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
    this.loading = true;
    this._empleadoService.agregarEmpleado(empleado)
      .then(() => {
        this.toastr.success(`Empleado ${empleado.nombre} ha sido registrado`, 'Registro exitoso', {
          timeOut: 3000,
          tapToDismiss: true
        });
        this.loading = false;
        this.goToHome()
      }).catch(error => {
        console.log(error);
        this.toastr.error('No ha podido agregarse usuario');
        this.loading = true;
      });

  }

  agregar() {

  }


  onEditar() {
    this.titulo = 'Editar empleado';
    if (this.id !== null) {
      this.loading = true;
      this._empleadoService.getEmpleado(this.id)
        .subscribe((data) => {
          this.loading = false;
          console.log(data.payload.data()['nombre']);
          this.clientesForm.setValue({
            nombre: data.payload.data()['nombre'],
            apellido: data.payload.data()['apellido'],
            documento: data.payload.data()['documento'],
            salario: data.payload.data()['salario']
          })
        });
    }
  }

  goToHome() {
    this.router.navigate(['/list-empleados']);
  }

}
