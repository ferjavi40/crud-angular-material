import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { empleadoInterface } from '../interfaces/empleado-interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {



  constructor(private firestore: AngularFirestore) { }


  agregarEmpleado(empleado: empleadoInterface): Promise<any> {
    return this.firestore.collection<empleadoInterface>('empleados').add(empleado)
  }
}
