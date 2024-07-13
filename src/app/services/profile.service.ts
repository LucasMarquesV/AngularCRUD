import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  api = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient) { }

  buscarTodos() {
    return this.http.get<Profile[]>(this.api);
  }

  cadastrar(profile: Profile) {
    return this.http.post<Profile>(this.api, profile);
  }
}
