import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { empleadoInterface } from '../interfaces/empleado-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {



  constructor(private firestore: AngularFirestore) { }

  agregarEmpleado(empleado: empleadoInterface): Promise<any> {
    return this.firestore.collection<empleadoInterface>('empleados').add(empleado)
  }

  getEmpleados(): Observable<any> {
    return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any> {
    return this.firestore.collection('empleados').doc(id).delete();
  }

  getEmpleado(id: string):Observable<any> {
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }

}
