import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor() {
    endpoint = 'clientes'
    api = environment.api;
    constructor(private http: HttpClient) { }

    buscarTodosLivros() {
      return this.http.get<ILivro[]>(`${this.api}/${this.endpoint}`);
    }
  }
}
