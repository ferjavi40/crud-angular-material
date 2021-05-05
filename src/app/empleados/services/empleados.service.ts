import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {



  constructor(private firestore: AngularFirestore) { }


  agregarEmpleado(empleado: any): Promise<any> {
    return this.firestore.collection('empleados').add(empleado)
  }
}
