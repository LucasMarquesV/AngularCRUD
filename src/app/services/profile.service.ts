import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  api = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient) { }

  buscarTodos() {
    return this.http.get<Profile[]>(this.api);
  }

  buscarPorId(id: string): Observable<Profile> {
    const url = `${this.api}/${id}`;
    return this.http.get<Profile>(url);
  }

  editar(profile: Profile): Observable<Profile> {
    console.log('bateu' + profile.idade)
    const url = `${this.api}/${profile.id}`;
    return this.http.put<Profile>(url, profile);
  }
  
  cadastrar(profile: Profile) {
    return this.http.post<Profile>(this.api, profile);
  }

  deletar(id: string): Observable<any> {
    const url = `${this.api}/${id}`;
    return this.http.delete(url);
  }
}
