import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  /**
   * @description HttpClient service para hacer peticiones 
   */
  private http = inject(HttpClient);

  getAdminsListFakeData(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getAdminDetailsFakeData(id: string){
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

}
